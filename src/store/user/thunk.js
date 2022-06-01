import { getUser } from './reducer';

export const thunkAction = async (dispatch, token) => {
	const URL = 'http://localhost:4000/users/me';

	try {
		if (localStorage.getItem('token')) {
			const response = await fetch(URL, {
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
				console.warn(json);
			}
		}
	} catch (error) {
		console.warn(error.message);
	}
};

export const thunkActionLogout = async () => {
	const URL = 'http://localhost:4000/logout';

	try {
		const response = await fetch(URL, {
			method: 'DELETE',
			body: JSON.stringify(),
			headers: {
				'Content-Type': 'application/json',
				Authorization: localStorage.getItem('token'),
			},
		});
		const json = await response.json();
		if (response.ok) {
			console.log(json);
		} else {
			console.warn(json);
		}
	} catch (error) {
		console.log(error.message);
	}
};
