// Import React packages
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Import libraries
import { Icon } from '@iconify/react';
import Pagination from '@mui/material/Pagination';

// Import components
import WavesHeader from '../../../components/Header/WavesHeader';
import UserNav from '../../../components/UserNav/UserNav';
import PageNumbers from "../../../components/PageNumbers/PageNumbers";
import Button from "../../../components/Button/Button";
import SelectUnit from "../../../components/SelectUnit/SelectUnit";
import { units } from './unitsTempData';

function DegreeUnits() {
  const navigate = useNavigate();
  
  // Searchbar logic
  const [filteredUnits, setFilteredUnits] = useState(units);
  
  const handleSearchResult = (event) => {
    setPage(1); // Reset to the first page
    setFilteredUnits(
      units.filter((unit) =>
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
  const currentUnits = filteredUnits.slice(indexOfFirstUnit, indexOfLastUnit);

  return (
    <main className="degreeUnits__wrapper">
      <WavesHeader title="Saukko" secondTitle="Autoalan perustutkinto" fill="#9fc9eb" />
      <section className="degreeUnits__container">
        <PageNumbers activePage={2}/>
        <h1>Valitse tutkinnon osat</h1>

        <div className="degreeUnits__container--searchField">
          <input onChange={handleSearchResult} placeholder="Etsi tutkinnonosat" />
          <Icon icon="material-symbols:search" hFlip={true} />
        </div>

        <div className="degreeUnits__container--units">
          {currentUnits.map((unit) => (
            <SelectUnit key={unit._id} unit={unit} allUnits={units}/>
          ))}
        </div>

        <Pagination
          count={Math.ceil(filteredUnits.length / unitsPerPage)}
          page={page}
          onChange={handlePageChange}
        />

        <div className="degreeUnits__container--buttons">
          <div className="degreeUnits__container--buttons-back">
            <Button
              text="Takaisin"
              onClick={() => navigate('/degree-info')} // later fix to degree-info/:id
              icon={"formkit:arrowleft"}
            />
          </div>
          <div className="degreeUnits__container--buttons-forward">
            <Button
              text="Valitse tutkinnonosat"
              onClick={() => navigate('/confirm-selection')}
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
