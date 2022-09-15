import React from 'react';
import Logo from '../components/Logo/Logo';
import Header from '../Header';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Logo component', () => {
	// it('renders Logo without crashing', () => {
	// 	const div = document.createElement('div');
	// 	render(<Logo />, div);
	// });

	it('renders Logo  correctly', () => {
		render(<Logo />);
	});
});

const mockedState = {
	user: {
		isAuth: true,
		name: 'Name',
		role: 'admin',
	},
};

const mockedStore = {
	getState: () => mockedState,
	subscribe: jest.fn(),
	dispatch: jest.fn(),
};

describe('Header should have user"s name', () => {
	it('user"s name', () => {
		const { getByTestId } = render(
			<Provider store={mockedStore}>
				<Router>
					<Header />
				</Router>
			</Provider>
		);
		expect(getByTestId('user')).toBeInTheDocument();
	});
});
