export const localStorageAPI = {
	setToken(token) {
		return localStorage.setItem('token', token);
	},
	setUser(token) {
		return localStorage.setItem('user', token);
	},
	getUserToken() {
		return localStorage.getItem('token');
	},
	clear() {
		return localStorage.clear();
	},
};
