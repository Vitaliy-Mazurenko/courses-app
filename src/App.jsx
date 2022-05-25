import React, { useState, useEffect } from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';
import Login from './components/Login/Login';
import Header from './components/Header/Header';
import Registration from './components/Registration/Registration';
import Courses from './components/Courses/Courses';
import CreateCourse from './components/CreateCourse/CreateCourse';
import CourseInfo from './components/CourseInfo/CourseInfo';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from './store/user/reducer';
import './App.css';

function App() {
	const [token, setToken] = useState(localStorage.getItem('token'));
	const userToken = useSelector((state) => state.user.token);
	const dispatch = useDispatch();

	useEffect(() => {
		const localToken = localStorage.getItem('token');
		const name = localStorage.getItem('name');
		if (!userToken && localToken) {
			let email = 'email';
			dispatch(getUser(name, email, localToken));
			setToken(localStorage.getItem('token'));
		} else {
			setToken(userToken);
		}
	}, [userToken, dispatch]);

	return (
		<div className='App'>
			<Router>
				<Header />
				<Routes>
					<Route path='/' element={<Navigate replace to='/login' />} />
					<Route
						path='/login'
						element={token ? <Navigate to='/courses' /> : <Login />}
					/>
					<Route path='/registration' element={<Registration />} />
					<Route
						path='/courses'
						element={token ? <Courses /> : <Navigate replace to='/login' />}
					/>
					<Route
						path='/courses/add'
						element={
							token ? <CreateCourse /> : <Navigate replace to='/login' />
						}
					/>
					<Route exact path='/courses/:id' element={<CourseInfo />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
