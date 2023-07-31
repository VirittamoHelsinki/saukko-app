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
import InternalDegreeContext from '../../../utils/context/InternalDegreeContext';

function CompanyDegreeUnits() {
  const navigate = useNavigate();

  // Set path & get degree from DegreeContext
  const { setinternalDegreeId, internalDegree, degreeFound } = useContext(InternalDegreeContext);
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

  // Text for stepper's labels
  const labelStepper = [
    'Tutkintotiedot',
    'Valitse tutkinnonosat',
    'Määritä tehtävät',
    'Vahvista',
  ];

  return (
    <main className='degreeUnits__wrapper'>
      <WavesHeader title='Saukko' secondTitle={degreeFound && internalDegree.name.fi} />
      <section className='degreeUnits__container'>
        <Stepper
          activePage={2}
          totalPages={4}
          label={labelStepper}
          url={`/degrees/${internalDegree._id}`}
        />
        <h1>Valitse tutkinnon osat</h1>
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
          handleBack={() => navigate(`/degrees/${internalDegree._id}`)}
          handleForward={() =>
            navigate(`/degrees/${internalDegree._id}/units/confirm-selection`)
          }
          forwardButtonText={'Valitse tutkinnonosat'}
        />
      </section>
      <UserNav />
    </main>
  );
}

export default CompanyDegreeUnits;
