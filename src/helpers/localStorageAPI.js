export const localStorageAPI = {
	setToken(token) {
		return localStorage.setItem('token', token);
	},
	getUserToken() {
		return localStorage.getItem('token');
	},
	clear() {
		return localStorage.clear();
	},
};
