import React from 'react';
// import ReactDOM from 'react-dom/client';
import ReactDOM from 'react-dom';
import Logo from '../components/Logo/Logo';
import { render } from '@testing-library/react';

describe('Logo component', () => {
	it('renders Logo without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(<Logo />, div);
	});

	it('renders Logo  correctly', () => {
		render(<Logo />);
	});
});
