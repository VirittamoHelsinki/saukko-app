// Import react packages
import { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Pagination from '@mui/material/Pagination';

import Stepper from '../../../components/Stepper/Stepper';
import SelectUnit from '../../../components/SelectUnit/SelectUnit';
import Searchbar from '../../../components/Searchbar/Searchbar';
import PageNavigationButtons from '../../../components/PageNavigationButtons/PageNavigationButtons';

import InternalApiContext from '../../../store/context/InternalApiContext';
import { useHeadingContext } from '../../../store/context/headingContectProvider';

function CompanyDegreeUnits() {
  const navigate = useNavigate();

  // Set path & get degree from ExternalApiContext
  const { setinternalDegreeId, internalDegree, degreeFound } = useContext(InternalApiContext);
  const params = useParams();

  console.log(params)

  useEffect(() => {
    setinternalDegreeId(params.degreeId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { setSiteTitle, setSubHeading, setHeading } = useHeadingContext();

  useEffect(() => {
    setSiteTitle("Lisää työpaikka"), setSubHeading("Lisää uusi työpaikkaa"), setHeading("Työpaikkojen hallinta")
  }, [setSiteTitle, setSubHeading, setHeading]);


  // Save degree units to state once degree is fetched
  const degreeUnits = internalDegree.units;

  const [filteredUnits, setFilteredUnits] = useState(degreeUnits);

  useEffect(() => {
    setFilteredUnits(degreeUnits);
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
    <main id='degreeUnitsWrapper' className='degreeUnits__wrapper'>
      <section className='degreeUnits__container'>
        <Stepper
          activePage={3}
          totalPages={4}
          data={stepperData}
        />
        <h2>{degreeFound && internalDegree && internalDegree.name && internalDegree.name.fi} </h2>
        <Searchbar
          id='searchbarTutkinnonosat'
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
          showForwardButton={true}
        />
      </section>
    </main>
  );
}

export default CompanyDegreeUnits;





