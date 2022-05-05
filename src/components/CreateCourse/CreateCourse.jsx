import React, { useState, useEffect } from 'react';
import {
	BTN_CREATE_COURSE,
	BTN_CREATE_AUTHOR,
	BTN_ADD_AUTHOR,
} from '../../constants';
import Button from '../../common/Button/Button.jsx';
import Input from '../../common/Input/Input.jsx';
import './createCourse.css';

function CreateCourse({ showCreate, authorsList, addAuthor }) {
	const [valueTitle, setTitle] = useState('');
	const [authors, setAuthors] = useState(authorsList);
	const [valueAuthor, setAuthor] = useState('');
	const [textArea, setTextArea] = useState('');
	const [duration, setDuration] = useState('');
	const [checkTextArea, setCheckTextArea] = useState('');
	const [checkAuthor, setCheckAuthor] = useState('');

	useEffect(() => {
		setAuthors(authorsList);
		console.log(authorsList);
	}, [authorsList]);

	const handleCreate = (e) => {
		e.preventDefault();
		if (!textArea || !valueTitle || !duration) {
			alert('Please, fill in all fields');
		} else if (textArea.length < 2) {
			setCheckTextArea('text length should be at least 2 characters');
		} else {
			setCheckTextArea('');
			showCreate(false);
		}
	};

	function authorNameAdd(e) {
		e.preventDefault();
		if (valueAuthor.length < 2) {
			setCheckAuthor('author name length should be at least 2 characters');
		} else {
			const newAuthor = { id: Date.now(), name: valueAuthor };
			addAuthor(newAuthor);
			setCheckAuthor('');
			setAuthor('');
		}
	}

	function addCourseAuthor(e) {
		e.preventDefault();
	}

	return (
		<div className='createCourse'>
			<form className='form-create'>
				<label>Title</label>
				<div className='form-wrap'>
					<Input
						minLength='2'
						type='text'
						placeholder='Enter title...'
						value={valueTitle}
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
					value={textArea}
					placeholder='Enter description'
					onChange={(e) => setTextArea(e.target.value)}
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
							Duration:{' '}
							<b>
								{(duration < 600 ? '0' : '') +
									Math.trunc(duration / 60) +
									':' +
									(duration % 60 < 10 ? '0' : '') +
									(duration % 60)}
							</b>{' '}
							hours
						</span>
					</div>
					<div className='authors'>
						<h4 className='author-title'>Authors</h4>
						<p className='info'>
							{[...authors].map((item) => (
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
					</div>
				</div>
			</form>
		</div>
	);
}

export default CreateCourse;
