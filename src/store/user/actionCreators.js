import * as actions from './actionTypes';
export const getUSER = (name, email, token, role) => ({
	type: actions.GET_USER,
	name,
	email,
	token,
	role,
});
export const delUSER = () => ({ type: actions.DEL_USER });
