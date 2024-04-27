import axios from 'axios';
import {
	URL,
	POST_SUCCESSFUL_STATUS,
	GET_SUCCESSFUL_STATUS,
} from './constants';
import { localStorageAPI } from './helpers/localStorageAPI';

const axiosInstance = axios.create({
	baseURL: URL,
	headers: {
		'Content-type': 'application/json',
	},
});

axiosInstance.interceptors.request.use((config) => {
	config.headers.Authorization = localStorageAPI.getUserToken();
	return config;
});

export const coursesListFetch = async (searchQuery = 'courses/all') => {
	return await axios.get(`${URL}${searchQuery}`);
};

export const courseFetch = async (course) => {
	try {
		const dataString = JSON.stringify(course);
		const response = await axiosInstance.post(`courses/add`, dataString);
		if (response.status === POST_SUCCESSFUL_STATUS) {
			return response.data;
		}
	} catch (error) {
		console.error(error);
	}
};

export const deleteCourse = async (id) => {
	try {
		const response = await axiosInstance.delete(`courses/${id}`);
		if (response.status === GET_SUCCESSFUL_STATUS) {
			return response.data;
		}
	} catch (error) {
		console.error(error);
	}
};

export const updateCourseFetch = async (id, updatedCourse) => {
	try {
		const dataString = JSON.stringify(updatedCourse);
		const response = await axiosInstance.put(`courses/${id}`, dataString);

		if (response.status === GET_SUCCESSFUL_STATUS) {
			return response.data;
		}
	} catch (error) {
		console.error(error);
	}
};

export const authorsListFetch = async (searchQuery = 'authors/all') => {
	return await axios.get(`${URL}${searchQuery}`);
};

export const authorsFetch = async (author) => {
	try {
		const dataString = JSON.stringify({ name: author });
		const response = await axiosInstance.post('authors/add', dataString);
		if (response.status === POST_SUCCESSFUL_STATUS) {
			return response.data;
		}
	} catch (error) {
		console.error(error);
	}
};

export const meFetch = async () => {
	try {
		const response = await axiosInstance.get('users/me');
		if (response.status === GET_SUCCESSFUL_STATUS) {
			return response.data.result;
		}
	} catch (error) {
		console.warn(error.message);
	}
};

export const logout = async () => {
	try {
		const response = await axios.delete(`${URL}logout`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: localStorageAPI.getUserToken(),
			},
		});
		if (response.status === GET_SUCCESSFUL_STATUS) {
			return true;
		}
	} catch (error) {
		console.log(error.message);
	}
};

export const userFetch = async (user, searchQuery = 'login') => {
	return await fetch(`${URL}${searchQuery}`, {
		method: 'POST',
		body: JSON.stringify(user),
		headers: {
			'Content-Type': 'application/json',
		},
	});
};
