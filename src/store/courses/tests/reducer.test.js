import { coursesActionCreators } from '..';
import { mockedCoursesList } from '../../../mock';
import { coursesReducer } from '../reducer';

const mockCourse = {
	id: 'foo',
	title: 'Mock Course',
	description: 'Mock Description',
	creationDate: '8/3/2021',
	duration: 160,
	authors: [
		'27cc3006-e93a-4748-8ca8-73d06aa93b6d',
		'f762978b-61eb4096-812b-ebde22838167',
	],
};

describe('coursesReducer', () => {
	test('should return the initial state', () => {
		expect(coursesReducer(mockedCoursesList, {})).toEqual(mockedCoursesList);
	});

	test('should handle ADD_COURSE and return new state', () => {
		const oldState = coursesReducer(mockedCoursesList, {});

		expect(oldState.length).toBe(2);

		const action = coursesActionCreators.addCourses(mockCourse);

		const newState = coursesReducer(mockedCoursesList, action);

		expect(newState.length).toBe(3);
	});

	test('should handle GET_COURSES and return new state', () => {
		const action = coursesActionCreators.setCourses(mockedCoursesList);

		expect(coursesReducer([], action)).toEqual(mockedCoursesList);
	});
});
