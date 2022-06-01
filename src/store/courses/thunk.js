export const thunkActionAdd = async (newCourse) => {
	const URL = 'http://localhost:4000/courses/add';

	try {
		const response = await fetch(URL, {
			method: 'POST',
			body: JSON.stringify(newCourse),
			headers: {
				'Content-Type': 'application/json',
				Authorization: localStorage.getItem('token'),
			},
		});
		const json = await response.json();
		if (response.ok) {
			console.log(json);
			return json.result;
		} else {
			console.warn(json);
		}
	} catch (error) {
		console.warn(error.message);
	}
};

export const thunkActionDel = async (id) => {
	const URL = 'http://localhost:4000/courses/';

	try {
		const response = await fetch(`${URL}${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: localStorage.getItem('token'),
			},
		});
		const json = await response.json();
		if (response.ok) {
			console.log(json);
			return json.result;
		} else {
			console.warn(json);
		}
	} catch (error) {
		console.warn(error.message);
	}
};
