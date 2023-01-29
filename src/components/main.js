import Alpine from "alpinejs";
import { loginForm } from "./loginForm";
import { userSession } from "./userSession";

window.Alpine = Alpine;

Alpine.data("loginForm", loginForm);
Alpine.data("userSession", userSession);

Alpine.start();
