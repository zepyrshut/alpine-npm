export function submitSomeData() {
  return {
    people: [],
    personId: 0,
    selected: "",
    isLoading: false,
    init() {
      fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => response.json())
        .then((json) => {
          this.people = json;
        });
    },
    submit() {
      this.isLoading = true;
      fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify({
          name: this.selected.name,
          email: this.selected.email,
          userId: this.selected.id,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          this.isLoading = false;
          alert("Data saved!");
        });
    },
    selection(selected) {
      this.selected = selected;
    },
  };
}
