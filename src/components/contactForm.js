  export function contactForm() {
    return {
      data: {
        title: "",
        body: "",
        userId: 1,
      },
      buttonText: "Submit",
      loading: false,
      submit() {
        this.buttonText = "Submitting...";
        this.loading = true;
        fetch('https://jsonplaceholder.typicode.com/posts', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          body: JSON.stringify(this.data),
        })
          .then((response) => {
            console.log(response.json());
            alert("Form submitted");
          })
          .catch(() => {
            alert("Something went wrong");
          })
          .finally(() => {
            this.data.body = ""
            this.buttonText = "Submit";
            this.loading = false;
          });
      },
    };
  }