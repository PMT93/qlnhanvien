export function saveLocal(data: any, key: string) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function loadLocal(key: string) {
  let str = localStorage.getItem(key);
  if (str && str != "") {
    return JSON.parse(str);
  } else {
    return false;
  }
}
