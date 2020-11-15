import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"

import Product from "./components/product"
import {addLog} from "./redux/reducers/logs";

const Basket = () => {
    let totalPrice = 0
    const dispatch = useDispatch()

    const basket = useSelector(state => state.basket.listOfBasket)

    basket.forEach(item => {
        totalPrice += item.price * item.quantity
    })

    const currency = useSelector(store => store.currency)
    const rate = currency.rates[currency.currency]
    const actualPrice = (totalPrice * rate).toFixed(2)

    return (
        <main className="pb-12">
            { basket.length < 1 &&
                <div className="flex justify-center items-center flex-col font-bold">
                    <div className="text-gray-300 text-2xl mb-5">Корзина пуста</div>
                    <Link to="/"
                          className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-700 text-white"
                          onClick={() => {
                              dispatch(addLog(`navigate to / page`))
                          }}
                    >
                        На главную
                    </Link>
                </div>
            }

            { basket.length > 0 &&
                <div id="products" className="container mx-auto grid grid-cols-3 justify-center gap-16 pb-5">
                    { basket.map(item => <Product key={item.id} data={item} />) }
                </div>
            }

            { basket.length > 0 &&
                <div id="total-amount" className="container mx-auto">
                    <span className="text-xl border-2 border-black rounded px-2 pb-1">
                        Всего: {actualPrice}&nbsp;{currency.signs[currency.currency]}
                    </span>
                </div>
            }
        </main>
    )
}

Basket.propTypes = {}

export default Basket
