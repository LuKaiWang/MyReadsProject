import React from 'react';
//import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
//import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import * as BooksAPI from './BooksAPI'
import './App.css';

class SearchBooks extends React.Component {

  static propTypes = {
    //showingSearchBook: PropTypes.array.isRequired
    //onDeleteContact: PropTypes.func.isRequired
  }  

  state = {
    searchBooks:[]
  }

  simpleBook(book){
    return {title:book.title,
            authors:book.authors,
            thumbnail:book.imageLinks.thumbnail,
            shelf:"none",
            id:book.industryIdentifiers[0].identifier}
  }

  updateQuery = (query) => {
    //const searchItems = ['Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production', 'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS']   
    let len = this.props.books.length;
    if(query){
      //show suggest searchItem
      
      //get book data
      BooksAPI.search(query).then((books)=>{ 
        books = books.map(this.simpleBook)
        books = books.map((book)=>{
          var b = book
          for(var i = 0 ; i < len; i++){
            if(book.id === this.props.books[i].id){
              b = this.props.books[i]
            }
           }
           return b
        })        
        console.log(books)
        books.sort(sortBy('title'))
        this.setState({searchBooks:books})
      }).catch((e)=>{
        console.log(e)
      })
    }else{
      this.setState({searchBooks:[]})
    }
  }

     render(){        
      //showingSearchBooks.sort(sortBy('name'))
        return (
            <div className="search-books">
            <div className="search-books-bar">
              <Link to="/" className="close-search">Close</Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text"
                 id="searchQuery"
                 placeholder="Search by title or author"
                 onChange={(event) => this.updateQuery(event.target.value)}/>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">    
              {this.state.searchBooks.map((book)=>{return(
                        <li key={book.id}>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: "url('"+book.thumbnail+"')" }}></div>
                            <div className="book-shelf-changer">
                              <select value={book.shelf} onChange={(e)=>this.props.onChangeShelf(book,e.target.value)}>
                                <option value="Move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{book.title}</div>
                          <div className="book-authors">{book.authors}</div>
                        </div>
                      </li>
                    )})}            
              </ol>
            </div>
          </div>
         );
    }
}

export default SearchBooks