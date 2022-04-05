import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { List } from "../components/List";
import { Card } from "../components/Card";
import { Controls } from "../components/Controls";

import { useSelector } from "react-redux";

export const HomePage = () => {
  const { countries } = useSelector((state) => state.countries);
  const [filtredCountries, setFiltredCountries] = useState([]);

  useEffect(() => {
    if (countries) setFiltredCountries(countries);
  }, [countries]);

  const { push } = useHistory();

  const hundleSearch = (search, region) => {
    let data = [...countries];

    if (region) {
      data = data.filter((c) => c.region.includes(region));
    }

    if (search) {
      data = data.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFiltredCountries(data);
  };

  return (
    <>
      <Controls onSearch={hundleSearch} />
      <List>
        {filtredCountries.map((c) => {
          const countryInfo = {
            img: c.flags.png,
            name: c.name,
            info: [
              {
                title: "Population",
                description: c.population.toLocaleString(),
              },
              {
                title: "Region",
                description: c.region,
              },
              {
                title: "Capital",
                description: c.capital,
              },
            ],
          };

          return (
            <Card
              key={c.name}
              onClick={() => {
                push(`/country/${c.name}`);
              }}
              {...countryInfo}
            />
          );
        })}
      </List>
    </>
  );
};
