export default function courseAuthorNames(course, authorsList) {
	return authorsList
		.filter((item) => course.authors.includes(item.id))
		.map((item) => ' ' + item.name)
		.toString();
}
