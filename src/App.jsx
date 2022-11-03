import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '@Login';
import Header from '@Header';
import Registration from '@Registration';
import Courses from '@Courses';
import CourseForm from '@CourseForm';
import CourseInfo from '@CourseInfo';
import PrivateRouter from '@PrivateRouter';
import { useSelector } from 'react-redux';
import { getIsAuth } from './selectors';
import './App.css';

function App() {
	const isAuth = useSelector(getIsAuth);

	return (
		<div className='App'>
			<Header />
			<Routes>
				<Route path='/' element={<Navigate replace to='/login' />} />
				<Route
					path='/login'
					element={isAuth ? <Navigate to='/courses' /> : <Login />}
				/>
				<Route path='/registration' element={<Registration />} />
				<Route
					path='/courses'
					element={isAuth ? <Courses /> : <Navigate replace to='/login' />}
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
					path='/courses/update/:courseId'
					element={
						<PrivateRouter>
							<CourseForm />
						</PrivateRouter>
					}
				/>
				<Route exact path='/courses/:courseId' element={<CourseInfo />} />
			</Routes>
		</div>
	);
}

export default App;
