import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserNav from '../../../components/UserNav/UserNav';
import WavesHeader from '../../../components/Header/WavesHeader';
import ExternalApiContext from '../../../store/context/ExternalApiContext';
import useStore from '../../../store/zustand/formStore';
import Searchbar from '../../../components/Searchbar/Searchbar';

// controls how many degrees are shown at once and renders them
const CheckLength = ({ filteredList, allDegrees, paginate, currentPage }) => {
	const startIndex = (currentPage - 1) * paginate;
	const endIndex = startIndex + paginate;
	const list = filteredList.length > 0 ? filteredList : allDegrees;

	const navigate = useNavigate();
  const { setDegreeId } = useContext(ExternalApiContext);

  const handleChooseDegree = async (degreeId) => {
    await setDegreeId(degreeId)
    navigate(`${degreeId}`)
  }
  
	return (
    <>
			{list.slice(startIndex, endIndex).map((degree, index) => (
        <div key={index} className="searchPage__container--list-item" onClick={() => handleChooseDegree(degree._id)}>
					<h3>{degree.name.fi}</h3>
					<div className="searchPage__container--list-item-bottom">
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
						className={`pagination__button ${
							pageNum === currentPage ? "pagination__button--active" : ""
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

const SearchPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
	const [paginate, setPaginate] = useState(5);
	const [filteredList, setFilteredList] = useState([]);
  
  // Get values and functions from state management
  const { allDegrees, setDegreeId } = useContext(ExternalApiContext);
  const { resetDegreeData } = useStore();

  // Clear degree on first render
  useEffect(() => {
    resetDegreeData()
    setDegreeId('');
  }, []);
  
  // Searchbar logic
	const handleSearch = (event) => {
    setCurrentPage(1) // Reset page when searching
		setFilteredList(
			allDegrees.filter((degree) =>
				degree.name.fi.toLowerCase().includes(event.target.value.toLowerCase())
			)
		);
	};

  // Pagination logic
	const pageCount =
		filteredList.length > 0
			? Math.ceil(filteredList.length / paginate)
			: Math.ceil(allDegrees.length / paginate);

	const handlePageClick = (pageNum) => {
		setCurrentPage(pageNum);
	};

	return (
		<main className="searchPage__wrapper">
			<WavesHeader title="Saukko" secondTitle="Tutkintojen hallinta" disabled={false} />
			<UserNav />
			<section className="searchPage__container">
        <Searchbar handleSearch={handleSearch} placeholder={'Etsi koulutus'}/>
				<div className="searchPage__container--list">
					<CheckLength
						filteredList={filteredList}
						allDegrees={allDegrees}
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

export default SearchPage;
