import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useThunks } from '../../hooks/useThunks';
import { getCourses, getAuthors } from '../../selectors';
import searchByIdAndTitle from '../../helpers/searchByIdAndTitle';
import CourseCard from './components/CourseCard/CourseCard';
import SearchBar from './components/SearchBar/SearchBar';
import './courses.css';

function Courses() {
	const bindedThunks = useThunks();
	const coursesList = useSelector(getCourses);
	const authorsList = useSelector(getAuthors);
	const [courses, setCourse] = useState(coursesList);

	useEffect(() => {
		if (!coursesList || !coursesList.length) {
			bindedThunks.getCoursesList();
			bindedThunks.getAuthorsList();
		}
	}, [bindedThunks, coursesList]);

	useEffect(() => {
		if (coursesList) {
			setCourse(coursesList);
		}
	}, [coursesList]);

	const searchValue = (value) => {
		value
			? setCourse(searchByIdAndTitle(coursesList, value))
			: setCourse(coursesList);
	};

	return (
		<>
			<div className='Courses'>
				<SearchBar searchValue={searchValue} />
				{courses.map((course) => (
					<div key={course.id}>
						<CourseCard course={course} authorsList={authorsList} />
					</div>
				))}
			</div>
		</>
	);
}

export default Courses;
