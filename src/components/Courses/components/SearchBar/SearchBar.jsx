import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../../common/Button/Button';
import Input from '../../../../common/Input/Input';
import { BUTTON_TEXT, BUTTON_ADD_COURSE } from '../../../../constants';
import './searchBar.css';

export default function SearchBar({ valChange }) {
	const [value, setValue] = useState('');
	let navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		valChange(value);
		setValue('');
	};
	const createCourse = () => {
		navigate('/createCourses');
	};

	return (
		<div className='search'>
			<form onSubmit={handleSubmit} className='form-inline'>
				<Input
					type='text'
					placeholder='Enter course name or id...'
					value={value}
					onChange={(e) => setValue(e.target.value)}
				/>
				<Button type='submit' text={BUTTON_TEXT} />
			</form>
			<Button text={BUTTON_ADD_COURSE} onClick={() => createCourse()} />
		</div>
	);
}
