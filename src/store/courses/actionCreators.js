import * as actions from './actionTypes';

export const setCourses = (payload) => ({ type: actions.SET_COURSES, payload });

export const addCourses = (payload) => ({ type: actions.ADD_COURSES, payload });

export const delCourses = (payload) => ({ type: actions.DEL_COURSES, payload });
