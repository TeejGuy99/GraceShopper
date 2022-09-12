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

export async function logInUser({ username, password }) {
	try {
		return fetch(`${BASE_URL}/user/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username: username,
				password: password,
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

export async function registerUser({ username, password }) {
	try {
		return fetch(`${BASE_URL}/user/register`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username: username,
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