import React from 'react';
import './button.css';

export default function Button({ text, onClick, id }) {
	return (
		<button id={id} onClick={onClick}>
			{text}
		</button>
	);
}
