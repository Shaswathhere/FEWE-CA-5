import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Book from './Components/Book'
import './App.css'
import AllRoutes from './AllRoutes';

const App = () => {
  const [searchInput, setSearchInput] = useState('');

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };
  return (
    <>
      <BrowserRouter>
        {/* <Book searchInput={searchInput} handleInputChange={handleInputChange}/> */}
        <AllRoutes/>
      </BrowserRouter>
    </>
  );
};

export default App;
