import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { getCoursesList, getAuthorsList } from '../../services';
import CourseCard from './components/CourseCard/CourseCard';
import SearchBar from './components/SearchBar/SearchBar';
import './courses.css';

export default function Courses() {
	const coursesList = useSelector((state) => state.course.courses);
	const authorsList = useSelector((state) => state.author.authors);
	const [courses, setCourse] = useState(coursesList);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getCoursesList());
		dispatch(getAuthorsList());
		setCourse(courses);
	}, [dispatch, courses]);

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
			<div className='Courses'>
				<SearchBar valChange={valChange} />
				{courses.map((course) => (
					<div key={course.id}>
						<CourseCard course={course} authorsList={authorsList} />
					</div>
				))}
			</div>
		</>
	);
}

Courses.propTypes = {
	coursesList: PropTypes.array,
	authorsList: PropTypes.array,
};
