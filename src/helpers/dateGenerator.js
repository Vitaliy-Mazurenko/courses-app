export default function dateGenerator(d) {
	return d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
}
