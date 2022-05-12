import './login.css';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import { BUTTON_LOGIN } from '../../constants';

export default function Login({ addUser }) {
	const URL = 'http://localhost:4000';
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	let navigate = useNavigate();
	const user = { email, password };

	const handleSubmit = async (e) => {
		e.preventDefault();
		const loginInfo = await fetchData('/login', user);

		if (loginInfo.successful) {
			navigate('/courses');
			addUser(loginInfo.user.name);
		} else {
			console.log(loginInfo.successful);
			console.log(loginInfo);
		}
	};

	async function fetchData(route, body) {
		return await fetch(`${URL}${route}`, {
			method: 'POST',
			body: JSON.stringify(body),
			headers: {
				'Content-type': 'application/json',
			},
		}).then((response) => response.json());
	}

	return (
		<div className='login'>
			<div className='login-wrap'>
				<h2>Login</h2>
				<form onSubmit={handleSubmit} className='form-login'>
					<label>Email</label>
					<Input
						minLength='2'
						type='text'
						placeholder='Enter email'
						onChange={(e) => setEmail(e.target.value)}
					/>
					<label>Password</label>
					<Input
						minLength='2'
						type='password'
						placeholder='Enter password'
						onChange={(e) => setPassword(e.target.value)}
					/>
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
