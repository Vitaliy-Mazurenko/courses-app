const SET_COURSES = 'SET_COURSES';

const defaultState = {
	courses: [],
	isFetching: true,
};

export default function coursesReducer(state = defaultState, action) {
	switch (action.type) {
		case SET_COURSES:
			return { ...state, courses: action.payload };
		default:
			return state;
	}
}

export const setCourses = (payload) => ({ type: SET_COURSES, payload });
