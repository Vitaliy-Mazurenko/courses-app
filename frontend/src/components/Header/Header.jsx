import './header.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from './components/Logo/Logo';
import Button from '../../common/Button/Button';
import { BUTTON_LOGOUT } from '../../constants';
import { useSelector } from 'react-redux';
import { getUserName, getRole, getIsAuth } from '../../selectors';
import { useThunks } from '../../hooks/useThunks';
import { localStorageAPI } from '../../helpers/localStorageAPI';

export default function Header() {
	const userName = useSelector(getUserName);
	const userRole = useSelector(getRole);
	const user = userName || userRole;
	const isAuth = useSelector(getIsAuth);
	const bindedThunks = useThunks();
	const navigate = useNavigate();
	const token = localStorageAPI.getUserToken();
	if (token) {
		bindedThunks.thunkCurrentUser(token);
	}

	const logOut = () => {
		bindedThunks.thunkActionLogout();
		localStorageAPI.clear();
		navigate('/login');
	};

	return (
		<div className='Header'>
			<Logo />
			{isAuth && (
				<div className='log'>
					<span data-testid='user'>{user}</span>
					<Button text={BUTTON_LOGOUT} onClick={logOut} />
				</div>
			)}
		</div>
	);
}
