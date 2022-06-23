import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { BUTTON_SHOW, HOURS } from '../../../../constants';
import Button from '../../../../common/Button/Button.jsx';
import pipeDuration from '../../../../helpers/pipeDuration';
import makeDateFormat from '../../../../helpers/makeDateFormat';
import { delCourses } from '../../../../store/courses/actionCreators';
import { useDispatch, useSelector } from 'react-redux';
import { getRole } from '../../../../selectors';
import { thunkActionDel } from '../../../../store/courses/thunk';
import './courseCard.css';

const CourseCard = ({ course, authorsList }) => {
	const isAdmin = useSelector(getRole);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const authorsListFormatting = (list) => {
		return list
			.filter((item) => course.authors.includes(item.id))
			.map((item) => ' ' + item.name)
			.toString();
	};

	const goToCourse = (id) => {
		navigate(`/courses/${id}`);
	};

	const deleteCourse = (id) => {
		if (id) {
			dispatch(delCourses(id));
			thunkActionDel(id);
		}
	};

	const updateCourse = (id) => {
		if (id) {
			navigate(`/courses/update/${id}`);
		}
	};

	return (
		<>
			<div className='courseCard' key={course.id}>
				<div className='courseDescription'>
					<h2 className='title'>{course.title}</h2>
					<div className='description'>{course.description}</div>
				</div>
				<div className='courseInfo'>
					<p className='information'>
						Authors:
						<span className='info'>{authorsListFormatting(authorsList)}</span>
					</p>
					<p className='information'>
						Duration:{' '}
						<span className='info'>
							{pipeDuration(course.duration) + HOURS}
						</span>
					</p>
					<p className='information'>
						Creation:{' '}
						<span className='info'>{makeDateFormat(course.creationDate)}</span>
					</p>
					<div className='btn-show-trash'>
						<Button onClick={() => goToCourse(course.id)} text={BUTTON_SHOW} />
						{isAdmin === 'admin' && (
							<Button
								onClick={() => updateCourse(course.id)}
								text={<i className='fa fa-pencil'></i>}
							></Button>
						)}
						{isAdmin === 'admin' && (
							<Button
								onClick={() => deleteCourse(course.id)}
								text={<i className='fa fa-trash'></i>}
							></Button>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default CourseCard;

CourseCard.propTypes = {
	course: PropTypes.object,
	authorsList: PropTypes.array,
};
