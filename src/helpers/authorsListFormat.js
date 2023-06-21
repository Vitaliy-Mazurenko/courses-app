export default function authorsListFormat(list, courseId) {
	return list.filter((item) => courseId.authors.includes(item.id));
}
