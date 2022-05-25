import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { getCoursesList, getAuthorsList } from '../../services';
import CourseCard from './components/CourseCard/CourseCard';
import SearchBar from './components/SearchBar/SearchBar';
import './courses.css';
import * as actions from '../../store/courses/actionCreators';
import { connect } from 'react-redux';
function Courses({ coursesList }) {
	const dispatch = useDispatch();
	// const coursesList = useSelector((state) => state.course.courses);
	const authorsList = useSelector((state) => state.author.authors);
	const [courses, setCourse] = useState(coursesList);
	// console.log(coursesList);

	useEffect(() => {
		if (!!courses.length) {
			setCourse(courses);
		}
	}, [courses]);

	useEffect(() => {
		if (!coursesList.length) {
			dispatch(getCoursesList());
		} else {
			setCourse(coursesList);
		}
		if (!authorsList.length) {
			dispatch(getAuthorsList());
		}
	}, [coursesList, authorsList, dispatch]);

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

const mapStateToProps = (state) => ({
	coursesList: state.course.courses,
});

export default connect(mapStateToProps, actions)(Courses);

Courses.propTypes = {
	coursesList: PropTypes.array,
	authorsList: PropTypes.array,
};
