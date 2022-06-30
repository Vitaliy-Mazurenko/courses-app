import { authorsListFetch, authorsFetch } from '../../services';
import { setAuthors } from './actionCreators';

export const getAuthorsList = () => {
	return async (dispatch) => {
		const response = await authorsListFetch();
		dispatch(setAuthors(response.data.result));
	};
};

export const thunkAuthorAdd = async (newAuthor) => {
	const response = await authorsFetch(newAuthor);
	if (response) {
		return response.result;
	}
};
