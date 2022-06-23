export default function coursesFind(coursesList, params) {
	return coursesList.find((course) => course.id.includes(params.id));
}
