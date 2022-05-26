import * as actions from './actionTypes';
export const getUSER = (name, email, token) => ({
	type: actions.GET_USER,
	name,
	email,
	token,
});
export const delUSER = () => ({ type: actions.DEL_USER });
