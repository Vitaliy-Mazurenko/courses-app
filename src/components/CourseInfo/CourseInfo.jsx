import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import pipeDuration from '../../helpers/pipeDuration';
import formDate from '../../helpers/formDate';
import { getAuthors, getCourses } from '../../selectors';
import { HOURS, BACK_TO_COURSES } from '../../constants';
import './courseInfo.css';

export default function CourseInfo() {
	const params = useParams();
	const authorsList = useSelector(getAuthors);
	const coursesList = useSelector(getCourses);
	const courseId = coursesList.find((course) => course.id.includes(params.id));

	return (
		<div className='courseInformation'>
			<Link to='/courses'>{BACK_TO_COURSES}</Link>
			<h2 className='title'>{courseId.title}</h2>
			<div className='descInformation'>
				<div className='description'>{courseId.description}</div>
				<div className='about'>
					<p className='aboutId'>
						<b>ID: </b>
						{params.id}
					</p>
					<p className='information'>
						Duration:
						<span className='info'>
							{pipeDuration(courseId.duration) + HOURS}
						</span>
					</p>
					<p className='information'>
						Created:
						<span className='info'>{formDate(courseId.creationDate)}</span>
					</p>
					<p className='information'>
						Authors:
						<span className='authorId'>
							{authorsList
								.filter((item) => courseId.authors.includes(item.id))
								.map((item) => (
									<span key={item.id}>{item.name}</span>
								))}
						</span>
					</p>
				</div>
			</div>
		</div>
	);
}
