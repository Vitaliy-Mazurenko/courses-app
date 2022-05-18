import axios from 'axios';
import { setCourses } from './store/courses/reducer';
import { setAuthors } from './store/authors/reducer';
const URL = 'http://localhost:4000/';

export const getCoursesList = (searchQuery = 'courses/all') => {
	return async (dispatch) => {
		const response = await axios.get(`${URL}${searchQuery}`);
		dispatch(setCourses(response.data.result));
	};
};

export const getAuthorsList = (searchQuery = 'authors/all') => {
	return async (dispatch) => {
		const response = await axios.get(`${URL}${searchQuery}`);
		dispatch(setAuthors(response.data.result));
	};
};
