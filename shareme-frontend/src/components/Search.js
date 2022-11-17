import React, { useState, useContext } from 'react'


import MasonryLayout from './MasonryLayout'
import Spinner from './Spinner'
import SearchContext from '../context/SearchContext'

const Search = ({ searchTerm }) => {
  const { pins, loading } = useContext(SearchContext)

  return (
    <div>
      {loading && <Spinner message='Searching for pins...' />}
      {pins?.length !== 0 && <MasonryLayout pins={pins} />}
      {pins?.length === 0 && searchTerm !== '' && !loading && (
        <div className='mt-10 text-center text-xl'>No Pins found!</div>
      )}
    </div>
  )
}

export default Search