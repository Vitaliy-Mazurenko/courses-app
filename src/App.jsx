import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login/Login';
import Header from './components/Header/Header';
import Registration from './components/Registration/Registration';
import Courses from './components/Courses/Courses';
import CourseForm from './components/CourseForm/CourseForm';
import CourseInfo from './components/CourseInfo/CourseInfo';
import PrivateRouter from './components/PrivateRouter/PrivateRouter';
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
