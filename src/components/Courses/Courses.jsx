import React, { useState } from 'react';
import { mockedCoursesList } from '../../constants';
import CourseCard from './components/CourseCard/CourseCard.jsx';
import SearchBar from './components/SearchBar/SearchBar.jsx';
import './courses.css';

export default function Courses({ showCreate }) {
	const [courses, setCourse] = useState([...mockedCoursesList]);
	const valChange = (val) => {
		if (val) {
			setCourse(
				[...mockedCoursesList].filter((course) =>
					course.title.toLowerCase().includes(val.toLowerCase())
				)
			);
		} else {
			setCourse([...mockedCoursesList]);
		}
	};

	return (
		<div className='Courses'>
			<SearchBar valChange={valChange} showCreate={showCreate} />
			{courses.map((course) => (
				<div key={course.id}>
					<CourseCard course={course} />
				</div>
			))}
		</div>
	);
}
