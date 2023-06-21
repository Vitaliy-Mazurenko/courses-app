import React from 'react';
import './button.css';

export default function Button({ text, onClick, id, testID }) {
	return (
		<button id={id} onClick={onClick} data-testid={testID}>
			{text}
		</button>
	);
}
