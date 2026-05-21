import {Octokit} from '@octokit/rest';

function env(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`${name} env var missing.`);
  return v;
}

function client() {
  return new Octokit({auth: env('GITHUB_TOKEN')});
}

function repo() {
  return {
    owner: env('GITHUB_OWNER'),
    repo: env('GITHUB_REPO'),
    branch: env('GITHUB_BRANCH')
  };
}

function status(e: unknown): number | undefined {
  return (e as {status?: number}).status;
}

async function getFileSha(
  o: Octokit,
  owner: string,
  r: string,
  branch: string,
  filePath: string
): Promise<string | undefined> {
  try {
    const res = await o.repos.getContent({
      owner,
      repo: r,
      path: filePath,
      ref: branch
    });
    if (Array.isArray(res.data)) return undefined;
    return res.data.sha;
  } catch (e: unknown) {
    if (status(e) === 404) return undefined;
    throw e;
  }
}

/** Commit a UTF-8 text or binary file. `content` is a Buffer or string. */
export async function commitFile(
  filePath: string,
  content: Buffer | string,
  message: string
): Promise<void> {
  const o = client();
  const {owner, repo: r, branch} = repo();

  try {
    await o.repos.get({owner, repo: r});
  } catch (e) {
    if (status(e) === 404) {
      throw new Error(
        `репо ${owner}/${r} недоступно. Проверь GITHUB_OWNER/GITHUB_REPO и что fine-grained PAT выбран на этот репо с правом Contents: Read and write`
      );
    }
    if (status(e) === 401) {
      throw new Error(
        'GITHUB_TOKEN отвергнут GitHub (401). Токен истёк или скопирован неполностью — пересоздай fine-grained PAT'
      );
    }
    throw e;
  }

  try {
    await o.repos.getBranch({owner, repo: r, branch});
  } catch (e) {
    if (status(e) === 404) {
      throw new Error(
        `ветка ${branch} не найдена в ${owner}/${r}. Проверь GITHUB_BRANCH`
      );
    }
    throw e;
  }

  const sha = await getFileSha(o, owner, r, branch, filePath);
  const base64 =
    typeof content === 'string'
      ? Buffer.from(content, 'utf8').toString('base64')
      : content.toString('base64');

  try {
    await o.repos.createOrUpdateFileContents({
      owner,
      repo: r,
      branch,
      path: filePath,
      message,
      content: base64,
      sha
    });
  } catch (e) {
    if (status(e) === 404) {
      throw new Error(
        `GitHub отказал в записи (404). У GITHUB_TOKEN нет права Contents: Read and write на ${owner}/${r} — открой fine-grained PAT и поставь Repository permissions → Contents = Read and write`
      );
    }
    if (status(e) === 403) {
      throw new Error(
        `GitHub отказал в записи (403) — ветка ${branch} защищена правилом, либо PAT истёк/отозван`
      );
    }
    if (status(e) === 422) {
      throw new Error(
        'GitHub: конфликт версий файла (422) — кто-то другой только что закоммитил тот же файл. Перезагрузи страницу и попробуй ещё раз'
      );
    }
    throw e;
  }
}
