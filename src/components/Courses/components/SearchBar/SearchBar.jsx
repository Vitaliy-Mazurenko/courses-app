import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../../common/Button/Button';
import Input from '../../../../common/Input/Input';
import {
	BUTTON_TEXT,
	BUTTON_ADD_COURSE,
	ENTER_COURSE_NAME,
} from '../../../../constants';
import './searchBar.css';

export default function SearchBar({ searchValue }) {
	const [value, setValue] = useState('');
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		searchValue(value);
		setValue('');
	};
	const createCourse = () => {
		navigate('/courses/add');
	};

	return (
		<div className='search'>
			<form onSubmit={handleSubmit} className='form-inline'>
				<Input
					type='text'
					placeholder={ENTER_COURSE_NAME}
					value={value}
					onChange={(e) => setValue(e.target.value)}
				/>
				<Button type='submit' text={BUTTON_TEXT} />
			</form>
			<Button text={BUTTON_ADD_COURSE} onClick={() => createCourse()} />
		</div>
	);
}
