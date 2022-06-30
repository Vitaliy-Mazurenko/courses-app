import './registration.css';
import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import { BUTTON_REG, IF_HAVE_ACCOUNT, QUERY_REGISTER } from '../../constants';
import { userFetch } from '../../services';

export default function Registration() {
	const [newUser, setUserState] = useState({
		name: '',
		email: '',
		password: '',
	});
	const [error, setError] = useState('');
	const navigate = useNavigate();
	const ref = useRef(null);

	const handleChange = () => {
		setUserState({
			name: ref.current.name.value,
			email: ref.current.email.value,
			password: ref.current.password.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		return await userFetch(newUser, QUERY_REGISTER)
			.then((response) => response.json())
			.then((json) => {
				if (json.successful) {
					navigate('/login');
				} else {
					setError(json.errors.toString());
				}
			})
			.catch((error) => {
				console.warn(error.message);
				setError(error.message);
			});
	};

	return (
		<>
			<div className='registration'>
				<div className='registration-wrap'>
					<h2>Registration</h2>
					<form onSubmit={handleSubmit} className='form-registration' ref={ref}>
						<label>Name</label>
						<Input
							required
							type='text'
							name='name'
							placeholder='Enter name'
							onChange={handleChange}
						/>
						<label>Email</label>
						<Input
							required
							type='email'
							name='email'
							placeholder='Enter email'
							onChange={handleChange}
						/>
						<label>Password</label>
						<Input
							required
							type='password'
							name='password'
							placeholder='Enter password'
							onChange={handleChange}
						/>
						<span className='login-err'>{error}</span>
						<Button text={BUTTON_REG} />
					</form>
					<div className='account'>
						{IF_HAVE_ACCOUNT} <Link to='/login'>Login</Link>
					</div>
				</div>
			</div>
		</>
	);
}
