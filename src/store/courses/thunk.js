import {
	coursesListFetch,
	courseFetch,
	deleteCourse,
	updateCourseFetch,
} from '../../services';
import { setCourses, addCourses, updateCourse } from './actionCreators';

export const getCoursesList = () => {
	return async (dispatch) => {
		const response = await coursesListFetch();
		dispatch(setCourses(response.data.result));
	};
};

export const thunkCourseAdd = async (dispatch, newCourse) => {
	try {
		const response = await courseFetch(newCourse);
		dispatch(addCourses(response.result));
	} catch (error) {
		console.warn(error.message);
	}
};

export const thunkCourseDel = async (id) => {
	try {
		const response = await deleteCourse(id);
		return response.result;
	} catch (error) {
		console.warn(error.message);
	}
};

export const thunkCourseUpdate = async (dispatch, id, course) => {
	try {
		const response = await updateCourseFetch(id, course);
		if (response) {
			dispatch(updateCourse(response.result));
		}
	} catch (error) {
		console.warn(error.message);
	}
};
