import './registration.css';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import { BUTTON_REG } from '../../constants';

export default function Registration() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const URL = 'http://localhost:4000/register';
	let navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const newUser = {
			name,
			password,
			email,
		};

		const response = await fetch(URL, {
			method: 'POST',
			body: JSON.stringify(newUser),
			headers: {
				'Content-Type': 'application/json',
			},
		}).catch((error) => {
			console.warn(error.message);
			setError(error.message);
		});

		const result = await response.json();
		if (response.ok) {
			navigate('/login');
		} else {
			setError(result.errors.toString());
		}
	};

	return (
		<>
			<div className='registration'>
				<div className='registration-wrap'>
					<h2>Registration</h2>
					<form onSubmit={handleSubmit} className='form-registration'>
						<label>Name</label>
						<Input
							required
							type='text'
							placeholder='Enter name'
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
						<label>Email</label>
						<Input
							required
							type='text'
							placeholder='Enter email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<label>Password</label>
						<Input
							required
							type='password'
							placeholder='Enter password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<span className='login-err'>{error}</span>
						<Button text={BUTTON_REG} />
					</form>
					<div className='account'>
						If you have an account you can <Link to='/login'>Login</Link>
					</div>
				</div>
			</div>
		</>
	);
}
