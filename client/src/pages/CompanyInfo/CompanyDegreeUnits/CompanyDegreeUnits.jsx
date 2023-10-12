// Import react packages
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Import libraries
import Pagination from '@mui/material/Pagination';

// Import components
import WavesHeader from '../../../components/Header/WavesHeader';
import UserNav from '../../../components/UserNav/UserNav';
import Stepper from '../../../components/Stepper/Stepper';
import SelectUnit from '../../../components/SelectUnit/SelectUnit';
import Searchbar from '../../../components/Searchbar/Searchbar';
import PageNavigationButtons from '../../../components/PageNavigationButtons/PageNavigationButtons';
import InternalApiContext from '../../../store/context/InternalApiContext';

function CompanyDegreeUnits() {
  const navigate = useNavigate();

  // Set path & get degree from ExternalApiContext
  const { setinternalDegreeId, internalDegree, degreeFound } = useContext(InternalApiContext);
  const params = useParams();

  useEffect(() => {
    setinternalDegreeId(params.degreeId);
  }, []);

  // Save degree units to state once degree is fetched
  const degreeUnits = internalDegree.units;

  const [filteredUnits, setFilteredUnits] = useState(degreeUnits);

  useEffect(() => {
    setFilteredUnits(degreeUnits);
  }, [internalDegree]);

  // Searchbar logic
  const handleSearch = (event) => {
    setPage(1); // Reset to the first page
    setFilteredUnits(
      internalDegree.units.filter((unit) =>
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

  // Labels and urls for Stepper
  const stepperData = [
    {
      label: 'Lisää tiedot',
      url: '/company-info'
    },
    {
      label: 'Valitse tutkinto',
      url: '/internal/degrees'
    },
    {
      label: 'Valitse tutkinnonosat',
      url: `/internal/degrees/${internalDegree._id}/units`
    },
    {
      label: 'Vahvista',
      url: `/internal/degrees/${internalDegree._id}/units/confirm-selection`
    },
  ];

  return (
    <main className='degreeUnits__wrapper'>
      <WavesHeader title='Saukko' secondTitle='Lisää uusi työpaikka' />
      <section className='degreeUnits__container'>
        <Stepper
          activePage={3}
          totalPages={4}
          data={stepperData}
        />

        <h2>{degreeFound && internalDegree.name.fi} </h2>

        <Searchbar
          handleSearch={handleSearch}
          placeholder={'Etsi tutkinnonosat'}
        />

        <div className='degreeUnits__container--units'>
          {currentUnits
            ? currentUnits.map((unit) => (
              <SelectUnit
                key={unit._id}
                unit={unit}
                allUnits={internalDegree.units}


              />
            ))
            : 'ei dataa APIsta'}
        </div>

        <Pagination
          count={
            filteredUnits && Math.ceil(filteredUnits.length / unitsPerPage)
          }
          page={page}
          onChange={handlePageChange}
        />

        <PageNavigationButtons
          handleBack={() => navigate(`../internal/degrees`)}
          handleForward={() => {

            navigate(`../internal/degrees/${internalDegree._id}/units/confirm-selection`);

          }}
        />
      </section>
      <UserNav />
    </main>
  );
}

export default CompanyDegreeUnits;

