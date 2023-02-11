import notie from 'notie'
import { updateSessionStorage } from '../utils/functions'

const API_URL = import.meta.env.VITE_API_URL

export function fetchDataRadio () {
  return {
    people: [],
    selectedDataId: 0,
    selectedData: '',
    showSelectedUser: false,
    isLoading: false,
    isError: false,
    init () {
      const people = JSON.parse(window.sessionStorage.getItem('users'))
      if (people) {
        this.people = people
        return
      }
      this.reloadData()
    },
    reloadData () {
      this.loading = true
      fetch(`${API_URL}/users`)
        .then(async (response) => {
          const data = await response.json()
          if (!response.ok) {
            const error = (data && data.message) || response.status
            notie.alert({
              type: 'error',
              text: 'Hubo algún error al cargar los datos',
              time: 2
            })
            this.isLoading = false
            this.isError = true
            return Promise.reject(error)
          }
          this.people = data
          this.isLoading = false
          this.isError = false
          updateSessionStorage('users', data)
        })
        .catch(() => {
          notie.alert({
            type: 'error',
            text: 'Hubo algún error al cargar los datos',
            time: 2
          })
          this.isLoading = false
          this.isError = true
        })
    },
    selection (selected) {
      this.showSelectedUser = true
      this.selectedData = selected
    },
    submit () {
      this.isLoading = true
      fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
          name: this.selectedData.name,
          email: this.selectedData.email,
          userId: this.selectedData.id
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      })
        .then((response) => response.json())
        .then((json) => {
          console.log(json)
          this.isLoading = false
          this.isError = false
          notie.alert({
            type: 'success',
            text: `El usuario ${this.selectedData.name} ha sido registrado con éxito`,
            time: 3
          })
        })
    }
  }
}
