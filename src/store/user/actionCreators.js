import * as actions from './actionTypes';
export const getUser = (name, email, token, role) => ({
	type: actions.GET_USER,
	name,
	email,
	token,
	role,
});
export const delUser = () => ({ type: actions.DEL_USER });
