import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CourseForm from '../../CourseForm/CourseForm';
import Courses from '../Courses';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
// import { mockedState, mockedStore } from '../../../mock';

const mockedState = {
	user: {
		isAuth: true,
		name: 'Test Name',
	},
	course: [
		{
			id: 'course1',
			title: 'JavaScript',
			description: 'some text',
			creationDate: '8/3/2021',
			duration: 160,
			authors: ['author1', 'author2'],
		},
		{
			id: 'course2',
			title: 'Angular',
			description: 'some text 2',
			creationDate: '10/11/2020',
			duration: 210,
			authors: ['author3', 'author4'],
		},
	],
	author: [
		{
			id: 'author1',
			name: 'Vasiliy Dobkin',
		},
		{
			id: 'author2',
			name: 'Nicolas Kim',
		},
		{
			id: 'author3',
			name: 'Anna Sidorenko',
		},
		{
			id: 'author4',
			name: 'Valentina Larina',
		},
	],
};
const mockedStore = {
	getState: () => mockedState,
	subscribe: jest.fn(),
	dispatch: jest.fn(),
};

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
		// render(<Courses />);
		screen.debug();
		const courseCards = getAllByTestId('courseCard');
		expect(courseCards).toHaveLength(mockedState.course.length);

		const coursesList = getByTestId('coursesList');
		expect(coursesList).toBeDefined();
	});

	it('CourseForm should be showed after a click on a button "Add new course"', () => {
		// render(<CourseForm />);
		screen.debug();
		expect(queryByTestId('courseForm')).toBeNull();
		userEvent.click(getByTestId('navigate-to-course-form-button'));

		expect(getByTestId('courseForm')).toBeInTheDocument();
	});
});
