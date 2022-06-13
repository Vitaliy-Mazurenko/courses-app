export default function formDate(iDate) {
	const splitDate = iDate.split('/');
	const createDate = splitDate.map((num) => {
		if (num.length < 2) {
			return '0' + num;
		} else {
			return num;
		}
	});
	return createDate.toString().replace(new RegExp(',', 'g'), '.');
}
