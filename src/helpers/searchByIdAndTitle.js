export default function searchByIdAndTitle(arr, value) {
	return arr.filter(
		(el) =>
			el.id === value || el.title.toLowerCase().includes(value.toLowerCase())
	);
}
