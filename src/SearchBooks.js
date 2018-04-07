import React from 'react';
//import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import sortBy from 'sort-by'
import * as BooksAPI from './BooksAPI'
import './App.css';
import Books from './Books'
import * as _ from 'lodash'

class SearchBooks extends React.Component {

  static propTypes = {
    //showingSearchBook: PropTypes.array.isRequired
    //onDeleteContact: PropTypes.func.isRequired
  }  

  state = {
    searchBooks:[]
  }

  updateQuery = _.debounce((query) => {
    //const searchItems = ['Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production', 'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS']   
    let self = this    
    const len = this.props.books.length;
    if(query){
      //get book data
      BooksAPI.search(query).then(function(books){
        if(Array.isArray(books)){
          books = books.map((book)=>{
            var b = book
            var onShelf = false
            for(var i = 0 ; i < len; i++){
              if(book.id === self.props.books[i].id){
                b = self.props.books[i]
                onShelf = true
              }
             }
             if(!onShelf){
               b.shelf = 'none'
             }
             return b
          })
          console.log(books)
          books.sort(sortBy('title'))
          self.setState({searchBooks:books})
        }else{
          alert("请输入限定关键词")
        }    
      }).catch((e)=>{
        console.log(e)
      })
    }else{
      this.setState({searchBooks:[]})
    }
  },400)
 
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
            <Books onChangeShelf={this.props.onChangeShelf} books={this.state.searchBooks} />                                         
            </div>
          </div>
         );
    }
}

export default SearchBooks