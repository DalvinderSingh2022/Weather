import { getCityData, StateMan } from "./modal";
import InfoView from "./Views/InfoView";
import SearchView from "./Views/SearchView";
import "regenerator-runtime";

const handleSearch = async (event) => {
  event.preventDefault();
  if (document.querySelector(".search-form input").value) {
    const { query } = SearchView;
    StateMan.setState({
      ...StateMan.state,
      isLoading: true,
    });
    const data = await getCityData(query);
    StateMan.setState({
      ...StateMan.state,
      isLoading: false,
      info: data,
    })
    SearchView.clearForm();
  }else{
    InfoView.renderInfo();
  }
};

window.addEventListener("stateUpdate", () => {
  if (StateMan.state.isLoading) {
    InfoView.renderSpinner();
  } else if (StateMan.state.info.cod == 404) {
    InfoView.renderError();
  } else {
    InfoView.render(StateMan.state.info);
  }
});

const init = () => {
  SearchView.addSubmitController(handleSearch);
};
init();