import axios from 'axios';
import { setCourses } from './store/courses/actionCreators';
import { setAuthors } from './store/authors/actionCreators';
import { URL } from './constants';

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
