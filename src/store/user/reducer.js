import * as actions from './actionTypes';

const userInitialState = {
	isAuth: false,
	name: '',
	email: '',
	token: '',
};
export default function authorsReducer(state = userInitialState, action) {
	switch (action.type) {
		case actions.GET_USER:
			return {
				isAuth: true,
				name: action.name,
				email: action.email,
				token: action.token,
			};
		case actions.DEL_USER:
			return userInitialState;
		default:
			return state;
	}
}

export const getUser = (name, email, token) => ({
	type: actions.GET_USER,
	name,
	email,
	token,
});

export const delUser = () => ({ type: actions.DEL_USER });
