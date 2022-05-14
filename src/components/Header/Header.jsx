import './header.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from './components/Logo/Logo';
import Button from '../../common/Button/Button';
import { BUTTON_LOGOUT } from '../../constants';

export default function Header({ user, addUser }) {
	let navigate = useNavigate();
	const logOut = () => {
		localStorage.clear();
		navigate('/login');
		addUser('', '');
	};

	return (
		<div className='Header'>
			<Logo />
			{user ? (
				<div className='log'>
					{user}
					<Button text={BUTTON_LOGOUT} onClick={logOut} />
				</div>
			) : (
				<></>
			)}
		</div>
	);
}
