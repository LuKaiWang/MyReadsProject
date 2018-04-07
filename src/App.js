import React from 'react';
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI';
import SearchBooks from './SearchBooks'
import ListBooksContent from './ListBooksContent'
import './App.css'


class BooksApp extends React.Component {

  state = {    
    books:[]
  }

  componentDidMount(){
    BooksAPI.getAll().then((books) => {
      this.setState({books})
    })
  }
  
  //更改book状态
  changeShelf = (book,shelf)=> {
    BooksAPI.update(book,shelf).then(
        this.setState((state)=>{
          if (book.shelf==='none') {
            let bo = book
            bo.shelf = shelf
            state.books.push(bo)
          } else {
            state.books.map((bo) => {
              if(bo===book){
                book.shelf = shelf
              }
              return bo
            }) 
          }
        })
    )
  }

  render() {
    return (
      <div className="app">
      <Route exact path="/" render={()=>(
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
        <ListBooksContent onChangeShelf={this.changeShelf} books={this.state.books}/>   
          <div className="open-search">
            <Link to="/search">Add a book</Link>
         </div>
      </div>
      )}/>
      <Route exact path="/search" render={()=>(
        <SearchBooks onChangeShelf={this.changeShelf} books={this.state.books}/>
      )}/>
      </div>
    )
  }
}

export default BooksApp
