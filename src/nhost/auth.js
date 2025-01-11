export class AuthService {
  async createAccount({ username, email, password }) {
    try {
      const userCred = await nhost.auth.signUp({
        email: email,
        password: password,
        options: {
          userData: {
            username: username, // Adding custom username field
          },
        },
      });
      if (userCred) {
        return userCred;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      const { session, error } = await nhost.auth.signIn({
        email: email,
        password: password,
      });

      if (error) {
        console.error("Sign in error:", error);
      } else {
        console.log("Signed in user:", session.user);
        console.log("Access token:", session.accessToken);
        console.log("Refresh token:", session.refreshToken);
        return session;
      }
    } catch (error) {
      throw error;
    }
  }

  async logout() {
    try {
      const { error } = await nhost.auth.signOut();
      if (error) {
        console.error("Sign out error:", error);
      } else {
        console.log("Successfully signed out");
      }
    } catch (error) {
      throw error;
    }
  }
  
  async getCurrentUser(){
    const user = nhost.auth.getUser()
    if (user) {
      console.log('Current user:', user)
      const userData = {
        id: user.id,
        email: user.email,
        username: user.displayName,
        emailVerified: user.emailVerified, 
      }
      return userData
    } else {
      console.log('No user is currently signed in.')
      return null
    }

  }
}

const authService = new AuthService();

export default authService;
