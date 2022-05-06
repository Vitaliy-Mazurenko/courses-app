import React from 'react';
import { BUTTON_SHOW } from '../../../../constants';
import Button from '../../../../common/Button/Button.jsx';
import './courseCard.css';

const CourseCard = ({ course, authorsList }) => {
	function authorName(n, ids) {
		for (let i in ids) {
			if (n['id'] === ids[i]) {
				return (
					<span key={ids[i]} className='authorsCourse'>
						{' '}
						{n['name']},
					</span>
				);
			}
		}
	}

	return (
		<>
			<div className='courseCard'>
				<div className='courseDescription'>
					<h2 className='title'>{course.title}</h2>
					<div className='description'>{course.description}</div>
				</div>
				<div className='courseInfo'>
					<p className='information'>
						Authors:
						<span className='info'>
							{[...authorsList].map((item) => authorName(item, course.authors))}
						</span>
					</p>
					<p className='information'>
						Duration:{' '}
						<span className='info'>
							{(course.duration < 600 ? '0' : '') +
								Math.trunc(course.duration / 60) +
								':' +
								(course.duration % 60 < 10
									? '0' + (course.duration % 60)
									: course.duration % 60) +
								' hours'}
						</span>
					</p>
					<p className='information'>
						Creation:{' '}
						<span className='info'>
							{course.creationDate.replace(new RegExp('/', 'g'), '.')}
						</span>
					</p>
					<Button text={BUTTON_SHOW} />
				</div>
			</div>
		</>
	);
};

export default CourseCard;
