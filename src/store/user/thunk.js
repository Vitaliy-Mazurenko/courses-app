import { getUser, delUser } from './actionCreators';
import { meFetch, logout } from '../../services';

export const thunkAction = async (dispatch, token) => {
	if (token) {
		try {
			const response = await meFetch();
			if (response) {
				dispatch(getUser(response.name, response.email, token, response.role));
			}
		} catch (error) {
			console.warn(error.message);
		}
	}
};

export const thunkActionLogout = async (dispatch) => {
	try {
		const response = await logout();
		if (response) {
			dispatch(delUser());
		}
	} catch (error) {
		console.log(error.message);
	}
};
