import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserNav from '../../../components/UserNav/UserNav';
import WavesHeader from '../../../components/Header/WavesHeader';
import InternalApiContext from '../../../store/context/InternalApiContext';
import Searchbar from '../../../components/Searchbar/Searchbar';
import Button from '../../../components/Button/Button';

// controls how many degrees are shown at once and renders them
const CheckLength = ({
  filteredList,
  allInternalDegrees,
  paginate,
  currentPage,
}) => {
  const startIndex = (currentPage - 1) * paginate;
  const endIndex = startIndex + paginate;
  const list = filteredList.length > 0 ? filteredList : allInternalDegrees;
  
  const navigate = useNavigate();
  
  return (
    <>
      {list.slice(startIndex, endIndex).map((degree, index) => (
        <div
          key={index}
          className='addDegree__container--list-item'
          //handleBack={() =>navigate(`/degrees/${params.degreeId}/units/tasks`)}
          onClick={() =>navigate(`${degree._id}`)}
        >
          <p>{degree.name.fi}</p>
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
    <div className='addDegree__container--list-pagination'>
      <section className='addDegree__container--list-pagination-nums'>
        {/* Render numbered buttons */}
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
      </section>
      {/* Render previous and next buttons */}
      <section className='addDegree__container--list-pagination-arrows'>
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
      </section>
    </div>
  );
};

const AddDegree = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [paginate, setPaginate] = useState(5);
  const [filteredList, setFilteredList] = useState([]);

  const navigate = useNavigate();

  // Get degrees from InternalApiContext
  const { allInternalDegrees } = useContext(InternalApiContext);
  console.log('allInternalDegrees123: ', allInternalDegrees);

  // Searchbar logic
  const handleSearch = (event) => {
    setCurrentPage(1); // Reset page when searching
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

  return (
    <main className='addDegree__wrapper'>
      <WavesHeader
        title='Saukko'
        secondTitle='Tutkintojen hallinta'
        disabled={false}
      />
      <UserNav />
      <section className='addDegree__container'>
        <Button
          text='Lisää tutkinto'
          style={{
            marginLeft: '25%',
            marginBottom: '10px',
            marginTop: '10px',
            width: '50%',
            backgroundColor: '#0000BF',
            color: 'white',
            border: 'none',
          }}
          icon={'ic:baseline-plus'}
          onClick={() => navigate(`/degrees`)}
        />

        <Searchbar handleSearch={handleSearch} placeholder={'Etsi koulutus'} />

        <div className='addDegree__container--list'>
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
      </section>
    </main>
  );
};

export default AddDegree;
