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
    
  // Checkbox logic
  const [checkedUnits, setCheckedUnits] = useState([]);
  
  const handleCheckboxChange = (unitId) => {
    if (checkedUnits.includes(unitId)) {
      setCheckedUnits(checkedUnits.filter((id) => id !== unitId));
    } else {
      setCheckedUnits([...checkedUnits, unitId]);
    }
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

  // Number units
  const getUnitNumber = (id) => {
    const foundUnit = units.find(unit => unit._id === id);
    if (foundUnit) {
      return units.indexOf(foundUnit) + 1;
    }
  };

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
          {currentUnits.map((unit, index) => (
            <div
              key={unit._id}
              className={`degreeUnits__container--units-unit ${
                checkedUnits.includes(unit._id) && 'checked'
              }`}
              onClick={() => navigate('/unit-info')} // later navigate to unit-info/:id
            >
              <div
                className={`degreeUnits__container--units-unit-checkbox ${
                  checkedUnits.includes(unit._id) && 'checked'
                }`}
                onClick={() => handleCheckboxChange(unit._id)}
              >
                {checkedUnits.includes(unit._id) && <Icon icon="mdi:tick" color="white" />}
                {console.log(checkedUnits)}
              </div>
              <p key={unit._id}>
                <b>{getUnitNumber(unit._id)}.</b> {unit.name.fi}
              </p>
              <Icon icon="iconamoon:arrow-right-2-light" className="degreeUnits__container--units-unit-arrow" />
            </div>
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
