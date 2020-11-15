import { compose, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import createRootReducer from './reducers'

const middleware = [thunk]

const composeFunction = process.env.NODE_ENV === 'development' ? composeWithDevTools : compose
const composeEnhancers = composeFunction(applyMiddleware(...middleware))

const initialState = {}

const store = createStore(createRootReducer(), initialState, composeEnhancers)

export default store
