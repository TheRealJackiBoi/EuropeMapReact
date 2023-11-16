import './App.css'
import {useState, useEffect} from 'react' 
import Map from "./assets/map.jsx"
import InfoBox from './Components/InfoBox'


function App() {

  const [selectedCountryCode, setSelectedCountryCode] = useState("")


  useEffect(() => {
    console.log(selectedCountryCode)
  }, [selectedCountryCode])

  const handleSetCountry = (countryCode) => {
    setSelectedCountryCode(countryCode)
  }

  

  return (
    <>
      <Map handleSetCountry={handleSetCountry} />
      <InfoBox countryCode={selectedCountryCode} />
    </>
  )
}

export default App
