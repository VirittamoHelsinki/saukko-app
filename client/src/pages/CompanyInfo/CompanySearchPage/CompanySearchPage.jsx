import { useState, useContext, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import Stepper from '../../../components/Stepper/Stepper';
import Searchbar from '../../../components/Searchbar/Searchbar';
import PageNavigationButtons from '../../../components/PageNavigationButtons/PageNavigationButtons';

import InternalApiContext from '../../../store/context/InternalApiContext';
import useHeadingStore from '../../../store/zustand/useHeadingStore';


// controls how many degrees are shown at once and renders them
const CheckLength = ({ filteredList, allInternalDegrees, paginate, currentPage }) => {
  const startIndex = (currentPage - 1) * paginate;
  const endIndex = startIndex + paginate;
  const list = filteredList.length > 0 ? filteredList : allInternalDegrees;
  const navigate = useNavigate();
  console.log(allInternalDegrees)
  return (
    <>
      {list.slice(startIndex, endIndex).map((degree, index) => (
        <div key={index} className="company__searchPage__container--list-item" onClick={() => navigate(`../internal/degrees/${degree?._id}/units`)}>
          <h3>{degree?.name?.fi}</h3>
        </div>
      ))}
    </>
  );
};

const PageButtons = ({ currentPage, pageCount, handlePageClick }) => {
  // Maximum number of numbered buttons to show at a time
  const maxButtons = 5;

  // Start position of numbered buttons to show
  const start = currentPage - Math.floor(maxButtons / 2);

  // End position of numbered buttons to show
  const end = start + maxButtons;

  let pages = [];
  // Create an array of pages to show based on the start and end position
  for (let i = start; i < end; i++) {
    if (i >= 1 && i <= pageCount) {
      pages.push(i);
    }
  }

  return (
    <div className="searchPage__container--list-pagination">
      <section className="searchPage__container--list-pagination-nums">
        {/* Render numbered buttons */}
        <button
          // Disable button if current page is the first page
          disabled={currentPage === 1}
          onClick={() => handlePageClick(currentPage - 1)}
          style={{ border: 'none', backgroundColor: 'white', margin: '0 10px' }}
          className='arrow__button__left'
        >
          {'< '}
        </button>
        {pages.map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => handlePageClick(pageNum)}
            className={`pagination__button ${pageNum === currentPage ? 'pagination__button--active' : ''
              }`}
          >
            {pageNum}
          </button>
        ))}
        <button
          // Disable button if current page is the last page
          disabled={currentPage === pageCount}
          onClick={() => handlePageClick(currentPage + 1)}
          style={{ border: 'none', backgroundColor: 'white', margin: '0 10px' }}
          className='arrow__button__right'
        >
          {' >'}
        </button>
      </section>
      {/* Render previous and next buttons */}
      {/* <section className="searchPage__container--list-pagination-arrows">
        <button
          // Disable button if current page is the first page
          disabled={currentPage === 1}
          onClick={() => handlePageClick(currentPage - 1)}
          className="arrow__button"
        >
          {"< Previous"}
        </button>
        <button
          // Disable button if current page is the last page
          disabled={currentPage === pageCount}
          onClick={() => handlePageClick(currentPage + 1)}
          className="arrow__button"
        >
          {"Next >"}
        </button>
      </section> */}
    </div>
  );
};

const CompanySearchPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [paginate, setPaginate] = useState(5);
  const [filteredList, setFilteredList] = useState([]);
  const navigate = useNavigate();

  // Get degrees from InternalApiContext
  const { allInternalDegrees, internalDegree } = useContext(InternalApiContext);

  const { setSiteTitle, setSubHeading, setHeading } = useHeadingStore();

  useEffect(() => {
    setSiteTitle("Lisää työpaikka"), setSubHeading("Lisää uusi työpaikka"), setHeading("Työpaikkojen hallinta")
  }, [setSiteTitle, setSubHeading, setHeading])
  // Searchbar logic
  const handleSearch = (event) => {
    setCurrentPage(1) // Reset page when searching
    setFilteredList(
      allInternalDegrees.filter((degree) =>
        degree.name.fi.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
  };

  // Pagination logic
  const pageCount =
    filteredList.length > 0
      ? Math.ceil(filteredList?.length / paginate)
      : Math.ceil(allInternalDegrees?.length / paginate);

  const handlePageClick = (pageNum) => {
    setCurrentPage(pageNum);
  };

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
    <div className="company__searchPage__wrapper">
      <section className="company__searchPage__container">
        <div className='stepper__container'>
          <Stepper
            activePage={2}
            totalPages={4}
            data={stepperData}
          />
        </div>

        <h2>Valitse tutkinto</h2>
        <Searchbar id='searchbarId' handleSearch={handleSearch} placeholder={'Etsi tutkinto'} />
        <div className="searchPage__container--list">
          <CheckLength
            filteredList={filteredList}
            allInternalDegrees={allInternalDegrees}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
        <PageButtons
          currentPage={currentPage}
          pageCount={pageCount}
          handlePageClick={handlePageClick}
        />
        <PageNavigationButtons
          handleBackText={'Takaisin'}
          handleBack={() => navigate('/company-info')}
          showForwardButton={false}
          icon={'mingcute:pencil-line'}
          style={{ textAlign: 'left' }}
        />
      </section>
    </div>
  );
};

export default CompanySearchPage;



