import './App.css';
import { useState, useEffect } from 'react';
import Countries from './Components/Countries';
import Search from './Components/Search';

// step 1: fetch data
// step 2: display data
// step 3: remove country
// step 4: search country

function App() {

  const url = 'https://restcountries.com/v3.1/all'

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [countries, setCountries] = useState([])
  const [filteredCountries, setfilteredCountries] = useState(countries)

  const fetchData = async (url) => {
    setIsLoading(true)

    try {
      const response = await fetch(url)
      const data = await response.json()
      setCountries(data)
      setfilteredCountries(data)
      setIsLoading(false)
      setError(null)
    } catch(error) {
        setIsLoading(false)
        setError(error) 
    }

  }

  useEffect(() => {
    fetchData(url)
  }, [])
  
  const handleRemoveCountry = (name) => {
    const filter = filteredCountries.filter((country) => 
          country.name.common !== name)
        setfilteredCountries(filter)
    }

  const handleSearch = (searchValue) => {
    const value = searchValue.toLowerCase();
    const newCountries = countries.filter((country) => {
      const countryName = country.name.common.toLowerCase();
      return countryName.startsWith(value)
    })
    setfilteredCountries(newCountries)
  }

  return (
    <>
      <h1>Search Your Country</h1>
      <Search onSearch={handleSearch}/>
      {isLoading && <h2>Loading</h2>}
      {error && <h2>{error.message}</h2>}
      
      {countries && <Countries countries={filteredCountries} 
          onRemoveCountry = {handleRemoveCountry}/>}
     

    </>
  );
}

export default App;
