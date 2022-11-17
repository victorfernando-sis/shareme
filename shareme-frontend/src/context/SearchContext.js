import { createContext, useState, useEffect } from "react";
import { client } from "../client";
import { Search } from "../components";
import { feedQuery, searchQuery } from "../utils/data";

const SearchContext = createContext()

export function SearchProvider({ children }) {
    const [searchTerm, setSearchTerm] = useState('')
    const [pins, setPins] = useState(null)
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        if (searchTerm) {
            setLoading(true)
            const query = searchQuery(searchTerm.toLowerCase())
            client.fetch(query)
                .then(data => {
                    setPins(data)
                    setLoading(false)
                })
        } else {
            client.fetch(feedQuery)
                .then(data => {
                    setPins(data)
                    setLoading(false)
                })
        }
    }, [searchTerm])

    return (
        <SearchContext.Provider value={{ pins, loading, searchTerm, setSearchTerm }}>
            {children}
        </SearchContext.Provider>
    )
}

export default SearchContext