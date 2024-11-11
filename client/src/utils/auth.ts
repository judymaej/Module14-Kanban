import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  // Retrieve the profile information from the decoded token
  getProfile() {
    const token = this.getToken();
    return token ? jwtDecode<JwtPayload>(token) : null;
  }

  // Check if the user is logged in by verifying the presence of a valid token
  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  // Check if the token has expired by comparing the expiration time with the current time
  isTokenExpired(token: string) {
    const decoded = jwtDecode<JwtPayload>(token);
    if (decoded && decoded.exp) {
      // Convert expiration time from seconds to milliseconds
      const expirationTime = decoded.exp * 1000;
      return Date.now() > expirationTime;
    }
    return true;
  }

  // Retrieve the JWT token from localStorage
  getToken(): string | null {
    return localStorage.getItem('jwt');
  }

  // Set the JWT token in localStorage and redirect to the home page
  login(idToken: string) {
    localStorage.setItem('jwt', idToken);
    window.location.assign('/'); // Redirect to home page
  }

  // Remove the JWT token from localStorage and redirect to the login page
  logout() {
    localStorage.removeItem('jwt');
    window.location.assign('/login'); // Redirect to login page
  }
}

export default new AuthService();

