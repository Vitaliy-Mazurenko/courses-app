import './header.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from './components/Logo/Logo';
import Button from '../../common/Button/Button';
import { BUTTON_LOGOUT } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { getUserName, getRole } from '../../selectors';
import { thunkActionLogout } from '../../store/user/thunk';
import { localStorageAPI } from '../../helpers/localStorageAPI';

export default function Header() {
	const userName = useSelector(getUserName);
	const userRole = useSelector(getRole);
	const user = userName || userRole;
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const logOut = () => {
		navigate('/login');
		thunkActionLogout(dispatch);
		localStorageAPI.clear();
	};

	return (
		<div className='Header'>
			<Logo />
			{user && (
				<div className='log'>
					<span data-testid='user'>{user}</span>
					<Button text={BUTTON_LOGOUT} onClick={logOut} />
				</div>
			)}
		</div>
	);
}
