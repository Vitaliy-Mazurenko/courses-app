import { combineReducers } from 'redux';
import { createStore, applyMiddleware } from 'redux';
import coursesReducer from './courses/reducer';
import authorsReducer from './authors/reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
	course: coursesReducer,
	author: authorsReducer,
});

export const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(thunk))
);
