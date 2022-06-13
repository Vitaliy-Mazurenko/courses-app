import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addCourses } from '../../store/courses/reducer';

import { addAuthors } from '../../store/authors/reducer';
import { getAuthors } from '../../selectors';
import {
	BTN_CREATE_COURSE,
	BTN_CREATE_AUTHOR,
	BTN_ADD_AUTHOR,
	BTN_DEL_AUTHOR,
	BTN_UPDATE_COURSE,
} from '../../constants';
import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import pipeDuration from '../../helpers/pipeDuration';
import { getCourses } from '../../selectors';
import { getCoursesList, getAuthorsList } from '../../services';
import { useParams } from 'react-router-dom';
import { thunkActionAdd, thunkActionUpdate } from '../../store/courses/thunk';
import { thunkActionAuthorAdd } from '../../store/authors/thunk';
import './courseFrom.css';

function CourseFrom() {
	const authorsList = useSelector(getAuthors);
	const [authors, setAuthors] = useState(authorsList);
	const params = useParams();
	const coursesList = useSelector(getCourses);
	const update = coursesList.find((course) => course.id.includes(params.id));
	const [authorCourse, setAuthorCourse] = useState('');
	const [valueAuthor, setAuthor] = useState('');
	const [fieldsCourse, setFieldsCourse] = useState({
		title: '',
		description: '',
		duration: '',
	});
	const [checkTextArea, setCheckTextArea] = useState('');
	const [checkAuthor, setCheckAuthor] = useState('');
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleChange = (e) => {
		const fieldValue = e.target.value;
		setFieldsCourse({
			...fieldsCourse,
			[e.target.name]: fieldValue,
		});
	};

	useEffect(() => {
		setAuthors(authors);
	}, [authors]);

	useEffect(() => {
		if (update) {
			setFieldsCourse({
				title: update.title,
				description: update.description,
				duration: update.duration,
			});
			setAuthorCourse(
				authorsList.filter((item) => update.authors.includes(item['id']))
			);
			setAuthors(
				authorsList.filter((aut) => !update.authors.includes(aut['id']))
			);
		}
	}, [update, authorsList]);

	const addAuthor = (newAuthor) => {
		dispatch(addAuthors(newAuthor));
	};

	const addCourse = () => {
		const creationDuration = Number(fieldsCourse.duration);
		const creationTitle = fieldsCourse.title;
		const creationDescription = fieldsCourse.description;
		let authors = [];
		for (let i of authorCourse) {
			authors.push(i.id);
		}
		const newCourse = {
			title: creationTitle,
			description: creationDescription,
			duration: creationDuration,
			authors,
		};

		if (update) {
			(async () => {
				await thunkActionUpdate(params.id, newCourse);
				dispatch(getCoursesList());
			})();
		} else {
			(async () => {
				let response = await thunkActionAdd(newCourse);
				dispatch(addCourses(response));
			})();
		}
	};

	const handleCreate = (e) => {
		e.preventDefault();
		if (
			!fieldsCourse.description ||
			!fieldsCourse.title ||
			!fieldsCourse.duration
		) {
			alert('Please, fill in all fields');
		} else if (fieldsCourse.description.length < 2) {
			setCheckTextArea('text length should be at least 2 characters');
		} else {
			setCheckTextArea('');
			addCourse();
			navigate('/courses');
			dispatch(getCoursesList());
			dispatch(getAuthorsList());
		}
	};

	function authorNameAdd(e) {
		e.preventDefault();
		if (valueAuthor.length < 2) {
			setCheckAuthor('author name length should be at least 2 characters');
		} else {
			(async () => {
				let responseAuthor = await thunkActionAuthorAdd(valueAuthor);
				addAuthor(responseAuthor);
				setCheckAuthor('');
				setAuthors([...authors, responseAuthor]);
				setAuthor('');
			})();
		}
	}

	function addCourseAuthor(e) {
		e.preventDefault();
		setAuthors(authors.filter((aut) => aut.id !== e.target.id));
		setAuthorCourse([
			...authorCourse,
			...authors.filter((aut) => aut.id === e.target.id),
		]);
	}

	function delCourseAuthor(e) {
		e.preventDefault();
		setAuthorCourse(authorCourse.filter((aut) => aut.id !== e.target.id));
		setAuthors([
			...authors,
			...authorCourse.filter((aut) => aut.id === e.target.id),
		]);
	}

	return (
		<>
			<div className='createCourse'>
				<form className='form-create'>
					<label>Title</label>
					<div className='form-wrap'>
						<Input
							minLength='2'
							type='text'
							placeholder='Enter title...'
							value={fieldsCourse.title}
							name='title'
							onChange={handleChange}
						/>
						<Button
							type='submit'
							className='btn-create'
							text={!update ? BTN_CREATE_COURSE : BTN_UPDATE_COURSE}
							onClick={handleCreate}
						/>
					</div>
					<label>Description</label>
					<textarea
						type='text'
						placeholder='Enter description'
						value={fieldsCourse.description}
						name='description'
						onChange={handleChange}
					/>
					<span className='validate'>{checkTextArea}</span>
					<div className='authors-wrap'>
						<div className='author-create'>
							<h4 className='author-title'>Add author</h4>
							<label>Author name</label>
							<Input
								type='text'
								placeholder='Enter author name...'
								value={valueAuthor}
								onChange={(e) => setAuthor(e.target.value)}
							/>
							<span className='validate'>{checkAuthor}</span>
							<Button
								className='btn-create'
								text={BTN_CREATE_AUTHOR}
								onClick={(e) => authorNameAdd(e)}
							/>
							<h4 className='duration-title'>Duration</h4>
							<label>Duration</label>
							<Input
								type='number'
								min='1'
								placeholder='Enter duration in minutes...'
								value={fieldsCourse.duration}
								name='duration'
								onChange={handleChange}
							/>
							<span className='info-duration'>
								Duration: <b>{pipeDuration(fieldsCourse.duration)}</b> hours
							</span>
						</div>
						<div className='authors'>
							<h4 className='author-title'>Authors</h4>
							<p className='info'>
								{authors.map((item) => (
									<span key={item.id} className='author-item'>
										{' '}
										{item.name}
										<Button
											id={item.id}
											className='btn-add'
											text={BTN_ADD_AUTHOR}
											onClick={(e) => addCourseAuthor(e)}
										/>
									</span>
								))}
							</p>
							<h4 className='author-title'>Course authors</h4>
							<div className='author-title'>
								{authorCourse.length === 0 ? 'Author list is empty' : ''}
							</div>
							<p className='info'>
								{[...authorCourse].map((item) => (
									<span key={item.id} className='author-item authors-course'>
										{' '}
										{item.name}
										<Button
											id={item.id}
											className='btn-add'
											text={BTN_DEL_AUTHOR}
											onClick={(e) => delCourseAuthor(e)}
										/>
									</span>
								))}
							</p>
						</div>
					</div>
				</form>
			</div>
		</>
	);
}

export default CourseFrom;
