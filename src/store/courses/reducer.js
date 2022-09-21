import * as actions from './actionTypes';

const coursesInitialState = [];

export const coursesReducer = (state = coursesInitialState, action) => {
	switch (action.type) {
		case actions.SET_COURSES:
			return action.payload;
		case actions.ADD_COURSES:
			return [...state, action.payload];
		case actions.DEL_COURSES:
			return state.filter((course) => course.id !== action.payload);
		case actions.UPDATE_COURSE:
			const withoutCourse = state.filter(
				(course) => course.id !== action.payload.id
			);
			return [...withoutCourse, action.payload];
		default:
			return state;
	}
};
