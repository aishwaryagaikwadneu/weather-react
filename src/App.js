import React, {useContext, Suspense, lazy} from 'react'
import {Switch, Route} from 'react-router-dom'
import {ThemeContext} from './context/ThemeContext'
import HeaderComponent from './components/header/HeaderComponent'
import LoaderComponent from './components/loader/LoaderComponent'
const HomeContainer = lazy(() => import('./containers/home/HomeContainer'))

const App = () => {
  const {theme} = useContext(ThemeContext)

  return (
    <div className={` bg-${theme} tracking-wider border-box wrapper`}>
      <div>
        <HeaderComponent />
      </div>
      <div>
        <Suspense
          fallback={<LoaderComponent loaderText='Loading components' />}>
          <Switch>
            <Route path='/' exact component={HomeContainer}></Route>
          </Switch>
        </Suspense>
      </div>
    </div>
  )
}

export default App
