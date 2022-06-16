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

	useEffect(() => {
		if (!!courses.length) {
			setCourse(courses);
		}
	}, [courses]);

	useEffect(() => {
		if (!coursesFetching) {
			dispatch(getCoursesList());
		} else {
			setCourse(coursesList);
		}
	}, [coursesFetching, coursesList, dispatch]);

	useEffect(() => {
		if (!authorsList.length) {
			dispatch(getAuthorsList());
		}
	}, [authorsList, dispatch]);

	const searchValue = (value) => {
		const even = (element) => element.id === value;

		coursesList.some(even)
			? setCourse(coursesList.filter((course) => course.id.includes(value)))
			: value
			? setCourse(
					coursesList.filter((course) =>
						course.title.toLowerCase().includes(value.toLowerCase())
					)
			  )
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
