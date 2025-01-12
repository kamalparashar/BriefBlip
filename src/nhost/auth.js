import nhost from "./nhost.js"

export class AuthService {
  async createAccount({ username, email, password }) {
    try {
      const userCred = await nhost.auth.signUp({
        email: email,
        password: password,
        options: {
          metadata: {
            displayName: username, // Adding custom username field
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
