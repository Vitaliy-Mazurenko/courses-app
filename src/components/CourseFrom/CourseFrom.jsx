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
import { thunkActionAdd } from '../../store/courses/thunk';
import { thunkActionAuthorAdd } from '../../store/authors/thunk';
import './courseFrom.css';

function CourseFrom() {
	const [title, setTitle] = useState('');
	const authorsList = useSelector(getAuthors);
	const [authors, setAuthors] = useState(authorsList);
	const params = useParams();
	const coursesList = useSelector(getCourses);
	const cours = coursesList
		.filter((course) => course.id.includes(params.id))
		.shift();
	const [authorCourse, setAuthorCourse] = useState('');
	const [valueAuthor, setAuthor] = useState('');
	const [description, setDescription] = useState('');
	const [duration, setDuration] = useState('');
	const [checkTextArea, setCheckTextArea] = useState('');
	const [checkAuthor, setCheckAuthor] = useState('');
	let navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		setAuthors(authors);
	}, [authors]);

	useEffect(() => {
		if (cours) {
			setTitle(cours.title);
			setDescription(cours.description);
			setDuration(cours.duration);
			setAuthorCourse(
				authorsList.filter((item) => cours.authors.includes(item['id']))
			);
			setAuthors(
				authorsList.filter((aut) => !cours.authors.includes(aut['id']))
			);
		}
	}, [cours, authorsList]);

	const addAuthor = (newAuthor) => {
		dispatch(addAuthors(newAuthor));
	};
	//async
	const addCourse = async (newCourse) => {
		(async () => {
			let response = await thunkActionAdd(newCourse);
			dispatch(addCourses(response));
		})();
	};

	const handleCreate = (e) => {
		e.preventDefault();
		if (!description || !title || !duration) {
			alert('Please, fill in all fields');
		} else if (description.length < 2) {
			setCheckTextArea('text length should be at least 2 characters');
		} else {
			setCheckTextArea('');
			let creationDuration = Number(duration);
			let authors = [];
			for (let i of authorCourse) {
				authors.push(i.id);
			}
			addCourse({
				title,
				description,
				duration: creationDuration,
				authors,
			});
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
				console.log(responseAuthor);
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
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
						<Button
							type='submit'
							className='btn-create'
							text={!cours ? BTN_CREATE_COURSE : BTN_UPDATE_COURSE}
							onClick={handleCreate}
						/>
					</div>
					<label>Description</label>
					<textarea
						type='text'
						value={description}
						placeholder='Enter description'
						onChange={(e) => setDescription(e.target.value)}
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
								value={duration}
								onChange={(e) => setDuration(e.target.value)}
							/>
							<span className='info-duration'>
								Duration: <b>{pipeDuration(duration)}</b> hours
							</span>
						</div>
						<div className='authors'>
							<h4 className='author-title'>Authors</h4>
							<p className='info'>
								{authors.map((item) => (
									<span key={item['id']} className='author-item'>
										{' '}
										{item['name']}
										<Button
											id={item['id']}
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
									<span key={item['id']} className='author-item authors-course'>
										{' '}
										{item['name']}
										<Button
											id={item['id']}
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
