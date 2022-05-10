export const newID = () => {
	const idString: string =
		Math.random().toString(36).substring(2, 10) +
		new Date().getTime().toString(36);
	const length = Math.ceil(idString.length / 4);
	const pattern = new RegExp(".{1," + length + "}", "ig");
	return (
		idString
			.match(pattern)
			?.map(item => item.padEnd(length, "."))
			.join("-") || ""
	);
};
