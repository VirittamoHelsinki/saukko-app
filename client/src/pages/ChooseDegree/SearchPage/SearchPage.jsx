// importing react components
import { useEffect, useState } from "react";

// importing dependecies
import { Icon } from "@iconify/react";

// importing components
import UserNav from "../../../components/UserNav/UserNav";
import WavesHeader from "../../../components/Header/WavesHeader";

// import temp data
import { degrees } from "./tempData";

// controls how many degrees are shown at once and renders them
const CheckLength = ({ filteredList, degrees, paginate, currentPage }) => {
	const startIndex = (currentPage - 1) * paginate;
	const endIndex = startIndex + paginate;
	const list = filteredList.length > 0 ? filteredList : degrees;

	return (
		<>
			{list.slice(startIndex, endIndex).map((degree, index) => (
				<div key={index} className="searchPage__container--list-item">
					<h3>{degree.title}</h3>
					<div className="searchPage__container--list-item-bottom">
						<div>
							<p>Diaari: {degree.diary}</p>
							<p>Koodi: {degree.code}</p>
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
	const [searchResult, setSearchResult] = useState("");
	const [filteredList, setFilteredList] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [paginate, setPaginate] = useState(5);

	const handleSearchResult = (event) => {
		const searchValue = event.target.value;
		const updatedDegreesList = [...degrees];
		setSearchResult(searchValue);
		setFilteredList(
			updatedDegreesList.filter((degree) =>
				degree.title.toLowerCase().includes(searchValue.toLowerCase())
			)
		);
	};

	const pageCount =
		filteredList.length > 0
			? Math.ceil(filteredList.length / paginate)
			: Math.ceil(degrees.length / paginate);

	const handlePageClick = (pageNum) => {
		setCurrentPage(pageNum);
	};

	// prevents staying on selected number page while changing search terms
	useEffect(() => {
		setCurrentPage(1);
	}, [filteredList]);

	return (
		<main className="searchPage__wrapper">
			<WavesHeader title="Koulutukset" secondTitle="Ammatilliset koulutukset" fill="#9fc9eb" disabled={false} />
			<UserNav />
			<section className="searchPage__container">
				<div className="searchPage__container--searchField">
					<input
						value={searchResult}
						onChange={handleSearchResult}
						placeholder="Etsi koulutus"
					/>
					<Icon icon="material-symbols:search" hFlip={true} />
				</div>
				<h2>Ammatilliset koulutukset</h2>
				<div className="searchPage__container--list">
					<CheckLength
						filteredList={filteredList}
						degrees={degrees}
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
