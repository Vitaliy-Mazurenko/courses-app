import { URL } from '../../constants';
import { getUser } from './reducer';

export const thunkAction = async (dispatch, token) => {
	try {
		if (localStorage.getItem('token')) {
			const response = await fetch(`${URL}users/me`, {
				method: 'GET',
				body: JSON.stringify(),
				headers: {
					'Content-Type': 'application/json',
					Authorization: localStorage.getItem('token'),
				},
			});
			const json = await response.json();
			if (response.ok) {
				dispatch(
					getUser(json.result.name, json.result.email, token, json.result.role)
				);
			} else {
				console.log(json);
			}
		}
	} catch (error) {
		console.warn(error.message);
	}
};

export const thunkActionLogout = async () => {
	try {
		const response = await fetch(`${URL}logout`, {
			method: 'DELETE',
			body: JSON.stringify(),
			headers: {
				'Content-Type': 'application/json',
				Authorization: localStorage.getItem('token'),
			},
		});
		if (!response.ok) {
			console.log(response);
		}
	} catch (error) {
		console.log(error.message);
	}
};
