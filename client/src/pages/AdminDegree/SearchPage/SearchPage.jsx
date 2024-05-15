/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHeadingContext } from '../../../store/context/headingContectProvider';
import Searchbar from '../../../components/Searchbar/Searchbar';
import withPaginatedDegrees from '../../../HOC/withPaginatedDegrees';
import { CircularProgress } from '@mui/material';

const DegreeList = ({ data }) => {
  const navigate = useNavigate();
  const handleChooseDegree = async (degreeId) => {
    navigate(`${degreeId}`)
  }

  return (
    <>
      {data.map((degree, index) => (
        <div key={index} className="searchPage__container--list-item" onClick={() => handleChooseDegree(degree._id)}>
          <h3>{degree.name.fi}</h3>
          <div className='searchPage__container--list-item-bottom'>
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
    <div className='searchPage__container--list-pagination'>
      <section className='searchPage__container--list-pagination-nums'>
        {/* Render numbered buttons */}
        <button
          // Disable button if current page is the first page
          disabled={currentPage === 1}
          onClick={() => handlePageClick(currentPage - 1)}
          style={{border:'none', backgroundColor:'white',  margin:'0 10px'}}
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
          style={{border:'none', backgroundColor:'white', margin:'0 10px' }}
          className='arrow__button__right'
        >
          {' >'}
        </button>


      </section>
      {/* Render previous and next buttons */}
      {/* <section className='searchPage__container--list-pagination-arrows'>
        <button
          // Disable button if current page is the first page
          disabled={currentPage === 1}
          onClick={() => handlePageClick(currentPage - 1)}
          className='arrow__button'
        >
          {'< Previous'}
        </button>
        <button
          // Disable button if current page is the last page
          disabled={currentPage === pageCount}
          onClick={() => handlePageClick(currentPage + 1)}
          className='arrow__button'
        >
          {'Next >'}
        </button>
      </section> */}
    </div>
  );
};

const SearchPage = ({ data, loading, page, setPage, totalPages }) => {
  const { setSiteTitle, setSubHeading, setHeading } = useHeadingContext();

  // Clear degree on first render
  useEffect(() => {
    setSiteTitle("Suoritusten hallinnointi"), setSubHeading(""), setHeading("Tutkintojen hallinta");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Searchbar logic
  const handleSearch = (event) => {
    setPage(1) // Reset page when searching
  };

  const handlePageClick = (pageNum) => {
    setPage(pageNum);
  };

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <div className='searchPage__wrapper'>
      <section className='searchPage__container'>
        <Searchbar handleSearch={handleSearch} placeholder={'Etsi tutkinto'} />
        {data ? (
          <>
            <div className="searchPage__container--list">
              <DegreeList data={data} />
            </div>
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
