import React from 'react';
import CourseCard from '../CourseCard';
import { screen } from '@testing-library/react';
import { mockedState, mockedStore } from '../../../../../mock';
import pipeDuration from '../../../../../helpers/pipeDuration';
import makeDateFormat from '../../../../../helpers/makeDateFormat';
import { renderWithRouterAndStore } from '../../../../../testUtils/renderWithRouterAndStore';

describe('CourseCard component', () => {
	it('tests CourseCard', () => {
		const route = '/courses';
		renderWithRouterAndStore(
			<CourseCard
				course={mockedState.courses[0]}
				authorsList={mockedState.authors}
			/>,
			{ route, store: mockedStore }
		);

		const { title, description, duration, creationDate } =
			mockedState.courses[0];
		const getCourseAuthorNames = 'Vasiliy Dobkin, Nicolas Kim';
		expect(screen.getByText(title)).toBeInTheDocument();
		expect(screen.getByText(description)).toBeInTheDocument();
		expect(screen.getByText(pipeDuration(duration))).toBeInTheDocument();
		expect(screen.getByText(makeDateFormat(creationDate))).toBeInTheDocument();
		expect(screen.getByText(getCourseAuthorNames)).toBeInTheDocument();
	});
});
