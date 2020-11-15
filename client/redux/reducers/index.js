import { combineReducers } from "redux"
import goods from "./goods"
import basket from "./basket"
import currency from "./currency"
import logs from "./logs"

const createRootReducer = () => combineReducers({
    goods,
    basket,
    currency,
    logs
})

export default createRootReducer
