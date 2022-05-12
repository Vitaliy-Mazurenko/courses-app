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
	const [name, setUser] = useState('');

	const addAuthor = (newAuthor) => {
		setAuthorsList([...authorsList, newAuthor]);
	};

	const addCourse = (newCourse) => {
		setCourse([...coursesList, newCourse]);
	};

	const addUser = (name) => {
		setUser(name);
	};

	return (
		<div className='App'>
			<Router>
				<Header userName={name} />
				<Routes>
					<Route path='/login' element={<Login addUser={addUser} />} />
					<Route path='/' element={<Navigate replace to='/login' />} />
					<Route path='/registration' element={<Registration />} />
					<Route
						path='/courses'
						element={
							<Courses coursesList={coursesList} authorsList={authorsList} />
						}
					/>
					<Route
						path='/courses/add'
						element={
							<CreateCourse
								addAuthor={addAuthor}
								addCourse={addCourse}
								authorsList={authorsList}
							/>
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
