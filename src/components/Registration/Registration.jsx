import './registration.css';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import { BUTTON_LOGIN } from '../../constants';

export default function Registration() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	let navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		navigate('/courses');
	};

	return (
		<>
			<Header />
			<div className='registration'>
				<div className='registration-wrap'>
					<h2>Registration</h2>
					<form onSubmit={handleSubmit} className='form-registration'>
						<label>Name</label>
						<Input
							minLength='2'
							type='text'
							placeholder='Enter name'
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
						<label>Email</label>
						<Input
							minLength='2'
							type='text'
							placeholder='Enter email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<label>Password</label>
						<Input
							minLength='2'
							type='text'
							placeholder='Enter password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<Button text={BUTTON_LOGIN} />
					</form>
					<div className='account'>
						If you have an account you can <Link to='/'>Login</Link>
					</div>
				</div>
			</div>
		</>
	);
}
