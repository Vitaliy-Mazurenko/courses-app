import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { mockedCoursesList, mockedAuthorsList } from './constants';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import Courses from './components/Courses/Courses';
import CreateCourse from './components/CreateCourse/CreateCourse';
import './App.css';

function App() {
	const [coursesList, setCourse] = useState([...mockedCoursesList]);
	const [authorsList, setAuthorsList] = useState([...mockedAuthorsList]);

	const addAuthor = (newAuthor) => {
		setAuthorsList([...authorsList, newAuthor]);
	};

	const addCourse = (newCourse) => {
		setCourse([...coursesList, newCourse]);
	};

	return (
		<div className='App'>
			<Router>
				<Routes>
					<Route exact path='/' element={<Login />} />
					<Route path='/registration' element={<Registration />} />
					<Route
						path='/courses'
						element={
							<Courses coursesList={coursesList} authorsList={authorsList} />
						}
					/>
					<Route
						path='/createCourses'
						element={
							<CreateCourse
								addAuthor={addAuthor}
								addCourse={addCourse}
								authorsList={authorsList}
							/>
						}
					/>
				</Routes>
			</Router>
		</div>
	);
}

export default App;
