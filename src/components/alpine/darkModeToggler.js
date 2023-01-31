export function darkModeToggler () {
  return {
    init () {
      if (
        window.localStorage.theme === 'dark' ||
        (!('theme' in window.localStorage) &&
          window.matchMedia('(prefers-color-scheme: dark)').matches)
      ) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    },
    toggleDarkMode () {
      if (window.localStorage.theme === 'dark') {
        window.localStorage.theme = 'light'
        document.documentElement.classList.remove('dark')
      } else {
        window.localStorage.theme = 'dark'
        document.documentElement.classList.add('dark')
      }
    }
  }
}
