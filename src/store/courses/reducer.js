import * as actions from './actionTypes';

const coursesInitialState = {
	courses: [],
	isFetching: false,
};

export default function coursesReducer(state = coursesInitialState, action) {
	switch (action.type) {
		case actions.SET_COURSES:
			return { ...state, courses: action.payload, isFetching: true };
		case actions.ADD_COURSES:
			return { ...state, courses: [...state.courses, action.payload] };
		case actions.DEL_COURSES:
			return {
				...state,
				courses: [
					...state.courses.filter(
						(course) => !course.id.includes(action.payload)
					),
				],
			};
		default:
			return state;
	}
}

export const setCourses = (payload) => ({ type: actions.SET_COURSES, payload });

export const addCourses = (payload) => ({ type: actions.ADD_COURSES, payload });

export const delCourses = (payload) => ({ type: actions.DEL_COURSES, payload });
