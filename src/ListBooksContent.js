import React from 'react'
import './App.css'
import Books from './Books'

class ListBooksContent extends React.Component{    

    render(){
        return (
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>                  
                    {/* {console.log(this.props.books)} */}
                    <Books onChangeShelf={this.props.onChangeShelf} books={this.props.books.filter(book=>book.shelf==='currentlyReading')} />                                         
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <Books onChangeShelf={this.props.onChangeShelf} books={this.props.books.filter(book=>book.shelf==='wantToRead')} />                                       
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <Books onChangeShelf={this.props.onChangeShelf} books={this.props.books.filter(book=>book.shelf==='read')} />                                       
                </div>
              </div>
            </div>
        )
    }
}

export default ListBooksContent