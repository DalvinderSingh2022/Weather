class SearchView {
  container = document.querySelector(".search-form");

  addSubmitController(controller) {
    if (typeof controller !== "function"){
      throw new TypeError("controller must be function");
    }
    this.container.addEventListener("submit", controller.bind(this));
  }

  clearForm() {
    this.container.querySelector(".search-field").value = "";
  }

  get query() {
    return this.container.querySelector(".search-field").value;
  }
}

export default new SearchView();