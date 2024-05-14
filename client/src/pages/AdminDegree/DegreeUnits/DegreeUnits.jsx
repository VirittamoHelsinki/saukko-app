// Import react packages
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Import libraries
import Pagination from '@mui/material/Pagination';

// Import components
import Stepper from '../../../components/Stepper/Stepper';
import SelectUnit from '../../../components/SelectUnit/SelectUnit';
// import Searchbar from '../../../components/Searchbar/Searchbar';
import PageNavigationButtons from '../../../components/PageNavigationButtons/PageNavigationButtons';

// Import state management
import useStore from '../../../store/zustand/formStore';
import { useHeadingContext } from '../../../store/context/headingContectProvider';
import WithDegree from '../../../HOC/withDegree';

function DegreeUnits({ degree }) {
  const navigate = useNavigate();
  const params = useParams();

  // Get degree name from zustand store
  const { degreeName } = useStore();
  const { setSiteTitle, setSubHeading, setHeading } = useHeadingContext();

  // Save degree units to state once degree is fetched
  const degreeUnits = degree.units;
  const [filteredUnits, setFilteredUnits] = useState(degreeUnits);

  useEffect(() => {
    setSiteTitle("Suoritusten hallinnoi"), setSubHeading("Lisää uusi tutkinto"), setHeading("Tutkintojen hallinta")
    setFilteredUnits(degreeUnits);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [degree]);

  // Searchbar logic
  // eslint-disable-next-line no-unused-vars
  const handleSearch = (event) => {
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

  // Labels and urls for stepper
  const stepperData = [
    {
      label: 'Tutkinto-tiedot',
      url: `/degrees/${params.degreeId}`
    },
    {
      label: 'Valitse tutkinnonosat',
      url: `/degrees/${params.degreeId}/units`
    },
    {
      label: 'Määritä tehtävät',
      url: `/degrees/${params.degreeId}/units/tasks`
    },
    {
      label: 'Yhteenveto',
      url: `/degrees/${params.degreeId}/summary`
    },
  ];

  return (
    <div className='degreeUnits__wrapper'>
      <section className='degreeUnits__container'>
        <Stepper
          activePage={2}
          totalPages={4}
          data={stepperData}
        />
        <h1>{degree ? degree?.name.fi : degreeName}</h1>
        {/* <Searchbar
          handleSearch={handleSearch}
          placeholder={'Etsi tutkinnonosat'}
        /> */}

        <div className='degreeUnits__container--units'>
          {currentUnits
            ? currentUnits.map((unit) => (
              <SelectUnit
                key={unit._id}
                unit={unit}
                allUnits={degree.units}
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
          sx={{
            '& .MuiPaginationItem-root':{
              position: 'relative',
              zIndex:'-1',
          }}}
        />

        <PageNavigationButtons
          handleBack={() => navigate(`/degrees/${params.degreeId}`)}
          handleForward={() => navigate(`/degrees/${params.degreeId}/edit-units`)}
          showForwardButton={true}
        />
      </section>
    </div>
  );
}

export default WithDegree(DegreeUnits);
