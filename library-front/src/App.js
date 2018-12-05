import React from 'react';
import { BrowserRouter, Redirect, Route, Link } from 'react-router-dom';
import './App.css';

import BookStorage from './components/bookActions/book_store';
import AddBook from './components/bookActions/add_book';
import AddAuthor from './components/addauthor';
import AuthorLogin from './components/author_login';
import Authen from './authen_helper';
import AuthorProvider from './contexts/context_aut'
class App extends React.Component {

  render() {
    const authenticated  = this.props;
    const isAuthor = authenticated();

    return (
      <BrowserRouter>
        <div className="App">
          <div className='header'>
            <Link to='/books' className="link">Books</Link>
            <Link to='/authors' className="link">Authors</Link>
            <div className="nav">
              {!isAuthor  && <Link to='/signin'>Sign In</Link>}
              {!isAuthor && <Link to='/login'>Log In</Link>}
              {isAuthor && <Link to='/book'>Create Book</Link>}
          
</div>
          </div>

          <Route exact path='/books' render={() => <BookStorage />} />
         
          <Route exact path='/book' component={AddBook} />
          <Route exact path='/book' component={AddBook} />
          <Route exact path='/' render={() => <Redirect to='/books' />} />
</div>
      </BrowserRouter>
    );
  }
}

export default App;

   