export default function authorsListFilter(authorsList, course, options = {}) {
	return options.inverse
		? authorsList.filter((author) => !course.authors.includes(author.id))
		: authorsList.filter((author) => course.authors.includes(author.id));
}
