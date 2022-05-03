import React from 'react';
import { mockedAuthorsList, BUTTON_SHOW } from '../../../../constants';
import Button from '../../../../common/Button/Button.jsx';
import './courseCard.css';

const CourseCard = ({ course }) => {
	function authorName(n, ids) {
		for (let i in ids) {
			if (n['id'] === ids[i] && i < ids.length - 1) {
				return (
					<span key={ids[i]} className='authorsCourse'>
						{' '}
						{n['name']},
					</span>
				);
			} else if (n['id'] === ids[i]) {
				return (
					<span key={ids[i]} className='authorsCourse'>
						{' '}
						{n['name']}
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
							{[...mockedAuthorsList].map((item) =>
								authorName(item, course.authors)
							)}
						</span>
					</p>
					<p className='information'>
						Duration:{' '}
						<span className='info'>
							{Math.trunc(course.duration / 60) +
								':' +
								(course.duration % 60) +
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
