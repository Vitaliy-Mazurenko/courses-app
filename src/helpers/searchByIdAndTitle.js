export default function searchByIdAndTitle(arr, value) {
	const even = (element) => element.id === value;

	return arr.some(even)
		? arr.filter((course) => course.id.includes(value))
		: arr.filter((course) =>
				course.title.toLowerCase().includes(value.toLowerCase())
		  );
	// return arr.filter((el) => el.id.includes(value) || el.title.includes(value));
}
