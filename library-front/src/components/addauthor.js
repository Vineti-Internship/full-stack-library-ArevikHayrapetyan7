import React from 'react';
import { AContext } from '../contexts/context_aut';
import './add_author.css';

export default class Add extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <AContext.Consumer>
      
            name: this.state.name,
            surname: this.state.surname,
            password: this.state.password,
            email: this.state.email
      </AContext.Consumer >
    )
  }
};

class AddAuthor extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      surname: '',
      email: '',
      password: '',
     res:null,
    };

    this.changeState = this.changeState.bind(this);
    this.submit = this.submit.bind(this);
  }


  submit = async (e) => {
    e.preventDefault();
    const { testPassword, AddAuthor } = this.props;
    const { password, password_confirmation } = this.state;
    const res = testPassword(password, password_confirmation);

    if (res !== null) {
      this.setState({ password: '', password_confirmation: '', res });
      return;
    }
    const final = await AddAuthor(this.state);

    if (!final) {
      this.setState({ password: '', password_confirmation: '', res: 'Failed! ' });
    }
  }
  changeState = e => {
    const { value, name } = e.target;
    this.setState({
      [name]: value
    });
  }

  render() {
    const { name, surname, email, password, password_confirmation, res } = this.state;

    return (
      <form onSubmit={(e) => this.submit(e)} className="addauthor">
        <div className="sign-in">
          <div className="sing-in-label">
            <div>
              <label>Name</label><br />
              <input type="text" name="name" value={name} onChange={this.changeState} />
            </div>
            <div>
              <label>Surname</label><br />
              <input type="text" name="surname" value={surname} onChange={this.changeState} />
            </div>
            <div>
              <label>Email</label><br />
              <input type="text" name="email" value={email} onChange={this.changeState} />
            </div>
            <div>
              <label>Password</label><br />
              <input type="password" name="password" value={password} onChange={this.changeState} />
            </div>
            <div>
              <label>Password Confirmation</label><br />
              <input type="password" name="password_confirmation" value={password_confirmation} onChange={this.changeState} />
            </div>
            {res && <label>{res}</label>}
          </div>
          <input type="submit" value="Add" className="subbut" />
        </div>
      </form>
    );
  }
}