import notie from "notie";

const API_URL = import.meta.env.VITE_API_URL;

export function loginForm() {
  return {
    user: {
      name: "",
      email: "",
    },
    isLoading: false,
    isError: false,
    submit() {
      this.isLoading = true;
      fetch(`${API_URL}/users`, {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          name: this.user.name,
          email: this.user.email,
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          notie.alert({
            type: "success",
            text: "Sesión iniciada correctamente",
            time: 2,
          });
          updateSessionStorage(json);
          this.isLoading = false;
          this.isError = false;
          this.user = {
            name: "",
            email: "",
          };
        })
        .catch((error) => {
          console.log(error);
          notie.alert({
            type: "error",
            text: "Error al iniciar sesión",
            time: 2,
          });
          this.isLoading = false;
          this.isError = true;
        });
    },
  };
}

function updateSessionStorage(user) {
  if (sessionStorage.getItem("user")) {
    sessionStorage.removeItem("user");
  }
  sessionStorage.setItem("user", JSON.stringify(user));
  window.dispatchEvent(new Event("set-user-in-session"));
}
