import * as actions from './actionTypes';
// export const setAUTHOR = () => ({ type: actions.SET_AUTHORS });
// export const addAUTHOR = () => ({ type: actions.ADD_AUTHORS });

export const setAuthors = (payload) => ({ type: actions.SET_AUTHORS, payload });

export const addAuthors = (payload) => ({ type: actions.ADD_AUTHORS, payload });
