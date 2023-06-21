import React from 'react';
import Logo from '../components/Logo/Logo';
import Header from '../Header';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

const mockedState = {
	user: {
		isAuth: true,
		name: 'Test Name',
	},
};

const mockedStore = {
	getState: () => mockedState,
	subscribe: jest.fn(),
	dispatch: jest.fn(),
};

describe('Header', () => {
	it('should have logo', () => {
		render(<Logo />);
		expect(screen.getByTestId('logo')).toBeInTheDocument();
	});

	it('should have user"s name', () => {
		const { getByTestId, getByText } = render(
			<Provider store={mockedStore}>
				<Router>
					<Header />
				</Router>
			</Provider>
		);
		expect(getByTestId('user')).toBeInTheDocument();
		expect(getByText('Test Name')).toBeInTheDocument();
	});
});
