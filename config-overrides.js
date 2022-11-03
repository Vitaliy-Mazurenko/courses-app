const { alias } = require('react-app-rewire-alias');

module.exports = function override(config) {
	alias({
		'@Login': 'src/components/Login/Login',
		'@Header': 'src/components/Header/Header',
		'@Registration': 'src/components/Registration/Registration',
		'@Courses': 'src/components/Courses/Courses',
		'@CourseForm': 'src/components/CourseForm/CourseForm',
		'@CourseInfo': 'src/components/CourseInfo/CourseInfo',
		'@PrivateRouter': 'src/components/PrivateRouter/PrivateRouter',
	})(config);

	return config;
};
