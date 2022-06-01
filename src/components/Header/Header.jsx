import './header.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from './components/Logo/Logo';
import Button from '../../common/Button/Button';
import { BUTTON_LOGOUT } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { delUser } from '../../store/user/reducer';
import { getUserName, getRole } from '../../selectors';
import { thunkActionLogout } from '../../store/user/thunk';

export default function Header() {
	const userName = useSelector(getUserName);
	const userRole = useSelector(getRole);
	const dispatch = useDispatch();
	let navigate = useNavigate();
	const logOut = () => {
		navigate('/login');
		dispatch(delUser());
		thunkActionLogout();
		localStorage.clear();
	};

	return (
		<div className='Header'>
			<Logo />
			{userName || userRole ? (
				<div className='log'>
					{userName || userRole}
					<Button text={BUTTON_LOGOUT} onClick={logOut} />
				</div>
			) : (
				<></>
			)}
		</div>
	);
}
