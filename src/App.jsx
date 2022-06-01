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
import CourseFrom from './components/CourseFrom/CourseFrom';
import CourseInfo from './components/CourseInfo/CourseInfo';
import PrivateRouter from './components/PrivateRouter/PrivateRouter';
import { useDispatch, useSelector } from 'react-redux';
import { thunkAction } from './store/user/thunk';
import { getToken } from './selectors';
import './App.css';

function App() {
	const [token, setToken] = useState(localStorage.getItem('token'));
	const userToken = useSelector(getToken);
	const dispatch = useDispatch();

	useEffect(() => {
		if (token) {
			setToken(userToken);
			thunkAction(dispatch, token);
		} else {
			setToken(userToken);
		}
	}, [token, userToken, dispatch]);

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
							<PrivateRouter>
								<CourseFrom />
							</PrivateRouter>
						}
					/>
					<Route
						path='/courses/update/:id'
						element={
							<PrivateRouter>
								<CourseFrom />
							</PrivateRouter>
						}
					/>
					<Route exact path='/courses/:id' element={<CourseInfo />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
