import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import pipeDuration from '../../helpers/pipeDuration';
import { getAuthors, getCourses } from '../../selectors';
import './courseInfo.css';

export default function CourseInfo() {
	const params = useParams();
	const authorsList = useSelector(getAuthors);
	const coursesList = useSelector(getCourses);
	const cours = coursesList.find((course) => course.id.includes(params.id));
	function formDate(iDate) {
		if (iDate.length < 2) {
			return '0' + iDate;
		} else {
			return iDate;
		}
	}
	return (
		<div className='courseInformation' key={cours['id']}>
			<Link to='/courses'>{'< Back to courses'}</Link>
			<h2 className='title'>{cours.title}</h2>
			<div className='descInformation'>
				<div className='description'>{cours.description}</div>
				<div className='about'>
					<p className='aboutId'>
						<b>ID: </b>
						{params.id}
					</p>
					<p className='information'>
						Duration:
						<span className='info'>
							{pipeDuration(cours.duration) + ' hours'}
						</span>
					</p>
					<p className='information'>
						Created:
						<span className='info'>
							{cours.creationDate
								.split('/')
								.map((item) => formDate(item))
								.toString()
								.replace(new RegExp(',', 'g'), '.')}
						</span>
					</p>
					<p className='information'>
						Authors:
						<span className='authorId'>
							{authorsList
								.filter((item) => cours.authors.includes(item['id']))
								.map((item) => (
									<span key={item['id']}>{item.name}</span>
								))}
						</span>
					</p>
				</div>
			</div>
		</div>
	);
}
