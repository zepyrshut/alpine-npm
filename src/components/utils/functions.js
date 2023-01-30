function updateSessionStorage(name, data) {
  if (sessionStorage.getItem(name)) {
    sessionStorage.removeItem(name);
  }
  sessionStorage.setItem(name, JSON.stringify(data));
}

export { updateSessionStorage };
