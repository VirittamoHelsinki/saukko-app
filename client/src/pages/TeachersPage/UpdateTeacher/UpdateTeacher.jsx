import { useState, useEffect } from 'react';
import './_updateteacher.scss';
import useHeadingStore from '../../../store/zustand/useHeadingStore';
import PageNavigationButtons from '../../../components/PageNavigationButtons/PageNavigationButtons';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import { Autocomplete, TextField, List, ListItem, IconButton, ListItemText, Checkbox, FormControlLabel, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchInternalDegrees } from '../../../api/degree';
import { Icon } from '@iconify/react';
import NotificationModal from '../../../components/NotificationModal/NotificationModal';
import useStore from '../../../store/zustand/formStore';
import { useParams } from 'react-router-dom';
import { updateUser, fetchUserById } from '../../../api/user';

const UpdateTeacher = () => {
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		role: 'teacher',
		permissions: 'user',
		degrees: [], // Store degree IDs here
		isArchived: false, // Checkbox value
	});
	const [selectedDegrees, setSelectedDegrees] = useState([]); // To display degree names
	const [inputValue, setInputValue] = useState('');
	const [alertModalOpen, setAlertModalOpen] = useState(false);
	const { teacherId } = useParams();
	const navigate = useNavigate();

	const { setSubHeading, setHeading } = useHeadingStore();
	const { openNotificationModal, setOpenNotificationModal } = useStore();

	// Fetch degrees using react-query
	const { data: fetchedDegrees = [] } = useQuery({
		queryKey: ['degrees'],
		queryFn: fetchInternalDegrees,
	});

	// Fetch the teacher by ID and pre-fill form data
	useEffect(() => {
		const fetchTeacher = async () => {
			const fetchedTeacher = await fetchUserById(teacherId);
			console.log('fetchedTeacher:', fetchedTeacher);

			if (fetchedTeacher) {
				// Pre-fill form with fetched teacher's data
				setFormData({
					firstName: fetchedTeacher.firstName,
					lastName: fetchedTeacher.lastName,
					email: fetchedTeacher.email,
					role: fetchedTeacher.role || 'teacher',
					permissions: fetchedTeacher.permissions || 'admin',
					degrees: fetchedTeacher.degrees || [],
					isArchived: fetchedTeacher.isArchived || false, // Checkbox state
				});

				// Convert degrees from IDs to names for displaying
				const degreeNames = fetchedDegrees
					.filter((degree) => fetchedTeacher.degrees.includes(degree._id))
					.map((degree) => degree.name.fi);
				setSelectedDegrees(degreeNames);
			}
		};
		if (fetchedDegrees.length > 0) {
			fetchTeacher();
		}
	}, [teacherId, fetchedDegrees]);

	// Handling input changes
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleRadioChange = (value) => {
		setFormData({ ...formData, permissions: value });
	};

	// Handle degrees selection
	const handleDegreeChange = (event, value) => {
		const selectedDegree = fetchedDegrees.find((degree) => degree.name.fi === value);
		if (selectedDegree && !selectedDegrees.includes(selectedDegree.name.fi)) {
			setSelectedDegrees((prevDegrees) => [...prevDegrees, selectedDegree.name.fi]);
			setFormData((prevFormData) => ({
				...prevFormData,
				degrees: [...prevFormData.degrees, selectedDegree._id],
			}));
			setInputValue('');
		}
	};

	// Handle removing a degree
	const handleRemoveDegree = (degreeToRemove) => {
		const degreeIndex = selectedDegrees.indexOf(degreeToRemove);
		if (degreeIndex > -1) {
			setSelectedDegrees((prevDegrees) =>
				prevDegrees.filter((degree) => degree !== degreeToRemove)
			);
			setFormData((prevFormData) => {
				const newDegrees = [...prevFormData.degrees];
				newDegrees.splice(degreeIndex, 1);
				return {
					...prevFormData,
					degrees: newDegrees,
				};
			});
		}
	};

	// Submit handler
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await updateUser(teacherId, formData);
			setFormData({
				firstName: '',
				lastName: '',
				email: '',
				role: 'teacher',
				permissions: 'admin',
				degrees: [],
				isArchived: false,
			});
			setSelectedDegrees([]);
			handleNotificationModalOpen();
		} catch (error) {
			console.error('Error with registration: ', error);
			handleOpenAlertModal();
		}
	};

	const handleNotificationModalOpen = () => setOpenNotificationModal(true);
	const handleOpenAlertModal = () => setAlertModalOpen(true);
	const handleCloseAlertModal = () => setAlertModalOpen(false);
	const handleEvaluation = () => {
		navigate(-1);
		setOpenNotificationModal(false);
	};

	useEffect(() => {
		setHeading('Opettajien hallinta');
		setSubHeading('Muokkaa opettajan tietoja');
	}, [setHeading, setSubHeading]);

	return (
		<div className="register-user">
			<form onSubmit={handleSubmit}>
				<div className="form-container">
					<label className="section-title">Perustiedot</label>
					<div className="form-group">
						<label htmlFor="firstName">Etunimi*:</label>
						<input
							type="text"
							id="firstName"
							name="firstName"
							value={formData.firstName}
							onChange={handleChange}
							required
						/>
					</div>
					<div className="form-group">
						<label htmlFor="lastName">Sukunimi*:</label>
						<input
							type="text"
							id="lastName"
							name="lastName"
							value={formData.lastName}
							onChange={handleChange}
							required
						/>
					</div>
					<div className="form-group">
						<label htmlFor="email">Sähköposti*:</label>
						<input
							type="email"
							id="email"
							name="email"
							value={formData.email}
							onChange={handleChange}
							required
						/>
					</div>
				</div>

				{/* Permissions */}
				<div className="form-container">
					<label className="section-title">Opettajan käyttöoikeudet*</label>
					<FormControl>
						<RadioGroup
							aria-labelledby="demo-form-control-label-placement"
							name="permissions"
							value={formData.permissions}
							onChange={(e) => handleRadioChange(e.target.value)}
						>
							<FormControlLabel
								value="admin"
								control={<Radio />}
								label="Admin"
							/>
							<FormControlLabel
								value="user"
								control={<Radio />}
								label="Peruskäyttäjä"
							/>
						</RadioGroup>
					</FormControl>
				</div>

				{/* Degrees */}
				<div className="form-container">
					<label className="section-title">Opettajan tutkinnot*</label>
					<Autocomplete
						sx={{
							'& .MuiAutocomplete-inputRoot': {
								width: '100%',
								padding: '12px',
								fontSize: '16px',
								borderRadius: '0px',
								boxSizing: 'border-box',
								border: '2px solid black',
								backgroundColor: 'white',
								overflow: 'hidden',
							},
							'& .MuiInputBase-input': {
								padding: '0px', // Remove inner padding
								whiteSpace: 'nowrap', // Prevent wrapping
								overflow: 'hidden', // Prevent overflow
								textOverflow: 'ellipsis', // Display ellipsis for overflow text
							},
							'& .MuiOutlinedInput-notchedOutline': {
								border: 'none', // Remove the default MUI border
							},
						}}
						disablePortal
						options={fetchedDegrees.map((degree) => degree.name.fi)}
						onChange={handleDegreeChange}
						value={null}
						inputValue={inputValue}
						onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
						renderInput={(params) => (
							<TextField {...params} placeholder="Etsi tai kirjoita tutkinnon nimi" />
						)}
					/>
					<List>
						{selectedDegrees.map((degree, index) => (
							<ListItem
								key={index}
								sx={{
									width: '100%',
									padding: '12px',
									fontSize: '16px',
									borderRadius: '0px',
									boxSizing: 'border-box',
									border: '2px solid black',
									backgroundColor: 'white',
									marginBottom: '8px', // Add some space between items
								}}

							>
								<ListItemText primary={degree} />
								<IconButton edge="end" onClick={() => handleRemoveDegree(degree)}>
									<Icon icon="material-symbols:delete-outline" color="#B01038" />
								</IconButton>
							</ListItem>
						))}
					</List>
				</div>

				{/* Checkbox for Arkistoi opettaja */}
				<div style={{ marginBottom: '15px' }}>
					<FormControlLabel
						control={
							<Checkbox
								checked={formData.isArchived || false} // Checkbox state
								onChange={(e) => setFormData({ ...formData, isArchived: e.target.checked })} // Handle change
								color="primary"
							/>
						}
						label={
							<div style={{ display: 'flex', alignItems: 'center' }}>
								Arkistoi opettaja
								<Tooltip title="Arkistoi opettaja, jos opettaja ei ole enää aktiivinen." placement="right">
									<IconButton size="small" sx={{ marginLeft: '8px' }}>
										<Icon icon="material-symbols:info-outline" width="20" height="20" />
									</IconButton>
								</Tooltip>
							</div>
						}
					/>
				</div>



				{/* Navigation Buttons */}
				<PageNavigationButtons
					handleBack={() => navigate(-1)}
					handleForward={handleSubmit}
					forwardButtonText="Tallenna muutokset"
					showForwardButton={true}
				/>
			</form>

			{/* Notification Modal */}
			<NotificationModal
				type="success"
				title="Muutokset on tallennettu"
				body="Tiedot on tallennettu järjestelmään onnistuneesti."
				open={openNotificationModal}
				handleClose={handleEvaluation}
			/>
			<NotificationModal
				type="warning"
				title="Lomakkeen lähetys epäonnistui"
				body="Tarkista, että tiedot ovat oikein ja yritä uudelleen."
				open={alertModalOpen}
				handleClose={handleCloseAlertModal}
			/>
		</div>
	);
};

export default UpdateTeacher;
