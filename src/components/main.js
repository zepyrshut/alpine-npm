import Alpine from "alpinejs";
import { loginForm } from "./loginForm";

window.Alpine = Alpine;

Alpine.data("loginForm", loginForm);

Alpine.start();
