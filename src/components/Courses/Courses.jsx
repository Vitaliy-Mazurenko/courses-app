import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useThunks } from '../../hooks/useThunks';
import { getCourses, getAuthors, getRole } from '../../selectors';
import { BUTTON_ADD_COURSE } from '../../constants';
import Button from '../../common/Button/Button';
import searchByIdAndTitle from '../../helpers/searchByIdAndTitle';
import CourseCard from './components/CourseCard/CourseCard';
import SearchBar from './components/SearchBar/SearchBar';
import './courses.css';

function Courses() {
	const bindedThunks = useThunks();
	const coursesList = useSelector(getCourses);
	// const coursesList = useSelector((state) => {
	// 	console.log(state);
	// 	return state.courses;
	// });
	const isAdmin = useSelector(getRole);
	const authorsList = useSelector(getAuthors);
	const [courses, setCourse] = useState(coursesList);
	const navigate = useNavigate();

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

	const goToCreateCourseForm = () => {
		navigate('/courses/add');
	};

	return (
		<>
			<div className='Courses'>
				<div className='coursesHeader'>
					<SearchBar searchValue={searchValue} />
					{isAdmin === 'admin' && (
						<Button
							text={BUTTON_ADD_COURSE}
							onClick={goToCreateCourseForm}
							testID='courseFormButton'
						/>
					)}
				</div>
				<ul data-testid='coursesList'>
					{courses.map((course) => (
						<CourseCard
							key={course.id}
							course={course}
							authorsList={authorsList}
						/>
					))}
				</ul>
			</div>
		</>
	);
}

export default Courses;
