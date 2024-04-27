import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { legacy_createStore as createStore } from 'redux';

import { rootReducer } from '../store';

const testStore = createStore(rootReducer);

export const renderWithRouterAndStore = (
	ui,
	{ route = '/', store = testStore, ...renderOptions } = {}
) => {
	window.history.pushState({}, 'Test page', route);

	const Wrapper = ({ children }) => {
		return (
			<Router>
				<Provider store={store}>{children}</Provider>
			</Router>
		);
	};
	return render(ui, { wrapper: Wrapper, ...renderOptions });
};
