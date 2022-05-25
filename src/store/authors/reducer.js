import * as actions from './actionTypes';

const authorsInitialState = {
	authors: [],
};

export default function authorsReducer(state = authorsInitialState, action) {
	switch (action.type) {
		case actions.SET_AUTHORS:
			return { ...state, authors: action.payload };
		case actions.ADD_AUTHORS:
			return { ...state, authors: [...state.authors, action.payload] };
		default:
			return state;
	}
}

export const setAuthors = (payload) => ({ type: actions.SET_AUTHORS, payload });

export const addAuthors = (payload) => ({ type: actions.ADD_AUTHORS, payload });
