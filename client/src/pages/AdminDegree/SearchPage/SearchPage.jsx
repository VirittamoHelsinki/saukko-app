import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHeadingContext } from '../../../store/context/headingContectProvider';
import Searchbar from '../../../components/Searchbar/Searchbar';
import withPaginatedDegrees from '../../../HOC/withPaginatedDegrees';
import { CircularProgress } from '@mui/material';

import PaginationButtons from '../../../components/PaginationButtons';

const ChevronRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="14" viewBox="0 0 10 14" fill="none">
    <path d="M6.00241 7L0.816406 2L2.37241 0.5L9.11641 7L2.37241 13.5L0.816406 12L6.00241 7Z" fill="currentColor"/>
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
            <PaginationButtons
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

s
