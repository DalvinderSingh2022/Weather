import images from "../icons/*.png";

class InfoView {
  container = document.querySelector(".info");

  render(data) {
    this.data = data;
    this.container.innerHTML = "";
    this.renderHTMLElements();
  }
  renderHTMLElements() {
    const data = this.data;
    this.container.insertAdjacentHTML(
      "beforeend",
     `<span class="fs-2 pt-4 fw-bold">${data.name}</span>
      <div class="d-flex w-100 justify-content-between">
        <img src="${images[data.weather[0].icon]}" class="icon p-3">
        <div class="p-3">
          <h3>${data.weather[0].description}</h3>
          <h4>${data.main.temp}</h4>
          <div class="pt-3">
            <div> Humidity : ${data.main.humidity}</div>
            <div> Wind Speed : ${data.wind.speed}</div>
          </div>
        </div>
      </div>`);
  }

  renderSpinner() {
    this.container.innerHTML = `<div class="spinner-border text-dark m-5" role="status"></div>`;
  }

  renderError() {
    this.container.innerHTML = `<div class="alert alert-danger my-5 py-2" role="alert">city does not Exist</div>`;
  }

  renderInfo() {
    this.container.innerHTML = `<div class="alert alert-info my-5 py-2" role="alert">Enter any city name to search</div>`;
  }
}
export default new InfoView();
