import { URL } from '../constants';

export const userFetch = async (user, searchQuery = 'login') => {
	return await fetch(`${URL}${searchQuery}`, {
		method: 'POST',
		body: JSON.stringify(user),
		headers: {
			'Content-Type': 'application/json',
		},
	});
};

export const authorsFetch = async (author, searchQuery = 'authors/add') => {
	return await fetch(`${URL}${searchQuery}`, {
		method: 'POST',
		body: JSON.stringify({ name: author }),
		headers: {
			'Content-Type': 'application/json',
			Authorization: localStorage.getItem('token'),
		},
	});
};

export const coursesFetch = async (course, searchQuery = 'courses/add') => {
	return await fetch(`${URL}${searchQuery}`, {
		method: 'POST',
		body: JSON.stringify(course),
		headers: {
			'Content-Type': 'application/json',
			Authorization: localStorage.getItem('token'),
		},
	});
};

export const meFetch = async (searchQuery = 'users/me') => {
	return await fetch(`${URL}${searchQuery}`, {
		method: 'GET',
		body: JSON.stringify(),
		headers: {
			'Content-Type': 'application/json',
			Authorization: localStorage.getItem('token'),
		},
	});
};
