import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Switch, FormControlLabel } from '@mui/material';
import Searchbar from '../../../components/Searchbar/Searchbar';
import Button from '../../../components/Button/Button';
import PaginationButtons from '../../../components/PaginationButtons';
import useHeadingStore from '../../../store/zustand/useHeadingStore';
import { fetchAllTeachers } from '../../../api/user';
import { useQuery } from '@tanstack/react-query';
import './_teacherlist.scss';

const CheckLength = ({
	filteredList,
	teachers,
	paginate,
	currentPage,
}) => {
	const startIndex = (currentPage - 1) * paginate;
	const endIndex = startIndex + paginate;
	const list = filteredList.length > 0 ? filteredList : teachers;

	const navigate = useNavigate();

	return (
		<>
			{list.slice(startIndex, endIndex).map((teacher, index) => (
				<div
					key={index}
					className='addTeacher__container--list-item'
					onClick={() => navigate(`/update-teacher/${teacher._id}`)}
				>
					<p>{teacher.firstName} {teacher.lastName}</p>
				</div>
			))}
		</>
	);
};

const TeacherList = () => {

	const { setHeading, setSiteTitle, setSubHeading } = useHeadingStore();

	const [currentPage, setCurrentPage] = useState(1);
	const [filteredList, setFilteredList] = useState([]);
	const [showArchived, setShowArchived] = useState(false);

	const paginate = 5;

	const navigate = useNavigate();

	// Fetch teachers using react-query
	const { data: teachers } = useQuery({
		queryKey: ['teachers'],
		queryFn: () => fetchAllTeachers(),
	});

	useEffect(() => {
		if (teachers?.data) {
			let updatedList = teachers.data;
			if (showArchived) {
				updatedList = updatedList.filter(teacher => teacher.isArchived);
			}
			setFilteredList(updatedList);
		}
	}, [teachers, showArchived]);

	const handleToggleArchived = () => {
		setShowArchived(prev => !prev);
	};

	// Searchbar logic
	const handleSearch = (event) => {
		const searchValue = event.target.value.toLowerCase();
		setCurrentPage(1); // Reset page when searching
		if (teachers?.data) {
			setFilteredList(
				teachers?.data.filter((teacher) => {
					const fullName = `${teacher.firstName.toLowerCase()} ${teacher.lastName.toLowerCase()}`;
					return fullName.includes(searchValue)
				})
			);
		}
	};

	// Pagination logic
	const pageCount =
		filteredList.length > 0
			? Math.ceil(filteredList?.length / paginate)
			: Math.ceil(teachers?.data?.length / paginate);

	const handlePageClick = (pageNum) => {
		setCurrentPage(pageNum);
	};

	useEffect(() => {
		setHeading("Opettajien hallinta");
		setSubHeading("");
		setSiteTitle("Suoritusten hallinnointi");
	}, [setHeading, setSubHeading, setSiteTitle]);

	return (
		<div className='teacherList__wrapper'>
			<section className='teacherList__container'>

				<Searchbar id='searchbarId' handleSearch={handleSearch} placeholder={'Etsi opettajia'} />
				<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'end', marginTop: '10px' }}>
					<FormControlLabel
						control={<Switch checked={showArchived} onChange={handleToggleArchived} />}
						label="Näytä vain arkistoidut opettajat"
					/>
				</div>
				{filteredList.length > 0 && <div id='listContainer' className='addTeacher__container--list'>
					<CheckLength
						filteredList={filteredList}
						teachers={teachers?.data}
						paginate={paginate}
						currentPage={currentPage}
					/>
				</div>}
				<PaginationButtons
					currentPage={currentPage}
					pageCount={pageCount}
					handlePageClick={handlePageClick}
				/>
				<Button
					id='addTeacherButton'
					text='Lisää uusi opettaja'
					style={{
						marginTop: '20px',
						width: '100%',
						backgroundColor: '#0000BF',
						color: 'white',
						border: 'none',
					}}
					icon={'ic:baseline-plus'}
					onClick={() => navigate(`/register-user`)}
				/>
			</section>
		</div>
	);
};

export default TeacherList;
