import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHeadingContext } from '../../../store/context/headingContectProvider';
import Searchbar from '../../../components/Searchbar/Searchbar';
import withPaginatedDegrees from '../../../HOC/withPaginatedDegrees';
import { CircularProgress } from '@mui/material';

import "./_pagination.scss"

const ChevronRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="14" viewBox="0 0 10 14" fill="none">
    <path d="M6.00241 7L0.816406 2L2.37241 0.5L9.11641 7L2.37241 13.5L0.816406 12L6.00241 7Z" fill="black"/>
  </svg>
)

const ChevronLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M10.5 12L15.5 17L14 18.5L7.5 12L14 5.5L15.5 7L10.5 12Z" fill="#B3B3B3"/>
  </svg>
)

const DegreeList = ({ degrees }) => {
  const navigate = useNavigate();
  const handleChooseDegree = async (degreeId) => {
    navigate(`${degreeId}`)
  }

  return (
    <div className="searchPage__container--list">
      {
        degrees.map((degree, index) => (
          <div key={index} className="searchPage__container--list-item" onClick={() => handleChooseDegree(degree._id)}>
            <h3>{degree.name.fi}</h3>
            <div className='searchPage__container--list-item-bottom'>
              <p>Diaari: {degree.diaryNumber}</p>
              <div className="space-fill"></div>
              <p>Koodi: {degree.eduCodeValue}</p>
              <ChevronRightIcon />
            </div>
          </div>
        ))
      }
    
    </div>
  );
};

const PageButtons = ({ currentPage, pageCount, handlePageClick }) => {
  // Maximum number of numbered buttons to show at a time
  const maxButtons = 5;

  const start = Math.max(1, Math.min(pageCount - maxButtons + 1, currentPage - Math.floor(maxButtons / 2)))
  const end = start + maxButtons

  const pageNumbers = []
  for (let i = start; i < end; i++) {
    pageNumbers.push(i)
  }

  return (
    <div className='pagination'>
        {/* Render numbered buttons */}
      <button
        // Disable button if current page is the first page
        disabled={currentPage === 1}
        onClick={() => handlePageClick(currentPage - 1)}
        className='pagination__button'
      >
        <ChevronLeftIcon />
      </button>


      <button
        key={1}
        onClick={() => handlePageClick(1)}
        className={`pagination__button ${1 === currentPage ? 'active' : ''}`}
      >
        1
      </button>

      { pageNumbers[0] > 2 && <p>...</p> }

      {
        pageNumbers.map((pageNumber) => {
          if (pageNumber === 1) return
          if (pageNumber === pageCount) return

          return (
            <button
              key={pageNumber}
              onClick={() => handlePageClick(pageNumber)}
              className={`pagination__button ${pageNumber === currentPage ? 'active' : ''}`}
            >
              { pageNumber }
            </button>
          )
        })
      }

      { pageNumbers[pageNumbers.length - 1] < pageCount - 1 && <p>...</p> }

      <button
        key={pageCount}
        onClick={() => handlePageClick(pageCount)}
        className={`pagination__button ${pageCount === currentPage ? 'active' : ''}`}
      >
        {pageCount}
      </button>


        <button
        // Disable button if current page is the last page
        disabled={currentPage === pageCount}
        onClick={() => handlePageClick(currentPage + 1)}
        className='pagination__button'
      >
        <ChevronRightIcon />
      </button>
    </div>
  );
};

const SearchPage = ({ data, loading, page, setPage, totalPages, setSearchParam }) => {
  const { setSiteTitle, setSubHeading, setHeading } = useHeadingContext();

  // Clear degree on first render
  useEffect(() => {
    setSiteTitle("Suoritusten hallinnointi"), setSubHeading(""), setHeading("Tutkintojen hallinta");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Searchbar logic
  const handleSearch = (event) => {
    setPage(1) // Reset page when searching
    setSearchParam(event.target.value)
  };

  const handlePageClick = (pageNum) => {
    setPage(pageNum);
  };

  return (
    <div className='searchPage__wrapper'>
      <section className='searchPage__container'>
        <Searchbar handleSearch={handleSearch} placeholder={'Etsi tutkinto'} />
        {(data && !loading) ? (
          <>
            <DegreeList degrees={data} />
            <PageButtons
              currentPage={page}
              pageCount={totalPages}
              handlePageClick={handlePageClick}
            />
          </>
        ) : (
          <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'fixed', 
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            background: 'rgba(255, 255, 255, 0.5)', /* Semi-transparent background overlay */
          }}
        >
          <div>
            <CircularProgress />
          </div>
        </div>
        )}
      </section>
    </div>
  );
};

export default withPaginatedDegrees(SearchPage);
