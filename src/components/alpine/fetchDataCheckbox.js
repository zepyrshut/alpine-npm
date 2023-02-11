import notie from 'notie'
import { updateSessionStorage } from '../utils/functions.js'

const API_URL = import.meta.env.VITE_API_URL

export function fetchDataCheckbox () {
  return {
    data: [],
    todoSelected: [],
    isLoading: false,
    isError: false,
    sortCol: null,
    sortAsc: false,
    pageSize: 10,
    currentPage: 1,
    init () {
      const data = JSON.parse(window.sessionStorage.getItem('todos'))
      if (data) {
        this.data = data
        return
      }
      this.reloadData()
    },
    reloadData () {
      this.isLoading = true
      fetch(`${API_URL}/todos`)
        .then(async (response) => {
          const data = await response.json()
          console.log(data)
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
          data.forEach((d, i) => (d.id = i))
          console.log(data)
          this.data = data
          this.isLoading = false
          this.isError = false
          updateSessionStorage('todos', data)
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
    sort (col) {
      if (this.sortCol === col) this.sortAsc = !this.sortAsc
      this.sortCol = col
      this.data.sort((a, b) => {
        if (a[col] > b[col]) return this.sortAsc ? 1 : -1
        if (a[col] < b[col]) return this.sortAsc ? -1 : 1
        return 0
      })
    },
    nextPage () {
      if (this.currentPage * this.pageSize < this.data.length) { this.currentPage++ }
    },
    prevPage () {
      if (this.currentPage > 1) this.currentPage--
    },
    get paginatedData () {
      if (this.data) {
        return this.data.filter((row, index) => {
          const start = (this.currentPage - 1) * this.pageSize
          const end = this.currentPage * this.pageSize
          return index >= start && index < end
        })
      } else {
        return []
      }
    }
  }
}
