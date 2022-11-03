export const getCourses = (state) => state.courses;
export const getAuthors = (state) => state.authors;
export const getToken = (state) => state.user.token;
export const getUserName = (state) => state.user.name;
export const getRole = (state) => state.user.role;
export const getIsAuth = (state) => state.user.isAuth;
export const getAvailableAuthors = (courseAuthorsIDs) => (state) => {
	const authors = getAuthors(state);

	if (!courseAuthorsIDs.length) return authors;
	return authors.filter(
		(item) => !courseAuthorsIDs.some((id) => id === item.id)
	);
};
export const getCourseAuthors = (courseAuthorsIDs) => (state) => {
	const authors = getAuthors(state);

	return authors?.filter((item) =>
		courseAuthorsIDs.some((id) => id === item.id)
	);
};

export const getCourseById = (id) => (state) => {
	const courses = getCourses(state);

	return courses.find((item) => item.id === id);
};
