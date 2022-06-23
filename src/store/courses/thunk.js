import { URL } from '../../constants';
import { getCoursesList } from '../../services';
import { addCourses } from './actionCreators';
import { coursesFetch } from '../../helpers/api';

export const thunkActionAdd = async (dispatch, newCourse) => {
	try {
		const response = await coursesFetch(newCourse);
		const json = await response.json();
		if (response.ok) {
			dispatch(addCourses(json.result));
		} else {
			console.warn(json);
		}
	} catch (error) {
		console.warn(error.message);
	}
};

export const thunkActionDel = async (id) => {
	try {
		const response = await fetch(`${URL}courses/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: localStorage.getItem('token'),
			},
		});
		const json = await response.json();
		if (response.ok) {
			return json.result;
		} else {
			console.log(json);
		}
	} catch (error) {
		console.warn(error.message);
	}
};

export const thunkActionUpdate = async (dispatch, id, updateCourse) => {
	try {
		const response = await fetch(`${URL}courses/${id}`, {
			method: 'PUT',
			body: JSON.stringify(updateCourse),
			headers: {
				'Content-Type': 'application/json',
				Authorization: localStorage.getItem('token'),
			},
		});
		const json = await response.json();
		if (response.ok) {
			dispatch(getCoursesList());
		} else {
			console.log(json);
		}
	} catch (error) {
		console.warn(error.message);
	}
};
