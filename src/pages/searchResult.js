import React from 'react'
import Navbar from '../components/navbar'
import SearchResults from '../components/home/searchResult'
const SearchResult = () => {
    return (
        <div>
            <Navbar />
            <div className="mx-auto w-full">
                <SearchResults/>
            </div>
        </div>
    )
}
export default SearchResult;