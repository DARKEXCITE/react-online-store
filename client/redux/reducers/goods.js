import axios from 'axios'

const GET_GOODS = 'GET_GOODS'
const SET_SORT_GOODS = 'SET_SORT_GOODS'

const initialState = {
    listOfGoods: [],
    sortTypeGoods: 'default'
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_GOODS: {
            return {
                ...state,
                listOfGoods: action.data
            }
        }
        case SET_SORT_GOODS: {
            const sortedList = [...state.listOfGoods].sort((a, b) => {
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
                        listOfGoods: sortedList.reverse()
                    }
                }
            }

            return {
                ...state,
                listOfGoods: sortedList
            }
        }
        default:
            return state
    }
}

export function getGoods() {
    return (dispatch) => {
        axios.get('/api/v1/goods')
            .then(({ data }) => {
                dispatch({
                    type: GET_GOODS,
                    data
                })
            })
    }
}

export function sortGoods(sortType, sortMethod) {
    return {
        type: SET_SORT_GOODS,
        sortType,
        sortMethod
    }
}
