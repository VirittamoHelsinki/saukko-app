import { useState, useEffect } from 'react'
import { registration } from '../../api/user';
import './_registerUser.scss';
import useHeadingStore from '../../store/zustand/useHeadingStore';
import PageNavigationButtons from '../../components/PageNavigationButtons/PageNavigationButtons';
import { useNavigate } from 'react-router-dom';

const Notification = ({ success, onTimeout, time = 3 }) => {
	const [haveTime, setHaveTime] = useState(true)

	useEffect(() => {
		const id = setTimeout(() => {
			setHaveTime(false);
			onTimeout();
		}, time * 1000);
		return () => clearTimeout(id);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (!haveTime) {
		return null
	}

	return (
		<div className={`notification ${success ? 'success' : 'error'}`}>
			{success ? 'Opettaja lisätty onnistuneesti!' : 'Opettajan lisäys epäonnistui. Yritä uudelleen.'}
		</div>
	)
}

const RegisterUser = () => {
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		role: 'teacher'
	})
	const [loading, setLoading] = useState(false)
	const [success, setSuccess] = useState(null)

	const navigate = useNavigate();


	const { setSubHeading, setHeading } = useHeadingStore();


	const onTimeout = () => setSuccess(null)

	const handleChange = (e) => {
		const { name, value } = e.target
		setFormData({ ...formData, [name]: value })
	}

	useEffect(() => {
		setSubHeading("Lisää uusi opettaja");
		setHeading('Lisää uusi opettaja')
	}, [setHeading, setSubHeading])

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true)
		console.log(formData)
		try {
			await registration(formData)
			setSuccess(true)
			setFormData({
				firstName: '',
				lastName: '',
				email: '',
				role: 'teacher'
			})

		} catch (error) {
			console.error('Error with registration: ', error)
			setSuccess(false)
		} finally {
			setLoading(false)
		}
	}

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

				<PageNavigationButtons
					handleBack={() => navigate(-1)}
					handleForward={handleSubmit}
					forwardButtonText={'Lisää opettaja'}
					showForwardButton={true}
				/>
			</form>
		</div>
	);


}

export default RegisterUser
