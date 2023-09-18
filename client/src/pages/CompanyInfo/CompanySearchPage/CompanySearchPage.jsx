import { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import WavesHeader from '../../../components/Header/WavesHeader';
import PageNavigationButtons from '../../../components/PageNavigationButtons/PageNavigationButtons';
import Searchbar from '../../../components/Searchbar/Searchbar';
import UserNav from '../../../components/UserNav/UserNav';
import InternalApiContext from '../../../store/context/InternalApiContext';
import Stepper from '../../../components/Stepper/Stepper';

// controls how many degrees are shown at once and renders them
const CheckLength = ({ filteredList, allInternalDegrees, paginate, currentPage }) => {
  const startIndex = (currentPage - 1) * paginate;
  const endIndex = startIndex + paginate;
  const list = filteredList.length > 0 ? filteredList : allInternalDegrees;
  const navigate = useNavigate();


  return (
    <>
      {list.slice(startIndex, endIndex).map((degree, index) => (
        <div key={index} className="company__searchPage__container--list-item" onClick={() => navigate(`../internal/degrees/${degree._id}/units`)}>
          <h3>{degree.name.fi}</h3>
          <div className="company__searchPage__container--list-item-bottom">
            <div>
              <p>Diaari: {degree.diaryNumber}</p>
              <p>Koodi: {degree.eduCodeValue}</p>
            </div>
            <li>&#8250;</li>
          </div>
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
        {pages.map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => handlePageClick(pageNum)}
            className={`pagination__button ${pageNum === currentPage ? "pagination__button--active" : ""
              }`}
          >
            {pageNum}
          </button>
        ))}
      </section>
      {/* Render previous and next buttons */}
      <section className="searchPage__container--list-pagination-arrows">
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
      </section>
    </div>
  );
};

const CompanySearchPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [paginate, setPaginate] = useState(5);
  const [filteredList, setFilteredList] = useState([]);
  const navigate = useNavigate();

  // Get degrees from ExternalApiContext
  const { allInternalDegrees } = useContext(InternalApiContext);

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
      ? Math.ceil(filteredList.length / paginate)
      : Math.ceil(allInternalDegrees.length / paginate);

  const handlePageClick = (pageNum) => {
    setCurrentPage(pageNum);
  };
  // Text for stepper's labels
  const labelStepper = [
    'Lisää tiedot',
    'Valitse tutkinto',
    'Valitse tutkinnonosat',
    'Vahvista',
  ];

  return (
    <main className="company__searchPage__wrapper">
      <WavesHeader title="Koulutukset" secondTitle="Lisää uusi työpaikka" disabled={false} />

      <section className="company__searchPage__container">
        <div className='stepper__container'>
          <Stepper
            activePage={2}
            totalPages={4}
            label={labelStepper}
            url={`../internal/degrees`}

          />
        </div>

        <Searchbar handleSearch={handleSearch} placeholder={'Etsi koulutus'} />
        <h2>Ammatilliset tutkinnot</h2>
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
        {/* <PageNavigationButtons
          forwardButtonText={'Seurava'} /> */}
      </section>
      <UserNav />
    </main>
  );
};

export default CompanySearchPage;



