export const thunkAction = async (newCourse) => {
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
		} else {
			console.warn(json);
		}
	} catch (error) {
		console.warn(error.message);
	}
};
