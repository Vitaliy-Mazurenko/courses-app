import * as actions from './actionTypes';

const userInitialState = {
	isAuth: false,
	name: '',
	email: '',
	token: '',
	role: '',
};
export default function userReducer(state = userInitialState, action) {
	switch (action.type) {
		case actions.LOGIN:
			return {
				isAuth: true,
				name: action.name,
				email: action.email,
				token: action.token,
				role: action.role,
			};
		case actions.LOGOUT:
			return userInitialState;
		default:
			return state;
	}
}
