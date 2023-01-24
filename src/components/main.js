import Alpine from 'alpinejs'
import { loveCounter } from './loveCounter'
import { fetchSomeData } from './fetchSomeData'

window.Alpine = Alpine

Alpine.data('loveCounter', loveCounter)
Alpine.data('fetchSomeData', fetchSomeData)

Alpine.start()
