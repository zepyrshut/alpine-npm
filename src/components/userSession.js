import notie from "notie";

export function userSession() {
  return {
    userInSession: {
      id: undefined,
      name: "",
      email: "",
    },
    setUserInSession() {
      const user = sessionStorage.getItem("user")
        ? JSON.parse(sessionStorage.getItem("user"))
        : notie.alert({
            type: "error",
            text: "Error al obtener los datos del usuario",
            time: 2,
          });
      if (user) {
        this.userInSession.id = user.id;
        this.userInSession.name = user.name;
        this.userInSession.email = user.email;
      }
    },
  };
}
