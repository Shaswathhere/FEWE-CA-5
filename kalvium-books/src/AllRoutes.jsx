import React, {useState} from "react";
import {Route, Routes} from 'react-router-dom'
import Form from './Components/RegistrationForm'
import Book from './Components/Book'


const AllRoutes = () => {
    const [searchInput, setSearchInput] = useState('');

    const handleInputChange = (event) => {
    setSearchInput(event.target.value);
    };
    return(
        <>
            <Routes>
                <Route path="/" element={<Book searchInput={searchInput} handleInputChange={handleInputChange} />}></Route>
                <Route path="/form" element={<Form/>}></Route>
            </Routes>
        </>
    )
}

export default AllRoutes