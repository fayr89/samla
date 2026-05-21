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

function tokenInfo(): string {
  const t = process.env.GITHUB_TOKEN ?? '';
  if (t.length === 0) return '<пусто>';
  let kind = 'unknown';
  if (t.startsWith('ghp_')) kind = 'classic ghp_';
  else if (t.startsWith('github_pat_')) kind = 'fine-grained';
  else if (t.startsWith('gho_')) kind = 'OAuth';
  else if (t.startsWith('ghs_')) kind = 'app installation';
  const trimmed = t.trim();
  const ws =
    trimmed.length === t.length
      ? ''
      : ` ⚠️ есть пробелы/переносы (с пробелами ${t.length}, без — ${trimmed.length})`;
  return `${kind}, длина ${t.length}${ws}`;
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
        `репо ${JSON.stringify(owner)}/${JSON.stringify(r)} недоступно. token=[${tokenInfo()}]. Если owner/repo в кавычках видно с пробелами — в Vercel env прокрались лишние символы. Если token=<пусто> или его длина выглядит странно (classic ≈ 40, fine-grained ≈ 80–95) — пересохрани GITHUB_TOKEN в Vercel и сделай Redeploy.`
      );
    }
    if (status(e) === 401) {
      throw new Error(
        `GITHUB_TOKEN отвергнут GitHub (401). token=[${tokenInfo()}]. Значение скопировано не полностью или с лишними символами — пересоздай токен и заново вставь в Vercel.`
      );
    }
    throw e;
  }

  try {
    await o.repos.getBranch({owner, repo: r, branch});
  } catch (e) {
    if (status(e) === 404) {
      throw new Error(
        `ветка ${JSON.stringify(branch)} не найдена в ${owner}/${r}. Нужно ${JSON.stringify('claude/product-landing-page-H9FDX')}`
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
