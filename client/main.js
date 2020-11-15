import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from "react-redux";
import { AppContainer } from 'react-hot-loader'

import './assets/scss/main.scss'
import store from "./redux";
import Root from './root'

const target = document.getElementById('root')

const render = (Component) => {
    ;(module.hot ? ReactDOM.render : ReactDOM.hydrate)(
        <Provider store={store}>
            <AppContainer>
              <Component />
            </AppContainer>
        </Provider>,
      target
    )
}

render(Root)

if (module.hot) {
  module.hot.accept('./root', () => {
    const newApp = require('./root').default
    render(newApp)
  })
}
