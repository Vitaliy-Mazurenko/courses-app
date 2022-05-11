import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BUTTON_SHOW } from '../../../../constants';
import Button from '../../../../common/Button/Button.jsx';
import './courseCard.css';
import pipeDuration from '../../../../helpers/pipeDuration';

const CourseCard = ({ course, authorsList }) => {
	let navigate = useNavigate();
	function formDate(iDate) {
		if (iDate < 10) {
			return '0' + iDate;
		} else {
			return iDate;
		}
	}

	const showCourse = (e) => {
		navigate(`/courses/${e.target.id}`);
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
					<Button
						id={course['id']}
						onClick={(e) => showCourse(e)}
						text={BUTTON_SHOW}
					/>
				</div>
			</div>
		</>
	);
};

export default CourseCard;
