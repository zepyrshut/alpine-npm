export function fetchSomeData() {
  return {
    title: "Some data",
    data: [],
    reload() {
      sessionStorage.removeItem("data");
      this.data = [];
      this.init();
    },
    init() {
      const data = JSON.parse(sessionStorage.getItem("data"));
      if (data) {
        this.data = data;
        return;
      }
      fetch("https://jsonplaceholder.typicode.com/todos")
        .then((response) => response.json())
        .then((json) => {
          this.data = json;
          sessionStorage.setItem("data", JSON.stringify(json));
        });
    },
  };
}
