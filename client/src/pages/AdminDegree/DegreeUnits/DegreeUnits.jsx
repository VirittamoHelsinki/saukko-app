// Import react packages
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Import components
import Stepper from '../../../components/Stepper/Stepper';
import SelectUnit from '../../../components/SelectUnit/SelectUnit';
import PageNavigationButtons from '../../../components/PageNavigationButtons/PageNavigationButtons';
import PaginationButtons from '../../../components/PaginationButtons';

// Import state management
import useStore from '../../../store/zustand/formStore';
import WithDegree from '../../../HOC/withDegree';

import useUnitsStore from '../../../store/zustand/unitsStore'
import useHeadingStore from '../../../store/zustand/useHeadingStore';
import FieldValueCard from '../../../components/FieldValueCard/FieldValueCard';

function DegreeUnits({ degree }) {
  const checkedUnits = useUnitsStore((state) => state.checkedUnits);
  const navigate = useNavigate();
  const params = useParams();

  // Get degree name from zustand store
  const { degreeName } = useStore();
  const { setSiteTitle, setSubHeading, setHeading } = useHeadingStore();

  // Save degree units to state once degree is fetched
  const degreeUnits = degree.units;
  const [filteredUnits, setFilteredUnits] = useState(degreeUnits);

  useEffect(() => {
    setSiteTitle("Suoritusten hallinnoi"), setSubHeading("Lisää uusi tutkinto"), setHeading("Tutkintojen hallinta")
    setFilteredUnits(degreeUnits);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [degree]);

  // Pagination logic
  const [page, setPage] = useState(1);
  const unitsPerPage = 5;

  const handlePageChange = (value) => {
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

        <FieldValueCard title="Valittu tutkinto" value={degree ? degree?.name?.fi : degreeName} />

        <div className='degreeUnits__container--units'>
          {
            currentUnits
              ? (
                currentUnits.map((unit) => (
                  <SelectUnit
                    key={unit._id}
                    unit={unit}
                    allUnits={degree.units}
                  />
                ))
              )
              : 'ei dataa APIsta'
          }
        </div>

        <PaginationButtons
          currentPage={page}
          pageCount={filteredUnits && Math.ceil(filteredUnits.length / unitsPerPage)}
          handlePageClick={handlePageChange}
        />

        <PageNavigationButtons
          handleBack={() => navigate(`/degrees/${params.degreeId}`)}
          handleForward={() => navigate(`/degrees/${params.degreeId}/edit-units`)}
          showForwardButton={true}
          disabled={checkedUnits.length === 0}
        />
      </section>
    </div>
  );
}

export default WithDegree(DegreeUnits);
