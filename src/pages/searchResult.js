import React from 'react'
import Navbar from '../components/navbar'
import SearchResults from '../components/home/searchResult'
import Footer from '../components/footer'
const SearchResult = () => {
    return (
        <div>
            <Navbar />
            <div className="mx-auto w-full">
                <SearchResults/>
            </div>
            <Footer />
        </div>
    )
}
export default SearchResult;