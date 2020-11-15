import React from 'react'
import { useSelector, useDispatch } from "react-redux"

import { addToBasket } from "../redux/reducers/basket"

const Card = (props) => {
    const { data } = props
    const dispatch = useDispatch()

    const basket = useSelector(store => store.basket.listOfBasket)

    const product = basket.filter(item => data.id === item.id)

    const currency = useSelector(store => store.currency)
    const rate = currency.rates[currency.currency]
    const actualPrice = (data.price * rate).toFixed(2)

    return (
        <div className="card flex flex-col">
            <div className="mb-2 flex items-center justify-center h-full">
                <img src={data.image} alt="{props.cardTitle}" className="card__image" />
            </div>

            <div className="flex justify-between mb-1">
                <h4 className="card__title">{data.title}</h4>

                <div>
                    <span className="card__price">{actualPrice}</span>&nbsp;
                    <span className="currency">{currency.signs[currency.currency]}</span>
                </div>
            </div>

            <div className="card__product-amount mb-2">В корзине: {product.length > 0 && product[0].quantity || 0}</div>

            <button
            type="button"
            className="transition duration-200 block w-full text-white pb-1 text-center rounded bg-purple-600 hover:bg-purple-700"
            onClick={() => {
                dispatch(addToBasket(data))
            }}
            >
                В корзину
            </button>
        </div>
    )
}

Card.propTypes = {}

export default React.memo(Card)
