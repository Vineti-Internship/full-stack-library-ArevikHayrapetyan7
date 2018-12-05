export default class Authen {

  static isAuthenticated(){
        return sessionStorage.getItem('token') !== null;
  }

  static authenticateToken(token){
      sessionStorage.setItem('token', token);
  }

  static deauthenticateToken(){
      sessionStorage.removeItem('token');
  }

  static getToken(){
      return sessionStorage.getItem('token');
  }
}