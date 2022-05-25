import * as actions from './actionTypes';
export const set = () => ({ type: actions.SET_COURSES });
export const add = () => ({ type: actions.ADD_COURSES });
export const del = () => ({ type: actions.DEL_COURSES });

// export const rnd = () => {
// 	return {
// 		type: 'RND',
// 		payload: Math.floor(Math.random() * 10),
// 	};
// };
