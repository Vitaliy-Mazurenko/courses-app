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
import CourseForm from './components/CourseForm/CourseForm';
import CourseInfo from './components/CourseInfo/CourseInfo';
import PrivateRouter from './components/PrivateRouter/PrivateRouter';
import { useSelector } from 'react-redux';
import { useThunks } from './hooks/useThunks';
import { getToken } from './selectors';
import { localStorageAPI } from './helpers/localStorageAPI';
import './App.css';

function App() {
	const [token, setToken] = useState(localStorageAPI.getUserToken());
	const userToken = useSelector(getToken);
	const bindedThunks = useThunks();

	useEffect(() => {
		if (token) {
			setToken(userToken);
			bindedThunks.thunkCurrentUser(token);
		} else {
			setToken(userToken);
		}
	}, [bindedThunks, token, userToken]);

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
								<CourseForm />
							</PrivateRouter>
						}
					/>
					<Route
						path='/courses/update/:id'
						element={
							<PrivateRouter>
								<CourseForm />
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
