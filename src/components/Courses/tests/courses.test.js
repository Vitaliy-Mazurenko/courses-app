import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CourseForm from '../../CourseForm/CourseForm';
import Courses from '../Courses';
import { Routes, Route } from 'react-router-dom';

import { renderWithRouterAndStore } from '../../../testUtils/renderWithRouterAndStore';

const RouterComponent = () => (
	<>
		<Routes>
			<Route path='/courses' element={<Courses />} />
			<Route path='/courses/add' element={<CourseForm />} />
		</Routes>
	</>
);

const mockedState = {
	user: {
		isAuth: true,
		name: 'Test Name',
		role: 'admin',
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
	beforeEach(() => {
		const route = '/courses';

		renderWithRouterAndStore(<RouterComponent />, {
			route,
			store: mockedStore,
		});
	});
	it('Render Courses', () => {
		const courseCards = screen.getAllByTestId('courseCard');
		expect(courseCards).toHaveLength(mockedState.course.length);

		const coursesList = screen.getByTestId('coursesList');

		expect(coursesList).toBeDefined();
	});

	it('CourseForm should be showed after a click on a button "Add new course"', () => {
		expect(screen.queryByTestId('courseForm')).toBeNull();

		userEvent.click(screen.getByTestId('courseFormButton'));
		expect(screen.getByTestId('courseForm')).toBeInTheDocument();
	});
});
