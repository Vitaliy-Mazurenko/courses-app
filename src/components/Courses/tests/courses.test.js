import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { CourseForm } from '../../CourseForm/CourseForm';
import { CourseCard } from '../components/CourseCard/CourseCard';
import { mockedState } from '../../../mock';

describe('Courses', () => {
	it('Render Courses', () => {
		render(<CourseCard />);
		const courseCards = screen.getAllByTestId('courseCard');
		expect(courseCards).toHaveLength(mockedState.courses.length);

		const coursesList = screen.getByTestId('coursesList');
		expect(coursesList).toBeDefined();
	});

	it('CourseForm should be showed after a click on a button "Add new course"', () => {
		render(<CourseForm />);
		expect(screen.queryByTestId('courseForm')).toBeNull();
		userEvent.click(screen.getByTestId('navigate-to-course-form-button'));

		expect(screen.getByTestId('courseForm')).toBeInTheDocument();
	});
});
