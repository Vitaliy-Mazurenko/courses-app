import React, { useState } from 'react';
import Button from '../../../../common/Button/Button.jsx';
import Input from '../../../../common/Input/Input.jsx';
import { BUTTON_TEXT, BUTTON_ADD_COURSE } from '../../../../constants';
import './searchBar.css';

export default function SearchBar({ valChange, showCreate }) {
	const [value, setValue] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		valChange(value);
		setValue('');
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
			<Button text={BUTTON_ADD_COURSE} onClick={() => showCreate(true)} />
		</div>
	);
}
