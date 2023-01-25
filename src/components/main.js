import Alpine from 'alpinejs'
import { loveCounter } from './loveCounter'
import { fetchSomeData } from './fetchSomeData'
import { contactForm } from './contactForm'

window.Alpine = Alpine

Alpine.data('loveCounter', loveCounter)
Alpine.data('fetchSomeData', fetchSomeData)
Alpine.data('contactForm', contactForm)

Alpine.start()
