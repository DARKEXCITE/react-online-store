import {addLog} from "./logs";

const ADD_TO_BASKET = 'ADD_TO_BASKET'
const REMOVE_FROM_BASKET = 'REMOVE_FROM_BASKET'
const SET_SORT_CART = 'SET_SORT_CART'

const initialState = {
    listOfBasket: [],
    sortTypeBasket: 'default'
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_BASKET: {
            const { id } = action.product
            let product = { ...action.product }
            const newList = [ ...state.listOfBasket ]

            if (state.listOfBasket.length === 0) {
                product = { ...product, quantity: 1 }
                newList.push(product)
            } else {
                let trigger = true

                for (let i = 0; i < newList.length; i += 1) {
                    if (newList[i].id === id) {
                        newList[i].quantity += 1
                        trigger = false
                    }
                }

                if (trigger) {
                    product = { ...product, quantity: 1 }
                    newList.push(product)
                }
            }

            return {
                ...state,
                listOfBasket: [
                    ...newList
                ]
            }
        }

        case REMOVE_FROM_BASKET: {
            let newBasket = [ ...state.listOfBasket ]

            for (let i = 0; i < newBasket.length; i += 1) {
                if (newBasket[i].id === action.id) {
                    if (newBasket[i].quantity > 1) {
                        newBasket[i].quantity -= 1
                    } else {
                        newBasket = newBasket.filter(item => item.id !== action.id)
                    }
                    break
                }
            }

            return {
                ...state,
                listOfBasket: [ ...newBasket ]
            }
        }

        case SET_SORT_CART: {
            const sortedList = [ ...state.listOfBasket ].sort((a, b) => {
                switch (action.sortType) {
                    case 'title': {
                        if (a.title < b.title) {
                            return -1
                        }
                        return 1
                    }
                    case 'price': {
                        if (a.price < b.price) {
                            return -1
                        }
                        return 1
                    }
                    default:
                        return 0
                }
            })

            if (action.sortType !== "default") {
                if (action.sortMethod === false) {
                    return {
                        ...state,
                        listOfBasket: sortedList.reverse()
                    }
                }
            }

            return {
                ...state,
                listOfBasket: sortedList
            }
        }

        default:
            return state
    }
}

export function addToBasket(product) {
    return (dispatch) => {
        dispatch(addLog(`add "${product.title}" to the basket`))

        dispatch({
            type: ADD_TO_BASKET,
            product
        })
    }
}

export function removeFromBasket(id) {
    return (dispatch) => {
        dispatch({
            type: REMOVE_FROM_BASKET,
            id
        })
    }
}

export function sortCart(sortType, sortMethod) {
    return {
        type: SET_SORT_CART,
        sortType,
        sortMethod
    }
}
