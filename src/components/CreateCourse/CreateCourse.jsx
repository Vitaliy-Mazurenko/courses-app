import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import PropTypes from 'prop-types';
import {
	BTN_CREATE_COURSE,
	BTN_CREATE_AUTHOR,
	BTN_ADD_AUTHOR,
	BTN_DEL_AUTHOR,
} from '../../constants';
import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import './createCourse.css';
import dateGenerator from '../../helpers/dateGenerator';
import pipeDuration from '../../helpers/pipeDuration';

function CreateCourse({ authorsList, addAuthor, addCourse }) {
	const [title, setTitle] = useState('');
	const [authors, setAuthors] = useState(authorsList);
	const [authorCourse, setAuthorCourse] = useState('');
	const [valueAuthor, setAuthor] = useState('');
	const [description, setDescription] = useState('');
	const [duration, setDuration] = useState('');
	const [checkTextArea, setCheckTextArea] = useState('');
	const [checkAuthor, setCheckAuthor] = useState('');
	let navigate = useNavigate();

	useEffect(() => {
		setAuthors(authors);
	}, [authors]);

	const handleCreate = (e) => {
		e.preventDefault();
		if (!description || !title || !duration) {
			alert('Please, fill in all fields');
		} else if (description.length < 2) {
			setCheckTextArea('text length should be at least 2 characters');
		} else {
			setCheckTextArea('');
			let creationDate = dateGenerator(new Date());
			let authors = [];
			for (let i of authorCourse) {
				authors.push(i.id);
			}
			addCourse({
				id: uuid(),
				title,
				description,
				creationDate,
				duration,
				authors,
			});
			navigate('/courses');
		}
	};

	function authorNameAdd(e) {
		e.preventDefault();
		if (valueAuthor.length < 2) {
			setCheckAuthor('author name length should be at least 2 characters');
		} else {
			const newAuthor = { id: uuid(), name: valueAuthor };
			addAuthor(newAuthor);
			setCheckAuthor('');
			setAuthors([...authors, newAuthor]);
			setAuthor('');
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
							text={BTN_CREATE_COURSE}
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
							<div className='author-title'>Course authors</div>
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

export default CreateCourse;

CreateCourse.propTypes = {
	authorsList: PropTypes.array,
	addAuthor: PropTypes.func,
	addCourse: PropTypes.func,
};
