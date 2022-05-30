import * as actions from './actionTypes';
import { getUSER, delUSER } from './actionCreators';

const userInitialState = {
	isAuth: false,
	name: '',
	email: '',
	token: '',
	role: '',
};
export default function authorsReducer(state = userInitialState, action) {
	switch (action.type) {
		case actions.GET_USER:
			return {
				isAuth: true,
				name: action.name,
				email: action.email,
				token: action.token,
				role: action.role,
			};
		case actions.DEL_USER:
			return userInitialState;
		default:
			return state;
	}
}

export const getUser = (name, email, token, role) =>
	getUSER(name, email, token, role);

export const delUser = () => delUSER();
