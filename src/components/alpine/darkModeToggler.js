export function darkModeToggler () {
  return {
    isDark: undefined,
    init () {
      if (
        window.localStorage.theme === 'dark' ||
        (!('theme' in window.localStorage) &&
          window.matchMedia('(prefers-color-scheme: dark)').matches)
      ) {
        document.documentElement.classList.add('dark')
        this.isDark = true
      } else {
        document.documentElement.classList.remove('dark')
        this.isDark = false
      }
    },
    toggleDarkMode () {
      if (window.localStorage.theme === 'dark') {
        window.localStorage.theme = 'light'
        document.documentElement.classList.remove('dark')
        this.isDark = false
      } else {
        window.localStorage.theme = 'dark'
        document.documentElement.classList.add('dark')
        this.isDark = true
      }
    }
  }
}
