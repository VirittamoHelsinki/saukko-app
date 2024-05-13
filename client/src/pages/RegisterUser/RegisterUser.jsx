import { useState } from 'react'
import { registration } from '../../api/user';


const RegisterUser = () => {
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		role: ''
	})

	const handleChange = (e) => {
		const { name, value } = e.target
		setFormData({ ...formData, [name]: value })
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(formData)
		await registration(formData)
		setFormData({
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			role: ''
		})
	}

	return (
		<div>
			<h2>Käyttäjän rekisteröinti</h2>
			<form onSubmit={handleSubmit}>
				<label htmlFor="firstName">Etunimi:</label><br />
				<input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required /><br />

				<label htmlFor="lastName">Sukunimi:</label><br />
				<input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required /><br />

				<label htmlFor="email">Sähköposti:</label><br />
				<input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required /><br />
				<label htmlFor="password">Salasana:</label><br />
				<input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required /><br />
				<label htmlFor="role">Rooli:</label><br />
				<select id="role" name="role" value={formData.role} onChange={handleChange} required>
					<option value="">Valitse rooli</option>
					<option value="teacher">Opettaja</option>
					<option value="supervisor">TPO</option>
					<option value="customer">Asiakas</option>
				</select><br /><br />

				<button type="submit">Rekisteröi käyttäjä</button>
			</form>
		</div>
	);


}

export default RegisterUser
