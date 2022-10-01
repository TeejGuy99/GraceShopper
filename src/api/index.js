export const BASE_URL = "http://localhost:4000/api";

export const logIn = (token, username) => {
    localStorage.setItem('token', token)
    localStorage.setItem('username', username)
}

export const logOut = () => {
    localStorage.setItem('token', null)
    localStorage.setItem('username', null)
	localStorage.setItem('userid', null)
}


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
		return await fetch(`${BASE_URL}/user/${userID}`, {
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

export async function getSingleProduct({ productID }) {
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

export async function createNewProduct(
	token,
	name,
	description,
	price,
	quantity,
	category,
) {
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
				qtyAvailable: quantity,
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

export async function deleteProduct( token, productID ) {
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

export async function getUserOrders(userId) {
	try {
		return await fetch(`${BASE_URL}/order/user/${userId}`, {
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

export async function getUserCart({token, userID, guestID}) {
	try {
		let headers = {}
		if (token) {
			headers = {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			}

			return await fetch(`${BASE_URL}/cart/userId/${userID}`, {
				headers: headers
			})
				.then((response) => response.json())
				.then((result) => {
					let total = 0;
					for (let i=0; i<result.length; i++) {
						total += result[i].productQty
					}
					result.total = total
					return result;
				});
		} else {
			headers = {
				"Content-Type": "application/json",
			}

			return await fetch(`${BASE_URL}/cart/guestId/${guestID}`, {
				headers: headers
			})
				.then((response) => response.json())
				.then((result) => {
					let total = 0;
					for (let i=0; i<result.length; i++) {
						total += result[i].productQty
					}
					result.total = total
					return result;
				});
		}
		
	} catch (error) {
		console.error(error);
	}
}

export async function deleteCartItem(cartID) {
	try {
		return fetch(`${BASE_URL}/cart/${cartID}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((result) => {
				return result;
			});
	} catch (error) {
		console.error(error)
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

export async function getGuest( guestID ) {
	try {
		return await fetch(`${BASE_URL}/guest/${guestID}`, {
			headers: {
				"Content-Type": "application/json"
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

export async function removeUserAdmin( userID ) {
	try {
		return fetch(`${BASE_URL}/user/removeAdmin/${userID}`, {
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

export async function addToCart(productId, productQty, cartUserId, cartGuestId ) {
	try { 
		return fetch(`${BASE_URL}/cart`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				productId: productId,
				productQty: productQty,
				cartUserId: cartUserId,
				cartGuestId: cartGuestId
			}),
		})
			.then((response) => response.json())
			.then((result) => {
				return result;
			})

	} catch (error) {
		console.error(error)
	}
}

export async function getWaxMelts() {
	try {
		return fetch(`${BASE_URL}/product/?category=Wax%20Melt`, {
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

export async function getCandles() {
	try {
		return fetch(`${BASE_URL}/product/?category=Candle`, {
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

export async function getCategory(category) {
	try {
		return fetch(`${BASE_URL}/product/?category=${category}`, {
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

export async function updateCart(cartId, productQty) {
	try {
		return fetch(`${BASE_URL}/cart/${cartId}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				productQty: productQty
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

export async function createOrder(userId, guestId) {
	try {
		return fetch(`${BASE_URL}/order`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				isUserId: userId,
				isGuestId: guestId
			}),
		})
			.then((response) => response.json())
			.then((result) => {
				return result;
			});
	} catch (error) {
		console.error(error)
	}
}

export async function adminEditProduct(productId, productName, productDescription, productPrice, productQtyAvailable, productCategory) {
	try {
		return fetch(`${BASE_URL}/product/${productId}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name: productName,
				description: productDescription,
				price: productPrice,
				qtyAvailable: productQtyAvailable,
				category: productCategory
			}),
		})
			.then((response) => response.json())
			.then((result) => {
				return result;
			});
	} catch (error) {
		console.error(error)
	}
}

export async function adminEditProductPhoto(photoId, photoDescription, photoLink, productId) {
	try {
		return fetch(`${BASE_URL}/photo/${photoId}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				description: photoDescription,
				link: photoLink,
				productId: productId,
			}),
		})
			.then((response) => response.json())
			.then((result) => {
				return result;
			});
	} catch (error) {
		console.error(error)
	}
}

export async function adminCreatePhoto(photoDescription, photoLink, productId) {
	try {
		return fetch(`${BASE_URL}/photo`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				description: photoDescription,
				link: photoLink,
				productId: productId,
			}),
		})
			.then((response) => response.json())
			.then((result) => {
				return result;
			});
	} catch (error) {
		console.error(error)
	}
}