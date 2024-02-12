export async function fetchApi<TResponse>(url: string, requestOpts: RequestInit) {
  try {
    const res = await fetch(url, requestOpts);
    const resolved = await res.json();

    if ('error' in resolved) throw new Error(resolved.message);

    return resolved as TResponse;
  } catch (err: any) {
    throw new Error(err.message);
  }
}
