export default function pipeDuration(duration) {
	return (
		(duration < 600 ? '0' : '') +
		Math.trunc(duration / 60) +
		':' +
		(duration % 60 < 10 ? '0' : '') +
		(duration % 60)
	);
}
