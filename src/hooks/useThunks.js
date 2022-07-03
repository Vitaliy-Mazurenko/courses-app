import { useDispatch } from 'react-redux';
import { coursesThunk } from '../store/courses';
import { authorsThunk } from '../store/authors';
import { userThunk } from '../store/user';

const allThunks = {
	...authorsThunk,
	...coursesThunk,
	...userThunk,
};

export function useThunks() {
	const dispatch = useDispatch();
	return Object.entries(allThunks).reduce(
		(acc, [name, thunk]) => ({
			...acc,
			[name]: (...args) => dispatch(thunk(...args)),
		}),
		{}
	);
}
