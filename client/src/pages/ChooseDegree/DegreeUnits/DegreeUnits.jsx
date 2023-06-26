// Import react packages
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Import libraries
import { Icon } from '@iconify/react';
import Pagination from '@mui/material/Pagination';

// Import components
import WavesHeader from '../../../components/Header/WavesHeader';
import UserNav from '../../../components/UserNav/UserNav';
import PageNumbers from "../../../components/PageNumbers/PageNumbers";
import Button from "../../../components/Button/Button";
import SelectUnit from "../../../components/SelectUnit/SelectUnit";
import DegreeContext from '../../../utils/context/DegreeContext';

function DegreeUnits() {
  const navigate = useNavigate();

  // Set path & get degree from DegreeContext
  const { setPath, degree } = useContext(DegreeContext);
  const params = useParams();
  
  useEffect(() => {
    setPath(params.degreeId);
  }, []);

  // Check if degree object is empty  
  const degreeFound = Object.keys(degree).length > 0 ? true : false
  
  // Save degree units to state once degree is fetched
  const degreeUnits = degree.units
  const [filteredUnits, setFilteredUnits] = useState(degreeUnits);

  useEffect(() => {
    setFilteredUnits(degreeUnits);
  }, [degree]);
  
  // Searchbar logic
  const handleSearchResult = (event) => {
    setPage(1); // Reset to the first page
    setFilteredUnits(
      degree.units.filter((unit) =>
      unit.name.fi.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
  };

  // Pagination logic
  const [page, setPage] = useState(1);
  const unitsPerPage = 4;
  
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  
  const indexOfLastUnit = page * unitsPerPage;
  const indexOfFirstUnit = indexOfLastUnit - unitsPerPage;
  const currentUnits = filteredUnits?.slice(indexOfFirstUnit, indexOfLastUnit);

  return (
    <main className="degreeUnits__wrapper">
      <WavesHeader title="Saukko" secondTitle={degreeFound && degree.name.fi} />
      <section className="degreeUnits__container">
        <PageNumbers activePage={2}/>
        <h1>Valitse tutkinnon osat</h1>

        <div className="degreeUnits__container--searchField">
          <input onChange={handleSearchResult} placeholder="Etsi tutkinnonosat" />
          <Icon icon="material-symbols:search" hFlip={true} />
        </div>

        <div className="degreeUnits__container--units">
          {currentUnits?.map((unit) => (
            <SelectUnit key={unit._id} unit={unit} allUnits={degree.units}/>
          ))}
        </div>

        <Pagination
          count={Math.ceil(filteredUnits?.length / unitsPerPage)}
          page={page}
          onChange={handlePageChange}
        />

        <div className="degreeUnits__container--buttons">
          <div className="degreeUnits__container--buttons-back">
            <Button
              text="Takaisin"
              onClick={() => navigate(`/degree-info/${degree._id}`)}
              icon={"formkit:arrowleft"}
            />
          </div>
          <div className="degreeUnits__container--buttons-forward">
            <Button
              text="Valitse tutkinnonosat"
              onClick={() => navigate(`/confirm-selection/${degree._id}`)}
              icon={"formkit:arrowright"}
            />
          </div>
        </div>
      </section>
      <UserNav />
    </main>
  );
}

export default DegreeUnits;
