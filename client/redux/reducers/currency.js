import axios from 'axios'
import { addLog } from "./logs"

const SET_CURRENCY = 'SET_CURRENCY'

const initialState = {
    currency: 'USD',
    rates: { USD: 1 },
    signs: {
        USD: '$',
        EUR: '€',
        CAD: 'C$'
    }
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENCY: {
            return {
                ...state,
                currency: action.currency,
                rates: action.rates
            }
        }
        default:
            return state
    }
}

export function setCurrency(currency) {
    return (dispatch, getState) => {
        const state = getState()

        if (state.currency.currency !== currency) {
            dispatch(addLog(`change currency from ${state.currency.currency} to ${currency}`))

            axios.get('https://api.exchangeratesapi.io/latest?base=USD').then(({ data }) => {
                dispatch({
                    type: SET_CURRENCY,
                    currency: currency.toUpperCase(),
                    rates: data.rates
                })
            })
        }
    }
}
