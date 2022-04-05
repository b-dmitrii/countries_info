import { useEffect } from "react";
import { Switch, Route } from "react-router-dom";

import { Header } from "./components/Header";
import { Main } from "./components/Main";

import { HomePage } from "./pages/HomePage";
import { NotFound } from "./pages/NotFound";
import { Details } from "./pages/Details";
import { useDispatch } from "react-redux";
import { Operation } from "./store/countries";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Operation.loadCountries());
  }, [dispatch]);

  return (
    <>
      <Header />
      <Main>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/country/:name" component={Details} />
          <Route component={NotFound} />
        </Switch>
      </Main>
    </>
  );
}

export default App;
