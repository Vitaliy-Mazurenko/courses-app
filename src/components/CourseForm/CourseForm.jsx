import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
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
	HOURS,
} from '../../constants';
import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import pipeDuration from '../../helpers/pipeDuration';
import authorsFilter from '../../helpers/authorsFilter';
import {
	getAvailableAuthors,
	getCourseAuthors,
	getCourseById,
} from '../../selectors';
import { useParams } from 'react-router-dom';
import { useThunks } from '../../hooks/useThunks';
import './CourseForm.css';

const newCourseInitialForm = {
	title: '',
	description: '',
	duration: '',
	authors: [],
};

function CourseForm() {
	const bindedThunks = useThunks();
	const navigate = useNavigate();
	const { courseId } = useParams();
	const preloadedCourse = useSelector(getCourseById(courseId));
	const courseInitialForm = courseId ? preloadedCourse : newCourseInitialForm;
	const [courseForm, setCourseForm] = useState(courseInitialForm);
	const { title, description, duration, authors } = courseForm;
	const [newAuthor, setAuthor] = useState('');
	const availableAuthors = useSelector(getAvailableAuthors(authors));
	const courseAuthors = useSelector(getCourseAuthors(authors));
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
		setCourseForm({
			...courseForm,
			[e.target.name]: fieldValue,
		});
	};

	const addCourse = async () => {
		const newCourse = {
			title,
			description,
			duration: Number(duration),
			authors,
		};
		if (courseId) {
			await bindedThunks.thunkCourseUpdate(courseId, newCourse);
		} else {
			await bindedThunks.thunkCourseAdd(newCourse);
		}
	};

	const isFormValid = () => {
		return !description || !title || !Number(duration) || !authors.length;
	};

	const handleCreate = (e) => {
		e.preventDefault();
		if (isFormValid()) {
			alert('Please, fill in all fields');
		} else if (description.length < 2) {
			setCheckFields({
				...checkFields,
				checkDescription: 'text length should be at least 2 characters',
			});
		} else {
			addCourse();
			navigate('/courses');
			bindedThunks.getCoursesList();
			bindedThunks.getAuthorsList();
			setCheckFields({
				...checkFields,
				checkDescription: '',
			});
		}
	};

	const authorNameAdd = (e) => {
		e.preventDefault();
		if (newAuthor.length < 2) {
			setCheckFields({
				...checkFields,
				checkAuthor: 'author name length should be at least 2 characters',
			});
		} else {
			bindedThunks.thunkAuthorAdd(newAuthor);
			setCheckFields({
				...checkFields,
				checkAuthor: '',
			});
			setAuthor('');
		}
	};

	function addCourseAuthor(authorId) {
		setCourseForm({
			...courseForm,
			authors: [...authors, authorId],
		});
	}

	function delCourseAuthor(authorId) {
		setCourseForm((prevState) => ({
			...prevState,
			authors: [...authorsFilter(prevState.authors, authorId, 'ID')],
		}));
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
							value={title}
							name='title'
							onChange={handleChange}
						/>
						<Button
							type='submit'
							className='btn-create'
							text={!courseId ? BTN_CREATE_COURSE : BTN_UPDATE_COURSE}
							onClick={handleCreate}
						/>
					</div>
					<label>Description</label>
					<textarea
						type='text'
						placeholder={ENTER_DESCRIPTION}
						value={description}
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
								value={duration}
								name='duration'
								onKeyPress={handleKeyPress}
								onChange={handleChange}
							/>
							<span className='info-duration'>
								Duration: <b>{pipeDuration(duration)}</b>
								{HOURS}
							</span>
						</div>
						<div className='authors'>
							<h4 className='author-title'>Authors</h4>
							<p className='info'>
								{availableAuthors.map((item) => (
									<span key={item.id} className='author-item'>
										{' '}
										{item.name}
										<Button
											id={item.id}
											className='btn-add'
											text={BTN_ADD_AUTHOR}
											onClick={() => addCourseAuthor(item.id)}
										/>
									</span>
								))}
							</p>
							<h4 className='author-title'>Course authors</h4>
							<div className='author-title'>
								{courseAuthors.length === 0 && 'Author list is empty'}
							</div>
							<p className='info'>
								{[...courseAuthors].map((item) => (
									<span key={item.id} className='author-item authors-course'>
										{' '}
										{item.name}
										<Button
											id={item.id}
											className='btn-add'
											text={BTN_DEL_AUTHOR}
											onClick={() => delCourseAuthor(item.id)}
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

export default CourseForm;
