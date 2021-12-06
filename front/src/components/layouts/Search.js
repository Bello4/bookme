import React, { useState } from 'react'


import '../../App.css'

const Search = ({ history, searchBar  }) => {
    const [keyword, setKeyword] = useState('')

    const searchHandler = (e) => {
        e.preventDefault()

        if (keyword.trim()) {
            history.push(`/search/${keyword.toLowerCase()}`)
        } else {
           history.push('/')
        }
    }

    //const findWord = keyword.filter(word => word.name.toLowercase().includes(searchFields.toLowercase()))
   
    return (
        <form onSubmit={searchHandler}  className={searchBar ? "search-form" : "search-form active"}>
            <input type="search" name="" placeholder="search here..." id="searchBox" onChange={(e) => setKeyword(e.target.value)}/>
            <label htmlFor="searchBox" className="fas fa-search"></label>
        </form>
    )
}

export default Search
