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

  simpleBook(book){
    return {title:book.title,
            authors:book.authors,
            thumbnail:book.imageLinks.thumbnail,
            shelf:book.shelf,
            id:book.industryIdentifiers[0].identifier}
  }

  componentDidMount(){
    BooksAPI.getAll().then((initBooks) => {
      this.setState({ books: initBooks.map(this.simpleBook)})
    })
  }
  
  //更新book状态
  modifyShelf = (title,value)=> {
    this.setState((state)=>({
      books:state.books.map((book) => {
        if(book.title===title){
          book.shelf = value
        }
        return book
      }) 
    }))
  }

  //从搜索结果中添加书籍并更新状态
  addOrModifyShelf = (bo,shelf)=> {
    BooksAPI.update(bo,shelf).then((data) =>{ 
      console.log(data) 
      return data.books} 
    ).then((initBooks) => {
      //this.setState({ books: initBooks.map(this.simpleBook)})
    })
    //add new
    if(bo.shelf==="none"){
      bo.shelf = shelf;      
      this.setState((state)=>{
       var newBooks = state.books
        newBooks.push(bo)
        return newBooks        
      })
    }else{
      this.setState((state)=>({
        books:state.books.map((book) => {
          if(book.id===bo.id){
            book.shelf = shelf
          }
          return book
        }) 
      }))
    }
  }

  render() {
    return (
      <div className="app">
      <Route exact path="/" render={()=>(
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
        <ListBooksContent onChangeShelf={this.modifyShelf} books={this.state.books}/>   
          <div className="open-search">
            <Link to="/search">Add a book</Link>
         </div>
      </div>
      )}/>
      <Route exact path="/search" render={()=>(
        <SearchBooks onChangeShelf={this.addOrModifyShelf} books={this.state.books}/>
      )}/>
      </div>
    )
  }
}

export default BooksApp
