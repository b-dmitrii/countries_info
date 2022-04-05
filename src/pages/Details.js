import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import { IoArrowBack } from "react-icons/io5";

import { Button } from "../components/Button";
import { Info } from "../components/Info";
import { useDispatch, useSelector } from "react-redux";
import { ActionCreator, Operation } from "../store/countries";

export const Details = () => {
  const dispatch = useDispatch();

  const { name } = useParams();
  const { push, goBack } = useHistory();
  const [country, setCountry] = useState(null);
  useEffect(() => {
    dispatch(Operation.loadSearchingCountries(name));
  }, [dispatch, name]);

  const { searchCountries } = useSelector((state) => state.countries);
  useEffect(() => {
    if (searchCountries) setCountry(searchCountries);
  }, [searchCountries]);

  return (
    <div>
      <Button
        onClick={() => {
          dispatch(ActionCreator.clearSearchCountries());
          goBack();
        }}
      >
        <IoArrowBack /> Back
      </Button>
      {country && <Info {...country} push={push} />}
    </div>
  );
};
