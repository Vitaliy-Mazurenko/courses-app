import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import pipeDuration from '../../helpers/pipeDuration';
import './courseInfo.css';

export default function CourseInfo() {
	const params = useParams();
	const authorsList = useSelector((state) => state.author.authors);
	const coursesList = useSelector((state) => state.course.courses);
	const cours = coursesList
		.filter((course) => course.id.includes(params.id))
		.shift();
	const back = '< Back to courses';
	function formDate(iDate) {
		if (iDate < 10) {
			return '0' + iDate;
		} else {
			return iDate;
		}
	}
	return (
		<div className='courseInformation' key={cours['id']}>
			<Link to='/courses'>{back}</Link>
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
