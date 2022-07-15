import * as actions from './actionTypes';

const coursesInitialState = {
	courses: [],
};

export default function coursesReducer(state = coursesInitialState, action) {
	switch (action.type) {
		case actions.SET_COURSES:
			return { ...state, courses: action.payload };
		case actions.ADD_COURSES:
			return { ...state, courses: [...state.courses, action.payload] };
		case actions.DEL_COURSES:
			return {
				...state,
				courses: [
					...state.courses.filter((course) => course.id !== action.payload),
				],
			};
		case actions.UPDATE_COURSE:
			const withoutCourse = state.courses.filter(
				(course) => course.id !== action.payload.id
			);
			return [...withoutCourse, action.payload];
		default:
			return state;
	}
}
