import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Searchbar from '../../components/Searchbar/Searchbar';
import Button from '../../components/Button/Button';
import InternalApiContext from '../../store/context/InternalApiContext';
import { useHeadingContext } from '../../store/context/headingContectProvider';
// import { arrayIncludes } from '@mui/x-date-pickers/internals/utils/utils';
// import { buildDeprecatedPropsWarning } from '@mui/x-date-pickers/internals';

// controls how many company name are shown at once and renders them
const CheckLength = ({
  filteredList,
  workplaces,
  paginate,
  currentPage,
}) => {
  const startIndex = (currentPage - 1) * paginate;
  const endIndex = startIndex + paginate;
  const list = filteredList.length > 0 ? filteredList : workplaces;
  const { setSiteTitle, setSubHeading, setHeading } = useHeadingContext();

  useEffect(() => {
    setSiteTitle("Lisää työpaikkaa"), setSubHeading(""), setHeading("Työpaikkojen hallinta")
  }, [setHeading, setSiteTitle, setSubHeading])

    const navigate = useNavigate();
  return (
    <>
      {list.slice(startIndex, endIndex).map((company, index) => (
        <div
          key={index}
          className='addDegree__container--list-item'
          style={{cursor:'pointer'}}
          onClick={() => navigate(`${company._id}`)}
        >
          <p>{company.name}</p>
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
        <button
          // Disable button if current page is the first page
          disabled={currentPage === 1}
          onClick={() => handlePageClick(currentPage - 1)}
          style={{backgroundColor:'white', border:'none'}}
        >
          {'< '}
        </button>
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
        <button
          // Disable button if current page is the last page
          disabled={currentPage === pageCount}
          onClick={() => handlePageClick(currentPage + 1)}
          style={{backgroundColor:'white', border:'none'}}
        >
          {' >'}
        </button>
      </section>
      {/* Render previous and next buttons */}
      {/* <section className='addDegree__container--list-pagination-arrows'>
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

const AddCompanyName = () => {
  const [currentPage, setCurrentPage] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [paginate, setPaginate] = useState(5);
  const [filteredList, setFilteredList] = useState([]);

  const navigate = useNavigate();

  // Get company name from Internal saukko database

  const { workplaces } = useContext(InternalApiContext);

  console.log('Internal saukko database workplaces: ', workplaces);


  // Searchbar logic
  const handleSearch = (event) => {
    setCurrentPage(1); // Reset page when searching
    setFilteredList(
      workplaces.filter((company) =>
        company.name.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
  };

  // Pagination logic
  const pageCount =
    filteredList.length > 0
      ? Math.ceil(filteredList.length / paginate)
      : Math.ceil(workplaces.length / paginate);

  const handlePageClick = (pageNum) => {
    setCurrentPage(pageNum);
  };

  return (
    <div className='addDegree__wrapper'>
      <section className='addDegree__container'>
        <Button
          id='addWorkplaceButton'
          text='Lisää työpaikka'
          style={{
            marginLeft: '20%',
            marginBottom: '10px',
            marginTop: '10px',
            width: '60%',
            backgroundColor: '#0000BF',
            color: 'white',
            border: 'none',
          }}
          icon={'ic:baseline-plus'}
          onClick={() => navigate(`/company-info`)}
        />

        <Searchbar id='workplaceSearchbar' handleSearch={handleSearch} placeholder={'Etsi työpaikka'} />

        <div className='addDegree__container--list'>
          <CheckLength
            filteredList={filteredList}
            workplaces={workplaces}
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
    </div>
  );
};

export default AddCompanyName;


