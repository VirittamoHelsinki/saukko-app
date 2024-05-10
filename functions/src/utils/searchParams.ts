const paramExists = (url: string, key: string) => {
  const u = new URL(url);
  const params = new URLSearchParams(u.search);
  return !!params.get(key)
}

const addParams = (url: string, key: string, value: string) => {
  const u = new URL(url)
  const params = new URLSearchParams(u.search);
  params.append(key, value);
  u.search = params.toString();
  return u.href;
}

const updateParams = (url: string, key: string, value: string, allowAdd?: boolean) => {
  const u = new URL(url);
  const params = new URLSearchParams(u.search);
  params.set(key, value);
  u.search = params.toString();
  return u.href;
}

const removeParam = (url: string, key: string, value: string) => {
  const u = new URL(url);
  const params = new URLSearchParams(u.search);
  params.delete(key);
  u.search = params.toString();
  return u.href;
}

const getParamArr = (url: string, key: string) => {
  const u = new URL(url);
  const params = new URLSearchParams(u.search);
  return params.getAll(key);
}

export default {
  addParams,
  updateParams,
  removeParam,
  paramExists,
  getParamArr,
}
