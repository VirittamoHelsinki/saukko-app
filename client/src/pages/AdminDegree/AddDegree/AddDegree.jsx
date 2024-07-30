import { useState, useContext, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { useHeadingContext } from '../../../store/context/headingContectProvider';
import InternalApiContext from '../../../store/context/InternalApiContext';

import Searchbar from '../../../components/Searchbar/Searchbar';
import Button from '../../../components/Button/Button';
import PaginationButtons from '../../../components/PaginationButtons';


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

const AddDegree = () => {
  const { setHeading, setSiteTitle, setSubHeading } = useHeadingContext();
  const [currentPage, setCurrentPage] = useState(1);
  // eslint-disable-next-line no-unused-vars
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

  useEffect(() => {
    setHeading("Tutkintojen hallinta");
    setSubHeading("");
    setSiteTitle("Suoritusten hallinnointi")
  })

  return (
    <div className='addDegree__wrapper'>
      <section className='addDegree__container'>
        <Button
          id='addDegreeButton'
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

        <Searchbar id='searchbarId' handleSearch={handleSearch} placeholder={'Etsi tutkinto'} />

        <div id='listContainer' className='addDegree__container--list'>
          <CheckLength
            filteredList={filteredList}
            allInternalDegrees={allInternalDegrees}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
        <PaginationButtons
          currentPage={currentPage}
          pageCount={pageCount}
          handlePageClick={handlePageClick}
        />
      </section>
    </div>
  );
};

export default AddDegree;
