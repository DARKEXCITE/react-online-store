import React, { useEffect, useState } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"

import Home from "./home"
import Basket from "./basket"
import Header from "./components/header"
import Logs from "./logs"

import { getGoods, sortGoods } from "./redux/reducers/goods"
import { addLog, getLogs } from "./redux/reducers/logs"
import { sortCart } from "./redux/reducers/basket"

const Root = () => {
    const dispatch = useDispatch()

    const [toggled, setToggled] = useState(true)
    const { sortTypeGoods } = useSelector(state => state.goods)
    const { sortTypeBasket } = useSelector(state => state.basket)

    const changeSortMethod = (type) => {
        setToggled(!toggled)
        dispatch(sortGoods(type, toggled))
        dispatch(sortCart(type, toggled))
        dispatch(addLog(`sort by ${type}`))
    }

    useEffect(() => {
        dispatch(sortGoods(sortTypeGoods, toggled))
        dispatch(sortCart(sortTypeBasket, toggled))
        dispatch(getGoods())
        dispatch(getLogs())
        return () => {}
    }, [])

    return (
        <Router>
            <Header changeSortMethod={changeSortMethod} />

            <Switch>
                <Route exact path="/" component={() => <Home />} />
                <Route exact path="/basket" component={() => <Basket />} />
                <Route exact path="/logs" component={() => <Logs />} />
            </Switch>
        </Router>
    )
}

export default Root
