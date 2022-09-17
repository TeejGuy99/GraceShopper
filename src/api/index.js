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

export async function getUserInfo(userID) {
	try {
		return fetch(`${BASE_URL}/user/${userID}`, {
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

export async function logInUser( username, password ) {
	try {
		return fetch(`${BASE_URL}/user/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: username,
				password: password
			}),
		})
			.then((response) => response.json())
			.then((result) => {
				localStorage.setItem("token", result.token);
				return result;
			});
	} catch (error) {
		console.error(error);
	}
}

export async function registerUser( username, password ) {
	try {
		return fetch(`${BASE_URL}/user/register`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: username,
				password: password,
			}),
		})
			.then((response) => response.json())
			.then((result) => {
				return result;
			});
	} catch (error) {
		console.error(error);
	}
}

export async function getAllProducts() {
	try {
		return fetch(`${BASE_URL}/product`, {
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

export async function getSingleProduct( productID ) {
	try {
		return await fetch(`${BASE_URL}/product/${productID}`, {
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

export async function createNewProduct({
	token,
	name,
	description,
	price,
	quantity,
	category,
}) {
	try {
		return fetch(`${BASE_URL}/product`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				name: name,
				description: description,
				price: price,
				quantity: quantity,
				category: category,
			}),
		})
			.then((response) => response.json())
			.then((result) => {
				return result;
			});
	} catch (error) {
		console.error(error);
	}
}

export async function deleteProduct({ token, productID }) {
	try {
		return fetch(`${BASE_URL}/product/${productID}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
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

export async function getAllProductPhotos() {
	try {
		return await fetch(`${BASE_URL}/photo`, {
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

export async function getReviews() {
	try {
		return await fetch(`${BASE_URL}/review`, {
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

export async function getAllOrders() {
	try {
		return await fetch(`${BASE_URL}/order`, {
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

export async function getOrderInfo({ token, orderID }) {
	try {
		return await fetch(`${BASE_URL}/order/${orderID}`, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
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

export async function getAllCarts() {
	try {
		return await fetch(`${BASE_URL}/cart`, {
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

export async function getAllGuests() {
	try {
		return await fetch(`${BASE_URL}/guest`, {
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

export async function getGuest({ token, guestID }) {
	try {
		return await fetch(`${BASE_URL}/guest/${guestID}`, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
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

export async function makeUserAdmin( userID ) {
	try {
		return fetch(`${BASE_URL}/user/makeAdmin/${userID}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				userID: userID
			}),
		})
			.then((response) => response.json())
			.then((result) => {
				return result;
			});
	} catch (error) {
		console.error(error);
	}
}