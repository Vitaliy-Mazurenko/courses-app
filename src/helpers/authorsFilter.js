export default function authorsFilter(authors, authorId, options = null) {
	return options
		? authors.filter((id) => id !== authorId)
		: authors.filter((author) => author.id === authorId);
}
