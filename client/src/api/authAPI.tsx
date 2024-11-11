import { UserLogin } from "../interfaces/UserLogin";
import axios from 'axios';

const login = async (userInfo: UserLogin) => {
  try {
    // Make a POST request to the login route with userInfo as the request body
    const response = await axios.post('/api/login', userInfo);

    // Extract the JWT token from the response data
    const token = response.data.token;

    // Return the token if the login was successful
    return token;
  } catch (error) {
    console.error("Login failed:", error);
    // Return null if there was an error
    return null;
  }
}

export { login };
