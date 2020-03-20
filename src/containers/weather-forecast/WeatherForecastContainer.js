import React, {useContext, Fragment} from 'react'
import {ThemeContext} from '../../context/ThemeContext'
import getWeatherBackground from './../../utils/WeatherBackground'
import CurrentWeatherContainer from './../current-weather/CurrentWeatherContainer'
import ForecastContainer from './../forecast/ForecastContainer'
// import emitGA from './../../utils/MiscTrackEvents'
import './WeatherForecastStyle.scss'

const WeatherForecastContainer = ({
  weatherCurrent,
  weatherForecast,
  address,
  latlong,
  urbanArea
}) => {
  const {theme, colorTheme} = useContext(ThemeContext)

  const WET_TYPES = ['rain', 'snow', 'sleet', 'hail']

  // return rain or snow svg image for the above wet types
  const weatherSVG = () => {
    if (weatherCurrent.icon === 'snow') {
      return 'snow'
    }
    return 'rain'
  }

  const imageBorder = {
    borderTopLeftRadius: '1rem',
    borderTopRightRadius: '1rem'
  }

  return (
    <Fragment>
      <div
        className={'flex flex-col justify-center items-center lg:px-5 pt-10'}>
        <div
          className={`sm:w-full lg:w-5/6 xl:max-w-6xl bg-${theme} text-${colorTheme} border border-${colorTheme} md:border-none rounded-t-2xl shadow-lg`}>
          <div className='relative overflow-hidden'>
            <img
              src={`./weather-backgrounds/${getWeatherBackground(
                weatherCurrent
              )}.jpg`}
              alt='clear day'
              className='w-full object-cover object-center weather-background'
              style={imageBorder}
            />
            {/* show rain or snow svg only when weather icon exist in WET_TYPES*/}
            <div>
              {WET_TYPES.includes(weatherCurrent.icon) && (
                <img
                  src={`./weather-backgrounds/${weatherSVG()}.svg`}
                  alt='clear day'
                  className='w-full object-cover object-center absolute top-0 right-0 bottom-0 left-0 weather-background'
                  style={imageBorder}
                />
              )}
            </div>

            {/* current weather container should be on the image on mobile and small devices */}
            <div
              className='block md:hidden absolute top-0 bottom-0 left-0 right-0 my-auto mx-auto text-light'
              style={{background: 'rgba(0,0,0,0.2)', ...imageBorder}}>
              <CurrentWeatherContainer
                weatherCurrent={weatherCurrent}
                address={address}
                latlong={latlong}
                urbanArea={urbanArea}
              />
            </div>

            {/* current weather and forecast container should be on the image from medium devices */}
            <div
              className='hidden md:block absolute top-0 bottom-0 left-0 right-0 my-auto mx-auto text-light'
              style={{background: 'rgba(0,0,0,0.2)', ...imageBorder}}>
              <CurrentWeatherContainer
                weatherCurrent={weatherCurrent}
                address={address}
                latlong={latlong}
                urbanArea={urbanArea}
              />
              <ForecastContainer
                cityName={address.cityName}
                weatherCurrent={weatherCurrent}
                weatherForecast={weatherForecast}
              />
            </div>
          </div>

          <div className='block md:hidden'>
            <ForecastContainer
              cityName={address.cityName}
              weatherCurrent={weatherCurrent}
              weatherForecast={weatherForecast}
            />
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default WeatherForecastContainer
