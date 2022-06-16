import { URL } from '../../constants';
export const thunkActionAdd = async (newCourse) => {
	try {
		const response = await fetch(`${URL}courses/add`, {
			method: 'POST',
			body: JSON.stringify(newCourse),
			headers: {
				'Content-Type': 'application/json',
				Authorization: localStorage.getItem('token'),
			},
		});
		const json = await response.json();
		if (response.ok) {
			return json.result;
		} else {
			console.warn(json);
		}
	} catch (error) {
		console.warn(error.message);
	}
};

export const thunkActionDel = async (id) => {
	try {
		const response = await fetch(`${URL}courses/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: localStorage.getItem('token'),
			},
		});
		const json = await response.json();
		if (response.ok) {
			return json.result;
		} else {
			console.log(json);
		}
	} catch (error) {
		console.warn(error.message);
	}
};

export const thunkActionUpdate = async (id, updateCourse) => {
	try {
		const response = await fetch(`${URL}courses/${id}`, {
			method: 'PUT',
			body: JSON.stringify(updateCourse),
			headers: {
				'Content-Type': 'application/json',
				Authorization: localStorage.getItem('token'),
			},
		});
		const json = await response.json();
		if (response.ok) {
			return json.result;
		} else {
			console.log(json);
		}
	} catch (error) {
		console.warn(error.message);
	}
};
