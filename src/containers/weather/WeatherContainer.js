import React, {useState, useEffect, useContext, Fragment} from 'react'
import {AddressContext} from '../../context/AddressContext'
import FetchWeatherData from '../../utils/FetchWeatherData'
import {isUndefined, isEmpty, isNull} from 'lodash-es'
import WeatherForecastContainer from '../weather-forecast/WeatherForecastContainer'
import LoaderComponent from '../../components/loader/LoaderComponent'
import ErrorComponent from '../../components/error/ErrorComponent'

const WeatherContainer = () => {
  const addressContext = useContext(AddressContext)

  const [weatherForecast, setWeatherForecast] = useState({})
  const [weatherCurrent, setWeatherCurrent] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  const validCityName = () => {
    if (
      !isEmpty(addressContext.address) &&
      !isUndefined(addressContext.address) &&
      !isNull(addressContext.address)
    ) {
      const cityName = addressContext.address.cityName
      return (
        !isEmpty(cityName) &&
        !isUndefined(cityName) &&
        !isNull(cityName) &&
        cityName !== 'undefined, undefined, undefined'
      )
    }
    return false
  }

  const setWeatherData = (current, forecast) => {
    if (!isEmpty(current) && !isEmpty(forecast)) {
      setWeatherCurrent(current)
      setWeatherForecast(forecast)
    }
  }

  const fetchWeatherData = async () => {
    try {
      setIsLoading(true)
      const {weatherCurrent, weatherForecast} = await FetchWeatherData(
        addressContext
      )
      setWeatherData(weatherCurrent, weatherForecast)
    } catch (err) {
      console.err(err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchWeatherData()
    const timer = setInterval(() => {
      fetchWeatherData()
    }, 3600000)

    return () => {
      clearInterval(timer)
    }
    // eslint-disable-next-line
  }, [addressContext])

  return (
    <Fragment>
      {!isUndefined(weatherCurrent) &&
      !isEmpty(weatherCurrent) &&
      !isNull(weatherCurrent) ? (
        <WeatherForecastContainer
          weatherCurrent={weatherCurrent}
          weatherForecast={weatherForecast}
          address={addressContext.address}
          latlong={addressContext.latlong}
          urbanArea={addressContext.urbanArea}
        />
      ) : (
        <Fragment>
          {isLoading ? (
            <LoaderComponent
              loaderText={`Fetching weather forecast ${
                validCityName() ? `for ${addressContext.address.cityName}` : ''
              } 😎`}
            />
          ) : (
            <div>
              {validCityName() ? (
                <div className='flex justify-center'>
                  <div className='sm:w-full lg:w-2/3 xl:w-1/2'>
                    <ErrorComponent
                      errorMessage={`Something went wrong. Failed to fetch weather forecast ${
                        validCityName()
                          ? `for ${addressContext.address.cityName}`
                          : ''
                      }! 😢`}
                    />
                  </div>
                </div>
              ) : null}
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  )
}

export default WeatherContainer
