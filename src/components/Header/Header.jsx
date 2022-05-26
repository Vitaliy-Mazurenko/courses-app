import './header.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from './components/Logo/Logo';
import Button from '../../common/Button/Button';
import { BUTTON_LOGOUT } from '../../constants';
import { useDispatch } from 'react-redux';
import { delUser } from '../../store/user/reducer';

export default function Header() {
	const name = localStorage.getItem('name');
	const dispatch = useDispatch();
	let navigate = useNavigate();
	const logOut = () => {
		navigate('/login');
		dispatch(delUser());
		localStorage.clear();
	};

	return (
		<div className='Header'>
			<Logo />
			{name ? (
				<div className='log'>
					{name}
					<Button text={BUTTON_LOGOUT} onClick={logOut} />
				</div>
			) : (
				<></>
			)}
		</div>
	);
}
