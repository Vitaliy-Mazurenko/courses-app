import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import { coursesActionCreators } from '../store/courses';
import { authorsActionCreators } from '../store/authors';
import { userActionCreators } from '../store/user';

const allActionCreators = {
	...authorsActionCreators,
	...coursesActionCreators,
	...userActionCreators,
};

export function useActions() {
	const dispatch = useDispatch();
	return Object.entries(allActionCreators).reduce(
		(acc, [name, action]) => ({
			...acc,
			[name]: bindActionCreators(action, dispatch),
		}),
		{}
	);
}
