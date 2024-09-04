import { useState, useEffect } from 'react';
import { registration } from '../../api/user';
import './_registerUser.scss';
import useHeadingStore from '../../store/zustand/useHeadingStore';
import PageNavigationButtons from '../../components/PageNavigationButtons/PageNavigationButtons';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import { Autocomplete, TextField, List, ListItem, IconButton, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchInternalDegrees } from '../../api/degree';
import DeleteIcon from '@mui/icons-material/Delete';

const Notification = ({ success, onTimeout, time = 3 }) => {
	const [haveTime, setHaveTime] = useState(true);

	useEffect(() => {
		const id = setTimeout(() => {
			setHaveTime(false);
			onTimeout();
		}, time * 1000);
		return () => clearTimeout(id);
	}, [onTimeout, time]);

	if (!haveTime) {
		return null;
	}

	return (
		<div className={`notification ${success ? 'success' : 'error'}`}>
			{success ? 'Opettaja lisätty onnistuneesti!' : 'Opettajan lisäys epäonnistui. Yritä uudelleen.'}
		</div>
	);
};

const RegisterUser = () => {
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		role: 'teacher',
		permissions: 'Admin',
		degrees: [],
	});
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(null);
	const navigate = useNavigate();
	const [selectedDegrees, setSelectedDegrees] = useState([]);
	const [inputValue, setInputValue] = useState('')

	const { setSubHeading, setHeading } = useHeadingStore();

	// Fetch degrees using react-query
	const { data: fetchedDegrees = [] } = useQuery({
		queryKey: ['degrees'],
		queryFn: fetchInternalDegrees,
	});


	const [degrees, setDegrees] = useState(fetchedDegrees);

	useEffect(() => {
		const degreeNames = fetchedDegrees.map(degree => degree.name.fi);
		setDegrees(degreeNames);
		setDegrees(fetchedDegrees);
	}, [fetchedDegrees]);

	const onTimeout = () => setSuccess(null);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleRadioChange = (value) => {
		setFormData({ ...formData, permissions: value });
	};

	const handleDegreeChange = (event, value) => {
		console.log('value:', value)
		// Add selected degree to the list
		if (value && !selectedDegrees.includes(value)) {
			setSelectedDegrees((prevDegrees) => [...prevDegrees, value]);

			setInputValue('');
		}
	}

	const handleRemoveDegree = (degreeToRemove) => {
		// Remove selected degree from the list
		setSelectedDegrees((prevDegrees) =>
			prevDegrees.filter((degree) => degree !== degreeToRemove)
		);
	};

	useEffect(() => {
		setSubHeading('Lisää uusi opettaja');
		setHeading('Lisää uusi opettaja');
	}, [setHeading, setSubHeading]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			await registration(formData);
			setSuccess(true);
			setFormData({
				firstName: '',
				lastName: '',
				email: '',
				role: 'teacher',
				permissions: 'Admin'
			});
		} catch (error) {
			console.error('Error with registration: ', error);
			setSuccess(false);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		console.log('selected degrees: ', selectedDegrees)
	}, [])

	return (
		<div className="register-user">
			{success !== null && <Notification onTimeout={onTimeout} success={success} time={5} />}
			<form onSubmit={handleSubmit}>
				<div className="form-container">
					<label className="section-title">Perustiedot</label>
					<div className="form-group">
						<label htmlFor="firstName">Etunimi*:</label>
						<input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
					</div>
					<div className="form-group">
						<label htmlFor="lastName">Sukunimi*:</label>
						<input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
					</div>
					<div className="form-group">
						<label htmlFor="email">Sähköposti*:</label>
						<input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
					</div>
				</div>

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
								value="Admin"
								sx={{
									'& .MuiSvgIcon-root': {
										marginRight: '8px',
									},
								}}
								control={<Radio />}
								label="Admin"
							/>
							<FormControlLabel
								value="Peruskäyttäjä"
								sx={{
									'& .MuiSvgIcon-root': {
										marginRight: '8px',
									},
								}}
								control={<Radio />}
								label="Peruskäyttäjä"
							/>
						</RadioGroup>
					</FormControl>
				</div>

				<div className="form-container">
					<label className="section-title">Opettajan tutkinnot*</label>
					{/* Display selected degrees as a list */}
					<List>
						{selectedDegrees.map((degree, index) => (
							<ListItem key={index} secondaryAction={
								<IconButton edge="end" onClick={() => handleRemoveDegree(degree)}>
									<DeleteIcon />
								</IconButton>
							}>
								<ListItemText primary={degree} />
							</ListItem>
						))}
					</List>
					<Autocomplete
						disablePortal
						options={fetchedDegrees.map((degree) => degree.name.fi)}
						onChange={handleDegreeChange}
						value={null} // Don't control the selected option
						inputValue={inputValue} // Control the input field
						onInputChange={(event, newInputValue) => {
							setInputValue(newInputValue); // Update input value on change
						}}
						sx={{
							'& .MuiAutocomplete-inputRoot': {
								backgroundColor: 'white',
								borderRadius: '0px'
							},
						}}
						renderInput={(params) => (
							<TextField {...params} label="Etsi tai kirjoita tutkinnon nimi" />
						)}
					/>

				</div>

				<PageNavigationButtons
					handleBack={() => navigate(-1)}
					handleForward={handleSubmit}
					forwardButtonText="Lisää opettaja"
					showForwardButton={true}
				/>
			</form>
		</div>
	);
};

export default RegisterUser;
