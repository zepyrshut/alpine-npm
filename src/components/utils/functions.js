function updateSessionStorage (name, data) {
  if (window.sessionStorage.getItem(name)) {
    window.sessionStorage.removeItem(name)
  }
  window.sessionStorage.setItem(name, JSON.stringify(data))
}

export { updateSessionStorage }
