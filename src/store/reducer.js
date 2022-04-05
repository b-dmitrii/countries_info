import { combineReducers } from "redux";
import { reducer as CountriesReduser } from "./countries";

const reducer = combineReducers({
  countries: CountriesReduser,
});

export default reducer;
