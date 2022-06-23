import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addAuthors } from '../../store/authors/actionCreators';
import { getAuthors } from '../../selectors';
import {
	BTN_CREATE_COURSE,
	BTN_CREATE_AUTHOR,
	BTN_ADD_AUTHOR,
	BTN_DEL_AUTHOR,
	BTN_UPDATE_COURSE,
	ENTER_AUTHOR_NAME,
	ENTER_DURATION,
	ENTER_DESCRIPTION,
	ENTER_TITLE,
	INVERSE,
	HOURS,
} from '../../constants';
import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import pipeDuration from '../../helpers/pipeDuration';
import authorsListFilter from '../../helpers/authorsListFilter';
import authorsFilter from '../../helpers/authorsFilter';
import { getCourses } from '../../selectors';
import { getCoursesList, getAuthorsList } from '../../services';
import { useParams } from 'react-router-dom';
import { thunkActionAdd, thunkActionUpdate } from '../../store/courses/thunk';
import { thunkActionAuthorAdd } from '../../store/authors/thunk';
import './courseFrom.css';

function CourseFrom() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const params = useParams();
	const authorsList = useSelector(getAuthors);
	const coursesList = useSelector(getCourses);
	const updateCourse = coursesList.find((course) =>
		course.id.includes(params.id)
	);
	const [authorsCourse, setAuthorsCourse] = useState('');
	const [newAuthor, setAuthor] = useState('');
	const [courseFields, setCourseFields] = useState({
		title: '',
		description: '',
		duration: '',
		authors: authorsList,
	});
	const [checkFields, setCheckFields] = useState({
		checkDescription: '',
		checkAuthor: '',
	});

	const handleKeyPress = (e) => {
		const keyCode = e.keyCode || e.which;
		const keyValue = String.fromCharCode(keyCode);
		if (/[+e-]/.test(keyValue)) e.preventDefault();
	};

	const handleChange = (e) => {
		const fieldValue = e.target.value;
		setCourseFields({
			...courseFields,
			[e.target.name]: fieldValue,
		});
	};

	useEffect(() => {
		if (updateCourse) {
			setCourseFields({
				title: updateCourse.title,
				description: updateCourse.description,
				duration: updateCourse.duration,
				authors: authorsListFilter(authorsList, updateCourse, INVERSE),
			});
			setAuthorsCourse(authorsListFilter(authorsList, updateCourse));
		}
	}, [updateCourse, authorsList]);

	const addAuthor = (newAuthor) => {
		dispatch(addAuthors(newAuthor));
	};

	const addCourse = async () => {
		let authors = [];
		authorsCourse.forEach(function (i) {
			authors.push(i.id);
		});
		const newCourse = {
			title: courseFields.title,
			description: courseFields.description,
			duration: Number(courseFields.duration),
			authors,
		};

		if (updateCourse) {
			await thunkActionUpdate(dispatch, params.id, newCourse);
		} else {
			await thunkActionAdd(dispatch, newCourse);
		}
	};

	const handleCreate = (e) => {
		e.preventDefault();
		if (
			!courseFields.description ||
			!courseFields.title ||
			!courseFields.duration
		) {
			alert('Please, fill in all fields');
		} else if (courseFields.description.length < 2) {
			setCheckFields({
				...checkFields,
				checkDescription: 'text length should be at least 2 characters',
			});
		} else {
			addCourse();
			navigate('/courses');
			dispatch(getCoursesList());
			dispatch(getAuthorsList());
			setCheckFields({
				...checkFields,
				checkDescription: '',
			});
		}
	};

	const authorNameAdd = async (e) => {
		e.preventDefault();
		if (newAuthor.length < 2) {
			setCheckFields({
				...checkFields,
				checkAuthor: 'author name length should be at least 2 characters',
			});
		} else {
			let responseAuthor = await thunkActionAuthorAdd(newAuthor);
			addAuthor(responseAuthor);
			setCourseFields({
				...courseFields,
				authors: [...courseFields.authors, responseAuthor],
			});
			setCheckFields({
				...checkFields,
				checkAuthor: '',
			});
			setAuthor('');
		}
	};

	function addCourseAuthor(e) {
		e.preventDefault();
		setCourseFields({
			...courseFields,
			authors: authorsFilter(courseFields.authors, e, INVERSE),
		});
		setAuthorsCourse([
			...authorsCourse,
			...authorsFilter(courseFields.authors, e),
		]);
	}

	function delCourseAuthor(e) {
		e.preventDefault();
		setAuthorsCourse(authorsFilter(authorsCourse, e, INVERSE));
		setCourseFields({
			...courseFields,
			authors: [...courseFields.authors, ...authorsFilter(authorsCourse, e)],
		});
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
							placeholder={ENTER_TITLE}
							value={courseFields.title}
							name='title'
							onChange={handleChange}
						/>
						<Button
							type='submit'
							className='btn-create'
							text={!updateCourse ? BTN_CREATE_COURSE : BTN_UPDATE_COURSE}
							onClick={handleCreate}
						/>
					</div>
					<label>Description</label>
					<textarea
						type='text'
						placeholder={ENTER_DESCRIPTION}
						value={courseFields.description}
						name='description'
						onChange={handleChange}
					/>
					<span className='validate'>{checkFields.checkDescription}</span>
					<div className='authors-wrap'>
						<div className='author-create'>
							<h4 className='author-title'>Add author</h4>
							<label>Author name</label>
							<Input
								type='text'
								placeholder={ENTER_AUTHOR_NAME}
								value={newAuthor}
								onChange={(e) => setAuthor(e.target.value)}
							/>
							<span className='validate'>{checkFields.checkAuthor}</span>
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
								step='1'
								placeholder={ENTER_DURATION}
								value={courseFields.duration}
								name='duration'
								onKeyPress={handleKeyPress}
								onChange={handleChange}
							/>
							<span className='info-duration'>
								Duration: <b>{pipeDuration(courseFields.duration)}</b>
								{HOURS}
							</span>
						</div>
						<div className='authors'>
							<h4 className='author-title'>Authors</h4>
							<p className='info'>
								{courseFields.authors.map((item) => (
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
								{authorsCourse.length === 0 && 'Author list is empty'}
							</div>
							<p className='info'>
								{[...authorsCourse].map((item) => (
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
