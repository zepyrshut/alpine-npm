import Alpine from 'alpinejs'
import { loveCounter } from './loveCounter'
import { fetchSomeData } from './fetchSomeData'
import { contactForm } from './contactForm'
import { submitSomeData } from './submitSomeData'

window.Alpine = Alpine

Alpine.data('loveCounter', loveCounter)
Alpine.data('fetchSomeData', fetchSomeData)
Alpine.data('contactForm', contactForm)
Alpine.data('label', () => ({ text: 'Hello World'}))
Alpine.data('submitSomeData', submitSomeData)

Alpine.start()

// son funciones que retornan un objeto con los datos
// que se necesite en data
