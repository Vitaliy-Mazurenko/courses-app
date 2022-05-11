import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
	const [userName, setName] = useState('');
	const [userEmail, setEmail] = useState('');

	const addAuthor = (newAuthor) => {
		setAuthorsList([...authorsList, newAuthor]);
	};

	const addCourse = (newCourse) => {
		setCourse([...coursesList, newCourse]);
	};

	const addName = (name, email) => {
		setName(name);
		setEmail(email);
	};

	return (
		<div className='App'>
			<Router>
				<Header userName={userName} userEmail={userEmail} />
				<Routes>
					<Route exact path='/' element={<Login />} />
					<Route
						path='/registration'
						element={<Registration addName={addName} />}
					/>
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
