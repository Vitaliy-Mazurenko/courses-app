export const thunkActionAuthorAdd = async (newAuthor) => {
	const URL = 'http://localhost:4000/authors/add';

	try {
		const response = await fetch(URL, {
			method: 'POST',
			body: JSON.stringify({ name: newAuthor }),
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
