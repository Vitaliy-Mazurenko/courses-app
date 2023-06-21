import * as actions from './actionTypes';

export const setCourses = (courses) => ({
	type: actions.SET_COURSES,
	payload: courses,
});

export const addCourses = (course) => ({
	type: actions.ADD_COURSES,
	payload: course,
});

export const delCourses = (id) => ({ type: actions.DEL_COURSES, payload: id });

export const updateCourse = (course) => ({
	type: actions.UPDATE_COURSE,
	payload: course,
});
