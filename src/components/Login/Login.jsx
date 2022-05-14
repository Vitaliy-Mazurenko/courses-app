import './login.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import { BUTTON_LOGIN } from '../../constants';

export default function Login({ addUser }) {
	const URL = 'http://localhost:4000/login';
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [error, setError] = useState('');
	const user = { email, password };

	const handleSubmit = async (e) => {
		e.preventDefault();

		let response = await fetch(URL, {
			method: 'POST',
			body: JSON.stringify(user),
			headers: {
				'Content-Type': 'application/json',
			},
		}).catch((error) => {
			console.warn(error.message);
			setError(error.message);
		});

		if (response.ok) {
			const result = await response.json();
			addUser(result.result, result.user.name);
		} else {
			setError('Invalid data');
		}
	};

	return (
		<div className='login'>
			<div className='login-wrap'>
				<h2>Login</h2>
				<form onSubmit={handleSubmit} className='form-login'>
					<label>Email</label>
					<Input
						required
						type='text'
						placeholder='Enter email'
						onChange={(e) => setEmail(e.target.value)}
					/>
					<label>Password</label>
					<Input
						required
						minLength='6'
						type='password'
						placeholder='Enter password'
						onChange={(e) => setPassword(e.target.value)}
					/>
					<span className='login-err'>{error}</span>
					<Button text={BUTTON_LOGIN} />
				</form>
				<div className='account'>
					If you not have an account you can{' '}
					<Link to='/registration'>Registration</Link>
				</div>
			</div>
		</div>
	);
}