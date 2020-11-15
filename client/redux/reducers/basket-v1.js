const ADD_TO_BASKET = 'ADD_TO_BASKET'
const REMOVE_FROM_BASKET = 'REMOVE_FROM_BASKET'

const initialState = {
    listOfBasket: {}
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_BASKET: {
            const { quantity, id, product } = action

            return {
                ...state,
                listOfBasket: {
                    ...state.listOfBasket,
                    [id]: { ...product, quantity }
                }
            }
        }
        case REMOVE_FROM_BASKET: {
            const newState = state.listOfBasket
            const { id } = action

            if (newState[id].quantity <= 1) {
                delete newState[id]
            } else {
                newState[id].quantity -= 1
            }

            return {
                ...state,
                listOfBasket: {...newState}
            }
        }
        default:
            return state
    }
}

export function addToBasket(product) {
    const { id } = product

    return (dispatch, getState) => {
        const { basket } = getState()
        const { listOfBasket } = basket

        if (listOfBasket[id]) {
            dispatch({
                type: ADD_TO_BASKET,
                quantity: listOfBasket[id].quantity + 1,
                id,
                product
            })
        } else {
            dispatch({
                type: ADD_TO_BASKET,
                quantity: 1,
                id,
                product
            })
        }
    }
}

export function removeFromBasket(id) {
    return (dispatch) =>
        dispatch({
            type: REMOVE_FROM_BASKET,
            id
        })
}
