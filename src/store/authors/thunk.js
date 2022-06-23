import { authorsFetch } from '../../helpers/api';
export const thunkActionAuthorAdd = async (newAuthor) => {
	try {
		const response = await authorsFetch(newAuthor);
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
