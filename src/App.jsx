import React, { useState } from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';
import { mockedCoursesList, mockedAuthorsList } from './constants';
import Login from './components/Login/Login';
import Header from './components/Header/Header';
import Registration from './components/Registration/Registration';
import Courses from './components/Courses/Courses';
import CreateCourse from './components/CreateCourse/CreateCourse';
import CourseInfo from './components/CourseInfo/CourseInfo';
import './App.css';

function App() {
	const [coursesList, setCourse] = useState([...mockedCoursesList]);
	const [authorsList, setAuthorsList] = useState([...mockedAuthorsList]);
	const [name, setUser] = useState(localStorage.getItem('name'));
	const [token, setToken] = useState(localStorage.getItem('token'));

	const addAuthor = (newAuthor) => {
		setAuthorsList([...authorsList, newAuthor]);
	};

	const addCourse = (newCourse) => {
		setCourse([...coursesList, newCourse]);
	};

	const addUser = (result, user) => {
		setUser(user);
		setToken(result);
		localStorage.setItem('token', result);
		localStorage.setItem('name', user);
	};

	return (
		<div className='App'>
			<Router>
				<Header user={name} addUser={addUser} />
				<Routes>
					<Route path='/' element={<Navigate replace to='/login' />} />
					<Route
						path='/login'
						element={
							token ? <Navigate to='/courses' /> : <Login addUser={addUser} />
						}
					/>
					<Route path='/registration' element={<Registration />} />
					<Route
						path='/courses'
						element={
							token ? (
								<Courses coursesList={coursesList} authorsList={authorsList} />
							) : (
								<Navigate replace to='/login' />
							)
						}
					/>
					<Route
						path='/courses/add'
						element={
							token ? (
								<CreateCourse
									addAuthor={addAuthor}
									addCourse={addCourse}
									authorsList={authorsList}
								/>
							) : (
								<Navigate replace to='/login' />
							)
						}
					/>
					<Route
						exact
						path='/courses/:id'
						element={
							<CourseInfo coursesList={coursesList} authorsList={authorsList} />
						}
					/>
				</Routes>
			</Router>
		</div>
	);
}

export default App;
