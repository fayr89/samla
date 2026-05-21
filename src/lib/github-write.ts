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

async function getFileSha(path: string): Promise<string | undefined> {
  const o = client();
  const {owner, repo: r, branch} = repo();
  try {
    const res = await o.repos.getContent({owner, repo: r, path, ref: branch});
    if (Array.isArray(res.data)) return undefined;
    return res.data.sha;
  } catch (e: unknown) {
    const status = (e as {status?: number}).status;
    if (status === 404) return undefined;
    throw e;
  }
}

/** Commit a UTF-8 text or binary file. `content` is a Buffer or string. */
export async function commitFile(
  path: string,
  content: Buffer | string,
  message: string
): Promise<void> {
  const o = client();
  const {owner, repo: r, branch} = repo();
  const sha = await getFileSha(path);
  const base64 =
    typeof content === 'string'
      ? Buffer.from(content, 'utf8').toString('base64')
      : content.toString('base64');
  await o.repos.createOrUpdateFileContents({
    owner,
    repo: r,
    branch,
    path,
    message,
    content: base64,
    sha
  });
}
