import React from 'react';
import { BContext } from '../../contexts/context_book';


export default class BookStorage extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <BContext.Consumer>
        {
          ({ getBooks, Books }) =>
            <BContext.Consumer
              {...this.props}
              getBooks={getBooks}
              Books={Books}
            />}
      </BContext.Consumer >
    )
  }
};

class SingleBook extends React.Component {

  render() {
    const { book: { id, title, body, author } } = this.props;
    const { name, surname } = author;

    return (
      <div>
        {
          id &&
          <div className="book-item">
            <h2>Book: {title} </h2>
            <div>
              <label>Author: {name} {surname}</label>
              <label>Description: {body}</label>
            </div>
          </div>
        }
      </div>
    );
  }
}


class BookStorePage extends React.Component {
  constructor() {
    super();
    this.state = {
      search: '',
      books: null
     
    }

    this.getStorage = this.getStorage.bind(this);
    this.changeState = this.changeState.bind(this);
  }

  componentDidMount() {
    this.getStorage();
  }

  async getStorage() {
    const { getBooks, Books } = this.props;
    await getBooks();
    this.setState({ books: Books });
  }

  changeState = e => {
    const { value, name } = e.target;
    this.setState({
      [name]: value
    });
  }

  render() {
    const { books, search } = this.state;

    const resOfSearch = search.length == 0 ?
      books
      :
      books.filter(
        (book) => {
          return book.title.toLowerCase().indexOf(search.toLowerCase()) !== -1;
        }
      );

    return (
      <div className="book-list">
        {
          books &&
          <div>
            <div>
              <span>Search Books</span>
              <input type="text" maxLength='10' name='search' onChange={this.changeState} value={search} />
            </div>
            {
              resOfSearch.map(book => <SingleBook {...{ book }} key={book.id} />)
            }
          </div>
        }
      </div>
    );
  }
}