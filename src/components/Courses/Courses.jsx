import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCoursesList, getAuthorsList } from '../../services';
import { getCourses, getAuthors, isFetch } from '../../selectors';
import CourseCard from './components/CourseCard/CourseCard';
import SearchBar from './components/SearchBar/SearchBar';
import './courses.css';

function Courses() {
	const dispatch = useDispatch();
	const coursesList = useSelector(getCourses);
	const authorsList = useSelector(getAuthors);
	const coursesFetching = useSelector(isFetch);
	const [courses, setCourse] = useState(coursesList);
	// console.log(authorsList);
	useEffect(() => {
		if (!!courses.length) {
			setCourse(courses);
		}
	}, [courses]);

	useEffect(() => {
		if (!coursesFetching) {
			dispatch(getCoursesList());
		} else {
			// console.log(coursesList);
			setCourse(coursesList);
		}
	}, [coursesFetching, coursesList, dispatch]);

	useEffect(() => {
		if (!authorsList.length) {
			dispatch(getAuthorsList());
		}
	}, [authorsList, dispatch]);

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

export default Courses;
