import './header.css';
import React from 'react';
import Logo from './components/Logo/Logo';
import Button from '../../common/Button/Button';
import { BUTTON_LOGOUT } from '../../constants';

export default function Header(userName) {
	return (
		<div className='Header'>
			<Logo />
			<div className='log'>
				{userName.userName}
				<Button text={BUTTON_LOGOUT} />
			</div>
		</div>
	);
}
