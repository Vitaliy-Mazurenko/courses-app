import React, { useState } from 'react';
import Header from '../Header/Header';
import CourseCard from './components/CourseCard/CourseCard';
import SearchBar from './components/SearchBar/SearchBar';
import './courses.css';

export default function Courses({ showCreate, coursesList, authorsList }) {
	const [courses, setCourse] = useState(coursesList);

	const valChange = (val) => {
		let idx = [];
		for (let i of coursesList) {
			idx.push(i.id);
		}
		if (idx.includes(val)) {
			setCourse(coursesList.filter((course) => course.id.includes(val)));
		} else if (val) {
			setCourse(
				coursesList.filter((course) =>
					course.title.toLowerCase().includes(val.toLowerCase())
				)
			);
		} else {
			setCourse(coursesList);
		}
	};

	return (
		<>
			<Header />
			<div className='Courses'>
				<SearchBar valChange={valChange} showCreate={showCreate} />
				{courses.map((course) => (
					<div key={course.id}>
						<CourseCard course={course} authorsList={authorsList} />
					</div>
				))}
			</div>
		</>
	);
}
