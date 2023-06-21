import { getUser, delUser } from './actionCreators';
import { meFetch, logout } from '../../services';

export const thunkCurrentUser = (token) => async (dispatch) => {
	if (token) {
		const response = await meFetch();
		if (response) {
			dispatch(getUser(response.name, response.email, token, response.role));
		}
	}
};

export const thunkActionLogout = () => async (dispatch) => {
	const response = await logout();
	if (response) {
		dispatch(delUser());
	}
};
