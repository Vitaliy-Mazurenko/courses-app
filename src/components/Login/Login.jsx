import './login.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import { BUTTON_LOGIN, IF_NOT_HAVE_ACCOUNT } from '../../constants';
import { userFetch } from '../../services';
import { useActions } from '../../hooks/useActions';
import { useNavigate } from 'react-router-dom';
import { localStorageAPI } from '../../helpers/localStorageAPI';

export default function Login() {
	const [error, setError] = useState('');
	const [user, setUser] = useState({
		email: '',
		password: '',
	});
	const bindedActions = useActions();
	const navigate = useNavigate();

	const handleChange = (e) => {
		const { value } = e.target;
		setUser({
			...user,
			[e.target.name]: value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		let response = await userFetch(user).catch((error) => {
			console.warn(error.message);
			setError(error.message);
		});

		if (response) {
			const result = await response.json();
			if (response.ok) {
				navigate('/courses/');
				bindedActions.getUser(
					result.user.name,
					result.user.email,
					result.result
				);
				localStorageAPI.setToken(result.result);
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
						name='email'
						value={user.email}
						placeholder='Enter email'
						onChange={handleChange}
					/>
					<label>Password</label>
					<Input
						required
						minLength='6'
						type='password'
						name='password'
						value={user.password}
						placeholder='Enter password'
						onChange={handleChange}
					/>
					<span className='login-err'>{error}</span>
					<Button text={BUTTON_LOGIN} />
				</form>
				<div className='account'>
					{IF_NOT_HAVE_ACCOUNT}
					<Link to='/registration'>Registration</Link>
				</div>
			</div>
		</div>
	);
}
