import './login.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import { BUTTON_LOGIN } from '../../constants';
import { useDispatch } from 'react-redux';
import { getUser } from '../../store/user/reducer';
import { useNavigate } from 'react-router-dom';

export default function Login() {
	const URL = 'http://localhost:4000/login';
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [error, setError] = useState('');
	const user = { email, password };
	const dispatch = useDispatch();
	let navigate = useNavigate();

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

		if (response) {
			const result = await response.json();
			if (response.ok) {
				navigate('/courses/');
				dispatch(getUser(result.user.name, result.user.email, result.result));
				localStorage.setItem('token', result.result);
				localStorage.setItem('name', result.user.name);
			} else if (result.result) {
				setError(result.result);
			} else {
				setError(result.errors);
			}
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
						type='email'
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
