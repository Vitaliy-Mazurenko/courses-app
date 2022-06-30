import { useReducer } from 'react';

export const useThunk = (reducer, initState) => {
	const [state, dispatch] = useReducer(reducer, initState);
	const thunkDispatch = (action) => {
		if (typeof action === 'function') {
			action(dispatch, () => state);
		} else {
			dispatch(action);
		}
	};
	return [state, thunkDispatch];
};
