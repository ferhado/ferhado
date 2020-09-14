export function clean_url(url) {
  return url.replace(/([^:]\/)\/+/g, "$1");
}

export function isFunction(arg: any) {
  return typeof arg === 'function';
}

export function isObject(arg: any) {
  return (typeof arg === 'object' && arg !== null && !(arg instanceof Array)) ? arg : false;
}