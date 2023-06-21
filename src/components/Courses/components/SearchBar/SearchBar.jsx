import React, { useState } from 'react';
import Button from '../../../../common/Button/Button';
import Input from '../../../../common/Input/Input';
import { BUTTON_TEXT, ENTER_COURSE_NAME } from '../../../../constants';
import './searchBar.css';

export default function SearchBar({ searchValue }) {
	const [value, setValue] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		searchValue(value);
		setValue('');
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
		</div>
	);
}
