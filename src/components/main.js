import Alpine from 'alpinejs'
import { colorPicker } from './alpine/colorPicker'
import { darkModeToggler } from './alpine/darkModeToggler'
import { fetchDataCheckbox } from './alpine/fetchDataCheckbox'
import { fetchDataRadio } from './alpine/fetchDataRadio'
import { loginForm } from './alpine/loginForm'
import { userSession } from './alpine/userSession'

import '../styles/custom.css'

window.Alpine = Alpine

Alpine.data('loginForm', loginForm)
Alpine.data('userSession', userSession)
Alpine.data('fetchDataCheckbox', fetchDataCheckbox)
Alpine.data('fetchDataRadio', fetchDataRadio)
Alpine.data('darkModeToggler', darkModeToggler)
Alpine.data('colorPicker', colorPicker)

Alpine.start()
