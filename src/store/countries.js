const initialState = {
  countries: [],
  searchCountries: null,
  neighbors: null,
  loaded: false,
};

export const ActionType = {
  SET_LOADED: `countries/setLoaded`,
  SET_COUNTRIES: `countries/setCountries`,
  SET_SEARCH_COUNTRIES: `countries/setSearchCountries`,
  CLEAR_SEARCH_COUNTRIES: `countries/clearSearchCountries`,
  SET_NEIGHBORS: `countries/setNeighbors`,
};

export const ActionCreator = {
  setLoaded: (loaded) => ({
    type: ActionType.SET_LOADED,
    payload: loaded,
  }),

  setCountries: (countries) => ({
    type: ActionType.SET_COUNTRIES,
    payload: countries,
  }),

  setSearchCountries: (name) => ({
    type: ActionType.SET_SEARCH_COUNTRIES,
    payload: name,
  }),

  clearSearchCountries: () => ({
    type: ActionType.CLEAR_SEARCH_COUNTRIES,
  }),

  setNeighbors: (borders) => ({
    type: ActionType.SET_NEIGHBORS,
    payload: borders,
  }),
};

export const Operation = {
  loadCountries: () => (dispatch, getState, api) => {
    dispatch(ActionCreator.setLoaded(true));

    return api
      .get(`all?fields=name,capital,flags,population,region`)
      .then(({ data }) => {
        dispatch(ActionCreator.setCountries(data));

        dispatch(ActionCreator.setLoaded(false));
      });
  },

  loadSearchingCountries: (name) => (dispatch, getState, api) => {
    dispatch(ActionCreator.setLoaded(true));
    return api.get(`name/${name}`).then(({ data }) => {
      dispatch(ActionCreator.setSearchCountries(data[0]));

      dispatch(ActionCreator.setLoaded(false));
    });
  },

  loadNeighbors: (borders) => (dispatch, getState, api) => {
    dispatch(ActionCreator.setLoaded(true));
    return api.get(`alpha?codes=${borders.join(",")}`).then(({ data }) => {
      dispatch(ActionCreator.setNeighbors(data.map((c) => c.name)));

      dispatch(ActionCreator.setLoaded(false));
    });
  },
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_LOADED:
      return {
        ...state,
        loaded: action.payload,
      };

    case ActionType.SET_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
      };

    case ActionType.SET_SEARCH_COUNTRIES:
      return {
        ...state,
        searchCountries: action.payload,
      };

    case ActionType.CLEAR_SEARCH_COUNTRIES:
      return {
        ...state,
        searchCountries: null,
      };

    case ActionType.SET_NEIGHBORS:
      return {
        ...state,
        neighbors: action.payload,
      };

    default:
      return state;
  }
};
