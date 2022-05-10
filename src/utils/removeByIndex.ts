export function removeByIndex(arr: string[], value: string): string[] {
	const index = arr.indexOf(value);
	if (index > -1) {
		arr.splice(index, 1);
	}
	console.log("arr = ", arr);
	return arr;
}
