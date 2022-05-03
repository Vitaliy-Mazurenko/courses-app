import './header.css';
import React from 'react';
import Logo from './components/Logo/Logo.jsx';
import Button from '../../common/Button/Button.jsx';
import { BUTTON_LOGOUT } from '../../constants';

export default function Header() {
	return (
		<div className='Header'>
			<Logo />
			<div className='log'>
				Dave
				<Button text={BUTTON_LOGOUT} />
			</div>
		</div>
	);
}
