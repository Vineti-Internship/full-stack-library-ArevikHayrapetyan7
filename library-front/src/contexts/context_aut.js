import React from 'react';
import Authen from '../authen_helper';
import Req from '../helper_request';

export const AContext = React.createContext();

export class AuthorProvider extends React.Component {
  constructor() {
    super();
    this.getAuthor = this.getAuthor.bind(this);
    this.addAuthor = this.addAuthor.bind(this);
    this.AuthorSign = this.AutorSign.bind(this);
    this.authenticated = this.authenticated.bind(this);
    this.getAuthors = this.getAuthors.bind(this);
    this.testPassword = this.testPassword.bind(this);
  }

  state = {
    isAuthor: false,
    Authors: [],
    curAuthor: null,
    author: null
  }
  getAuthor = async (authorId) => {
    try {
      const result = await fetch(`/autors/${authorId}`);
      const author = await result.json();
      this.setState({ author });
    } catch (error) {
      console.log(`ERROR: ${error.message}`);
    }
  }


  AuthorSign = async (data) => {
    try {
      const result = await Req.post('/authors', data, 'author')
      const resJson = await result.json();
      if (result.ok) {
        Authen.authenticateToken(resJson.token);
        this.setState({ isAuthor: Authen.isAuthenticated() });
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(`ERROR: ${error.message}`);
    }
  }

  addAuthor = async (data) => {
    try {
      const result = await Req.post('/login', data);
      const resJson = await result.json();
      if (result.ok) {
        Authen.authenticateToken(resJson.token);
        this.setState({ isAuthor: Authen.isAuthenticated() });
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(`ERROR: ${error.message}`);
    }
  }
  authenticated = () => Authen.isAuthenticated();
  

  getAuthors = async () => {
    try {
      const result = await Req.get('/autors');
      const authors = await result.json();
      this.setState({ Authors: authors });
    } catch (error) {
      console.log(`ERROR: ${error.message}`);
    }
  }

  testPassword = (password, password_confirmation) => {
    if (password.length < 8) {
      return "Wrong numbers of Password"
    } else if (password !== password_confirmation) {
      return "Please try again"
    }

    return null;
  }

  render() {
    return (
      <AContext.Provider value={
        {
          name: this.state,nmae;
          surname: this,state,surname;
          password: this.state.password,
          authenticated: this.authenticated,
          AuthorSignin: this.AuthorDignin,
          addAuthor: this.addAuthor,
         
          getAuthor: this.getAuthor,
          getAuthors: this.getAuthors,
          testPassword: this.testPassword
        }
      }>
        {this.props.children}
      </AContext.Provider>
    )
  }
}