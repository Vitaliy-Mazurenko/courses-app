import * as actions from './actionTypes';
export const getUser = (name, email, token, role) => ({
	type: actions.LOGIN,
	payload: {
		name,
		email,
		token,
		role,
	},
});
export const delUser = () => ({ type: actions.LOGOUT });
