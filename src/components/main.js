import Alpine from "alpinejs";
import { fetchDataCheckbox } from "./alpine/fetchDataCheckbox";
import { fetchDataRadio } from "./alpine/fetchDataRadio";
import { loginForm } from "./alpine/loginForm";
import { userSession } from "./alpine/userSession";

window.Alpine = Alpine;

Alpine.data("loginForm", loginForm);
Alpine.data("userSession", userSession);
Alpine.data("fetchDataCheckbox", fetchDataCheckbox);
Alpine.data("fetchDataRadio", fetchDataRadio);

Alpine.start();
