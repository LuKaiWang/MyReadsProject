import React from 'react'
import './App.css'

class Books extends React.Component{

ImageThubnail(book){
  const thumbnail = book.imageLinks ? book.imageLinks.thumbnail : "http://books.google.com/books/content?id=h4FuBAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
  return thumbnail
}

render(){
        return (
                <ol className="books-grid">
                {this.props.books.map((book)=>{return( 
                  
                <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: "url('"+this.ImageThubnail(book)+"')" }}></div>
                    <div className="book-shelf-changer">
                      <select value={book.shelf}  onChange={(e)=>this.props.onChangeShelf(book,e.target.value)}>
                        <option value="no" disabled>Move to...</option>
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
            )}
    }

export default Books