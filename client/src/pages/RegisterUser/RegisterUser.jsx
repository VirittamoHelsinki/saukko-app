import { useState, useEffect } from 'react'
import { registration } from '../../api/user';
import './_registerUser.scss';

const Notification = ({ success, onTimeout, time = 3 }) => {
	const [haveTime, setHaveTime] = useState(true)

	useEffect(() => {
		const id = setTimeout(() => {
			setHaveTime(false);
			onTimeout();
		}, time * 1000);
		return () => clearTimeout(id);
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
		password: '',
		role: 'teacher'
	})
	const [loading, setLoading] = useState(false)
	const [success, setSuccess] = useState(null)

	const onTimeout = () => setSuccess(null)

	const handleChange = (e) => {
		const { name, value } = e.target
		setFormData({ ...formData, [name]: value })
	}

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
				password: '',
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
			<h2 className="h2">Uuden opettajan rekisteröinti</h2>
			{(success !== null) && (
				<Notification onTimeout={onTimeout} success={success} time={5} />
			)}
			<form onSubmit={handleSubmit}>
				<label htmlFor="firstName">Etunimi:</label><br />
				<input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required /><br />

				<label htmlFor="lastName">Sukunimi:</label><br />
				<input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required /><br />

				<label htmlFor="email">Sähköposti:</label><br />
				<input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required /><br />
				<label htmlFor="password">Salasana:</label><br />
				<input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required /><br />
				<br></br>
				<button disabled={loading} type="submit">Lisää opettaja</button>
			</form>
		</div>
	);


}

export default RegisterUser
