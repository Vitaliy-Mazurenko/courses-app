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
