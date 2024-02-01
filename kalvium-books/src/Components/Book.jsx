import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Book.css"
import Logo from '../assets/logoo.png';
import { Link } from "react-router-dom";

const HomePage = ({ searchInput, handleInputChange }) => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    axios
      .get('https://reactnd-books-api.udacity.com/books', {
        headers: {
          Authorization: 'whatever-you-want',
        },
      })
      .then((res) => {
        const filteredBooks = res.data.books.filter((book) => {
          const title = book.title || ''; 
          return title.toLowerCase().includes((searchInput || '').toLowerCase());
        });
        setBooks(filteredBooks);
      })
      .catch((err) => console.log(err));
  }, [searchInput]);

  const hover = (book) => {
    setSelectedBook(book);
    const wrappers = document.getElementsByClassName('wrapper')
    if (wrappers.length > 0) {
      wrappers[0].style.opacity = '0.5';
    }
    window.scrollTo({
      top: 180,
      behavior: 'smooth'
    });
  };

  const closeDescription = () => {
    setSelectedBook(null);
    const wrappers = document.getElementsByClassName('wrapper')
    if (wrappers.length > 0) {
      wrappers[0].style.opacity = '1';
    }
  };

  return (
    <div>
      <nav>
                <img src={Logo} alt="logo"></img>
                <input className="input" type="text" value={searchInput} onChange={handleInputChange} placeholder="Search For a Book.. 📕"></input>
                <button className="button"><Link className="Link" to='/form'>Register</Link></button>
            </nav>
      {books.length > 0 ? (
        <div className='wrapper'>
        {books.map((book) => (
          <div className='book' onClick={() => hover(book)} key={book.id}>
            <div>
            <img className='book-img' src={book.imageLinks.thumbnail} alt={book.title} />
            <div>
              <h2>{book.title}</h2>
              <h3>{book.subtitle}</h3>
              <br />
              <p>Author: {book.authors}</p>
              <div>Ratings: {book.averageRating ? <span>{book.averageRating}⭐️</span> : 'No ratings yet'}</div>
              <h2>Free</h2>
            </div>
            </div>
          </div>
        ))}
      </div>
      ) : (<div className='wrapper'><p id='p'>No Books Avaliable</p></div>)}
      
      {selectedBook && (
        <div className="description-overlay" onClick={closeDescription}>
          <div className="description-container">
            <h2>{selectedBook.title}</h2>
            {selectedBook.subtitle && <h3>{selectedBook.subtitle}</h3>}
            <br/>
            <p>{selectedBook.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;

