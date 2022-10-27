import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CourseForm from '../../CourseForm/CourseForm';
import Courses from '../Courses';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { mockedState, mockedStore } from '../../../mock';

// const mockedState = {
// 	user: {
// 		isAuth: true,
// 		name: 'Test Name',
// 	},
// 	courses: [],
// 	authors: [],
// };
// const mockedStore = {
// 	getState: () => mockedState,
// 	subscribe: jest.fn(),
// 	dispatch: jest.fn(),
// };

describe('Courses', () => {
	const { getByTestId, getAllByTestId, queryByTestId } = render(
		<Provider store={mockedStore}>
			<Router>
				<Courses />
				<CourseForm />
			</Router>
		</Provider>
	);

	it('Render Courses', () => {
		render(<Courses />);
		screen.debug();
		const courseCards = getAllByTestId('courseCard');
		expect(courseCards).toHaveLength(mockedState.courses.length);

		const coursesList = getByTestId('coursesList');
		expect(coursesList).toBeDefined();
	});

	it('CourseForm should be showed after a click on a button "Add new course"', () => {
		render(<CourseForm />);
		screen.debug();
		expect(queryByTestId('courseForm')).toBeNull();
		userEvent.click(getByTestId('navigate-to-course-form-button'));

		expect(getByTestId('courseForm')).toBeInTheDocument();
	});
});
