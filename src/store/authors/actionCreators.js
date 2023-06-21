import * as actions from './actionTypes';

export const setAuthors = (authors) => ({
	type: actions.SET_AUTHORS,
	payload: authors,
});

export const addAuthors = (author) => ({
	type: actions.ADD_AUTHORS,
	payload: author,
});
