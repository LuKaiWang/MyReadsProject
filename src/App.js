import React from 'react';
import * as BooksAPI from './BooksAPI';
import SearchBooks from './SearchBooks'
import ListBooksContent from './ListBooksContent'
import './App.css'


class BooksApp extends React.Component {
  state = {
    
    books:[
      {
          "ISBN":"1593273894",
          "title":"The Linux Command Line",
          "backImg":"url('http://books.google.com/books/content?id=nggnmAEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api')",
          "author":"William E. Shotts, Jr.",
          "shelf":"currentlyReading"
      },
      {
          "ISBN":"1593273895",
          "title":"The Linux Command Line",
          "backImg":"url('http://books.google.com/books/content?id=nggnmAEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api')",
          "author":"William E. Shotts, Jr.",
          "shelf":"currentlyReading"
      },
      {
          "ISBN":"1593273896",
          "title":"2The Linux Command Line",
          "backImg":"url('http://books.google.com/books/content?id=nggnmAEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api')",
          "author":"William E. Shotts, Jr.",
          "shelf":"wantToRead"
      },
      {
          "ISBN":"1593273897",
          "title":"3The Linux Command Line",
          "backImg":"url('http://books.google.com/books/content?id=nggnmAEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api')",
          "author":"William E. Shotts, Jr.",
          "shelf":"read"
      }
  ],
    showSearchPage: false
  }

  
  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <SearchBooks/>  
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <ListBooksContent books={this.state.books}/>    
            {console.log(BooksAPI.getAll())}
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
