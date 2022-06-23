export default function authorsFilter(authors, e, options = {}) {
	return options.inverse
		? authors.filter((author) => author.id !== e.target.id)
		: authors.filter((author) => author.id === e.target.id);
}
