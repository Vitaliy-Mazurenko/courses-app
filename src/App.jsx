import React, { useState } from 'react';
import { mockedCoursesList, mockedAuthorsList } from './constants';
import Header from './components/Header/Header.jsx';
import Courses from './components/Courses/Courses.jsx';
import CreateCourse from './components/CreateCourse/CreateCourse.jsx';
import './App.css';

function App() {
	const [coursesList, setCourse] = useState([...mockedCoursesList]);
	const [authorsList, setAuthorsList] = useState([...mockedAuthorsList]);
	const [show, setShowCreate] = useState(false);

	const showCreate = (hide) => {
		setShowCreate(hide);
	};

	const addAuthor = (newAuthor) => {
		setAuthorsList([...authorsList, newAuthor]);
	};

	return (
		<div className='App'>
			<Header />
			{show ? (
				<CreateCourse
					showCreate={showCreate}
					authorsList={authorsList}
					addAuthor={addAuthor}
				/>
			) : (
				<Courses showCreate={showCreate} coursesList={coursesList} />
			)}
		</div>
	);
}

export default App;
