import React, { useState } from 'react';
import {
	BTN_CREATE_COURSE,
	BTN_CREATE_AUTHOR,
	BTN_ADD_AUTHOR,
} from '../../constants';
import Button from '../../common/Button/Button.jsx';
import Input from '../../common/Input/Input.jsx';
import './createCourse.css';

function CreateCourse({ showCreate }) {
	const [value, setValue] = useState('');
	const [duration, setDuration] = useState('');

	const handleCreate = (e) => {
		e.preventDefault();
		showCreate(false);
		console.log(duration);
	};
	return (
		<div className='createCourse'>
			<form onSubmit={handleCreate} className='form-create'>
				<label>Title</label>
				<div className='form-wrap'>
					<Input
						type='text'
						placeholder='Enter title...'
						value={value}
						onChange={(e) => setValue(e.target.value)}
					/>
					<Button
						type='submit'
						className='btn-create'
						text={BTN_CREATE_COURSE}
					/>
				</div>
				<label>Description</label>
				<textarea placeholder='Enter description' />
				<div className='authors-wrap'>
					<div className='author-create'>
						<div className='author-title'>Add author</div>
						<label>Author name</label>
						<Input
							type='text'
							placeholder='Enter author name...'
							value={value}
							onChange={(e) => setValue(e.target.value)}
						/>
						<Button
							type='submit'
							className='btn-create'
							text={BTN_CREATE_AUTHOR}
						/>
						<div className='duration-title'>Duration</div>
						<label>Duration</label>
						<Input
							type='number'
							placeholder='Enter duration in minutes...'
							value={duration}
							onChange={(e) => setDuration(e.target.value)}
						/>
					</div>
					<div className='authors'>
						<div className='author-title'>Authors</div>
					<span>Vasiliy Dobkin</span>
						<Button className='btn-add' text={BTN_ADD_AUTHOR} />
						<div className='author-title'>Course authors</div>
					</div>
				</div>
			</form>
		</div>
	);
}

export default CreateCourse;
