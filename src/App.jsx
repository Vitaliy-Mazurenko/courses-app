import React, { useState } from 'react';
import './App.css';
import Header from './components/Header/Header.jsx';
import Courses from './components/Courses/Courses.jsx';
import CreateCourse from './components/CreateCourse/CreateCourse.jsx';

function App() {
	const [show, setShowCreate] = useState(false);

	const showCreate = (hide) => {
		setShowCreate(hide);
	};

	return (
		<div className='App'>
			<Header />
			{show ? (
				<CreateCourse showCreate={showCreate} />
			) : (
				<Courses showCreate={showCreate} />
			)}
		</div>
	);
}

export default App;
