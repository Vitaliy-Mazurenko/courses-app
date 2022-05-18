const SET_AUTHORS = 'SET_AUTHORS';

const defaultState = {
	authors: [],
	isFetching: true,
};

export default function authorsReducer(state = defaultState, action) {
	switch (action.type) {
		case SET_AUTHORS:
			return { ...state, authors: action.payload };
		default:
			return state;
	}
}

export const setAuthors = (payload) => ({ type: SET_AUTHORS, payload });
