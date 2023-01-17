// importing react components
import { useState } from "react";

// importing components
import UserNav from "../../components/UserNav/UserNav";
import WavesHeader from "../../components/Header/WavesHeader";

// controls how many degrees are shown at once and renders them
const CheckLength = ({ filteredList }) => {
  return (
    <>
      {filteredList.map((degree, index) => (
        <div key={index} className="searchPage__container--list-item">
          <h3>{degree.title}</h3>
          <div className="searchPage__container--list-item-bottom">
            <div>
              <p>{degree.diary}</p>
              <p>{degree.code}</p>
            </div>
            <li>&#8250;</li>
          </div>
        </div>
      ))}
    </>
  );
};

const SearchPage = () => {
  const [searchResult, setSearchResult] = useState("");
  const [filteredList, setFilteredList] = useState([]);
  const [degrees, setDegrees] = useState([
    {
      id: 0,
      title: "Autoalan perustutkinto",
      diary: "OPH-2762-2017",
      code: 351301,
    },

    {
      id: 1,
      title: "Tieto- ja viestintätekniikan ammattitutkinto",
      diary: "OPH-2653-2017",
      code: 344103,
    },
    {
      id: 2,
      title: "Teknisen suunnittelun perustutkinto",
      diary: "OPH-792-2017",
      code: 352903,
    },

    {
      id: 3,
      title: "Eläintenhoidon ammattitutkinto",
      diary: "OPH-653-2017",
      code: 351332,
    },
  ]);

  const handleSearchResult = (event) => {
    // get value from search bar
    const search = event.target.value;
    // make a copy of the current list of degrees
    let copyArr = [...degrees];
    // sets search bars input into state
    setSearchResult(search);
    // update list with search parameters
    setFilteredList(
      copyArr.filter((degree) =>
        degree.title.toLowerCase().includes(search.toLowerCase())
      )
    );
  };

  return (
    <main className="searchPage__wrapper">
      <WavesHeader
        title="Ammatilliset koulutukset"
        fill="#9fc9eb"
        disabled="false"
      />
      <UserNav />
      <section className="searchPage__container">
        <input
          value={searchResult}
          onChange={handleSearchResult}
          placeholder="Etsi koulutus"
        />
        <h2>Ammatilliset koulutukset</h2>
        <div className="searchPage__container--list">
          <CheckLength filteredList={filteredList} />
        </div>
      </section>
    </main>
  );
};

export default SearchPage;
