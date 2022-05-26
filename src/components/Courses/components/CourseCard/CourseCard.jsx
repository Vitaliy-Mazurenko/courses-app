import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { BUTTON_SHOW } from '../../../../constants';
import Button from '../../../../common/Button/Button.jsx';
import pipeDuration from '../../../../helpers/pipeDuration';
import { delCourses } from '../../../../store/courses/reducer';
import { useDispatch } from 'react-redux';
import './courseCard.css';
const CourseCard = ({ course, authorsList }) => {
	let navigate = useNavigate();
	const dispatch = useDispatch();

	function formDate(iDate) {
		if (iDate < 10) {
			return '0' + iDate;
		} else {
			return iDate;
		}
	}

	const showCourse = (e) => {
		navigate(`/courses/${e.target.parentNode.id}`);
	};

	const onDelete = (e) => {
		if (e.target.parentNode.parentNode.id) {
			dispatch(delCourses(e.target.parentNode.parentNode.id));
		} else {
			dispatch(delCourses(e.target.parentNode.id));
		}
	};

	return (
		<>
			<div className='courseCard' key={course['id']}>
				<div className='courseDescription'>
					<h2 className='title'>{course.title}</h2>
					<div className='description'>{course.description}</div>
				</div>
				<div className='courseInfo'>
					<p className='information'>
						Authors:
						<span className='info'>
							{authorsList
								.filter((item) => course.authors.includes(item['id']))
								.map((item) => ' ' + item.name)
								.toString()}
						</span>
					</p>
					<p className='information'>
						Duration:{' '}
						<span className='info'>
							{pipeDuration(course.duration) + ' hours'}
						</span>
					</p>
					<p className='information'>
						Creation:{' '}
						<span className='info'>
							{course.creationDate
								.split('/')
								.map((item) => formDate(item))
								.toString()
								.replace(new RegExp(',', 'g'), '.')}
						</span>
					</p>
					<div id={course['id']} className='btn-show-trash'>
						<Button onClick={(e) => showCourse(e)} text={BUTTON_SHOW} />
						<Button text={<i className='fa fa-pencil'></i>}></Button>
						<Button
							onClick={(e) => onDelete(e)}
							text={<i className='fa fa-trash'></i>}
						></Button>
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
