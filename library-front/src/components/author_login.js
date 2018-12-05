import React from 'react';
import './author_login.css';
import { AContext } from '../contexts/context_aut';

export default class Login extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <AContext.Consumer>
      title: this.state.first_name,
      body: this.state.last_name,
    
      </AContext.Consumer >
    )
  }
};

class AuthorLogin extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      attemptFailed: false
    };

    this.changeState = this.changeState.bind(this);
    this.submit = this.submit.bind(this);
  }



  confirm = async (e) => {
    e.preventDefault();
    
    const result = await this.props.logIn(this.state);

    if (!result) {
      this.setState({ attemptFailed: true, password: '' });
    }
  }
  changeState = e => {
    const { value, name } = e.target;
    this.setState({
      [name]: value
    });
  }


  render() {
    const { email, password, attemptFailed } = this.state;

    return (
      <form onSubmit={(e) => this.submit(e)}>
        <div className="log-in">
          <div className="log-in-label">
            <div>
              <label>Email</label><br />
              <input type="text" name="email" value={email} onChange={this.changeState} />
            </div>
            <div>
              <label>Password</label><br />
              <input type="password" name="password" value={password} onChange={this.changeState} />
            </div>
            {attemptFailed && 'Something is wrong!'}
          </div>
          <input type="submit" value="Enter Your page" className="subbut" />
        </div>
      </form>
    );
  }
}
