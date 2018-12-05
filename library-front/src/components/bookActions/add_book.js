import React from 'react';
import './book_style.css';
import { BContext } from '../../contexts/context_book';

export default class AddBook extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <BContext.Consumer>
        {
          ({ book, addBook }) =>
            <Book
              this.state.books,
              
             
            />}
      </BContext.Consumer >
    )
  }
};

class Book extends React.Component {
  constructor() {
    super();

    this.state = {
      title: '',
      body: '',
      attemptFailed: false
    };
  }

  componentWillMount() {
    const { book } = this.props;

    if (book) {
      const { id, title, body } = book;

      this.setState({
        id: id,
        title: title,
        body: body,
      });
    }
  }

  changeState = e => {
    const { value, name } = e.target;
    this.setState({
      [name]: value
    });
  }

  submit = async (e) => {
    e.preventDefault();
    const { addBook } = this.props;
    const result = await addBook(this.state);

    if (!result) {
      this.setState({ isFailed: true });
    }
  }

  render() {
    const { book } = this.props;
    const { title, body } = this.state;
   
    const isChanged    = book ? true : false;

    return (
      <form onSubmit={(e) => this.submit(e)}>
        <div className="book">
          <div className="book-label">
            <div>
              <label>Title</label><br />
              <input type="text" name="title" value={title} onChange={this.changeState} disabled={isChanged} />
            </div>
            
            
            
          </div>
          <div className="desc">
            <label>Description</label><br />
            <textarea className="desc" type="text" name="description" value={body} onChange={this.changeState} disabled={isChanged} /><br />
          </div>
          {}
          <input type="submit" value="Create" />
        </div>
      </form>
    );
  }
};