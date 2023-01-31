import notie from 'notie'

export function userSession () {
  return {
    userInSession: {
      id: 0,
      name: '',
      email: ''
    },
    showUser: false,
    init () {
      this.setUserInSession()
      window.addEventListener('set-user-in-session', () => {
        this.setUserInSession()
      })
    },
    setUserInSession () {
      const user = window.sessionStorage.getItem('user')
        ? JSON.parse(window.sessionStorage.getItem('user'))
        : notie.alert({
          type: 'warning',
          text: 'Error al obtener los datos del usuario, inicie sesión',
          time: 2
        })
      if (user) {
        this.userInSession.id = user.id
        this.userInSession.name = user.name
        this.userInSession.email = user.email
        this.showUser = true
      }
    },
    closeSession () {
      window.sessionStorage.removeItem('user')
      this.userInSession = {
        id: 0,
        name: '',
        email: ''
      }
      this.showUser = false
      notie.alert({
        type: 'success',
        text: 'Sesión cerrada correctamente',
        time: 2
      })
    }
  }
}
