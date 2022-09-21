import * as actions from './actionTypes';

const authorsInitialState = [];

export const authorsReducer = (state = authorsInitialState, action) => {
	switch (action.type) {
		case actions.SET_AUTHORS:
			return action.payload;
		case actions.ADD_AUTHORS:
			return [...state, action.payload];
		default:
			return state;
	}
};
