import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import axios from "axios";

const InfoBox = ({ countryCode }) => {
  const [selectedCountry, setSelectedCountry] = useState({ cca2: "" });

  useEffect(() => {
    fetchCountryData(countryCode);
  }, [countryCode]);

  const fetchCountryData = async (countryCode) => {
    try {
      const response = await axios.get(
        `https://restcountries.com/v3.1/alpha/${countryCode}`
      );
      setSelectedCountry(response.data[0]);
    } catch (error) {
      console.log("Error fetching country", error);
    }
  };

  return (
    <div className="infoBox">
      {selectedCountry.cca2.trim() ? (
        <div>
            {/* Header */}
          <h2>{selectedCountry.name.common + " " + selectedCountry.flag}</h2>
          
            {/* Info */}
          <div style={{ textAlign: "left" }}>
            
            {/* Coordinates */}
            <h3>Coordinates</h3>
            <p>
              <b>Lat:</b> {selectedCountry.latlng[0]} <b>Long: </b>
              {selectedCountry.latlng[1]}
            </p>

            {/* Capital */}
            <h3>Capital</h3>
            {selectedCountry.capital}

            {/* Currencies */}
            <h3>Currencies</h3>
            {selectedCountry.currencies ? (
              <ul>
                {Object.keys(selectedCountry.currencies).map(
                  (currency, index) => {
                    return (
                      <li key={index}>
                        <b>{currency}: </b>{selectedCountry.currencies[currency].name}
                      </li>
                    );
                  }
                )}
              </ul>
            ) : (
              <p>No currencies</p>
            )}

            {/* Languages */}
            <h3>Languages</h3>
            {selectedCountry.languages ? (
                <ul>
                    {Object.keys(selectedCountry.languages).map(
                    (language, index) => {
                        return (
                        <li key={index}>
                            {selectedCountry.languages[language]}
                        </li>
                        );
                    }
                    )}
                </ul>
                ) : (
                <p>No languages</p>
                )}

            {/* Codes */}
            <h3>Codes</h3>
            <ul>
              <li>{selectedCountry.cca2}</li>
              <li>{selectedCountry.cca3}</li>
            </ul>

            {/* Borders */} 
            <h3>Borders</h3>
            <ul>
              {selectedCountry.borders.map((border, index) => {
                return <li key={index}>{border}</li>;
              })}
            </ul>
          </div>
        </div>
      ) : (
        <p>Click on a country to see info</p>
      )}
    </div>
  );
};

InfoBox.propTypes = {
  countryCode: PropTypes.string.isRequired,
};

export default InfoBox;
