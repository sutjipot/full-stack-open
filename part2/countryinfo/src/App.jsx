import { useState, useEffect } from 'react'
import countryServices from './services/countries'  
import axios from 'axios'
import styles from './styles.js'

const App = () => {
  const [countries, setCountries] = useState([])
  const [find, setFind] = useState('')
  

  useEffect(() => {
    countryServices
      .getAll()
      .then((data) => {
        const countries = data.map((country) => {
          return {
            name: country.name.common,
            capital: Array.isArray(country.capital) ? country.capital : [country.capital],
            population: country.population,
            languages: typeof country.languages === 'object' ? Object.values(country.languages) : [],            flag: country.flags.png,
            area: country.area
          }})
        setCountries(countries)
      })
      .catch(error => {
        console.log('Error:', error)
      })
  }, [])


  return (
    <div style={styles.Container}>
      <Find find={find} setFind={setFind}/>
      <CountryList countries={countries} find={find} setFind={setFind} />
    </div>
  )
}

function Find ({find, setFind}) {
  return (
    <div style={styles.Form} className="normal" >
      Find countries: <input type="text" name="Find" placeholder="Countries" value={find} onChange={(e) => setFind(e.target.value)} />
    </div>
  )
}

function CountryList ({countries, find, setFind}) {
  const countriesFound = find ? countries.filter(c => c.name.toLowerCase().includes(find.toLowerCase())) : countries
  if (find === '') return (<div style={styles.Container}></div>)

  else if (countriesFound.length > 10) {
    return <div style={styles.Container} className='normal'>Too many matches, specify another filter</div>
  }

  else if (countriesFound.length === 1) {
    return (
      <div style={styles.Container}>
        {countriesFound.map(c => <Country key={c.name} country={c} />)}
      </div>
    )
  } 

  else {
    return (
      <div style={styles.Container} >
        {countriesFound.map((c) => (
          <li key={c.name} >
            {c.name} 
            <button onClick={() => setFind(c.name)}>show</button>
          </li>
        ))}
      </div>
    )
  }
}

const Country = ({country}) => {
  return (
    <div style={styles.Container} className='normal'>
      <h1>{country.name}</h1>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
      <h2>Languages</h2>
      <ul>
      {country.languages.map((l, i) => <li key={i}>{l}</li>)}
      </ul>
      <img src={country.flag} alt={country.name} style={{width: "150px", height: "100px"}} />
      <Weather city={country.capital}/>
    </div>
  )
}


const Weather = ({city}) => {
  const [weather, setWeather] = useState([]);
  const api_key = import.meta.env.VITE_SOME_KEY

  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`)
      .then((response) => {
        setWeather(response.data)
      });
  },[])

  return (
    <>
      {weather.main ? (
        <div>
          <h2 style={styles.Norm}>Weather in {city}</h2>
          <div className='normal' style={styles.Norm}>Temperature: {weather.main.temp - 273.15} °C</div>
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            style={styles.Form}
          />
          <div className='normal' style={styles.Norm}>Wind {weather.wind.speed} m/s</div>
        </div>
      ) : null}
    </>
  );
  
}


export default App

