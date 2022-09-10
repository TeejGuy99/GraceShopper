export const BASE_URL = "http://localhost:4000/api";

export async function getAllUsers() {
	try {
		return await fetch(`${BASE_URL}/user`, {
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((result) => {
				return result;
			});
	} catch (error) {
		console.error(error);
	}
}
