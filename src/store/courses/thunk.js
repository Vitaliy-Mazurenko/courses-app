import {
	coursesListFetch,
	courseFetch,
	deleteCourse,
	updateCourseFetch,
} from '../../services';
import {
	setCourses,
	addCourses,
	updateCourse,
	delCourses,
} from './actionCreators';

export const getCoursesList = () => async (dispatch) => {
	const response = await coursesListFetch();
	if (response) {
		dispatch(setCourses(response.data.result));
	}
};

export const thunkCourseAdd = (newCourse) => async (dispatch) => {
	const response = await courseFetch(newCourse);
	if (response) {
		dispatch(addCourses(response.result));
	}
};

export const thunkCourseDel = (id) => async (dispatch) => {
	const response = await deleteCourse(id);
	if (response) {
		dispatch(delCourses(id));
	}
};

export const thunkCourseUpdate = (id, course) => async (dispatch) => {
	const response = await updateCourseFetch(id, course);
	if (response) {
		dispatch(updateCourse(response.result));
	}
};
