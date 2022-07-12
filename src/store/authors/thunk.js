import { authorsListFetch, authorsFetch } from '../../services';
import { setAuthors, addAuthors } from './actionCreators';

export const getAuthorsList = () => async (dispatch) => {
	const response = await authorsListFetch();
	if (response) {
		dispatch(setAuthors(response.data.result));
	}
};

export const thunkAuthorAdd = (newAuthor) => async (dispatch) => {
	const response = await authorsFetch(newAuthor);
	if (response) {
		dispatch(addAuthors(response.result));
	}
};
