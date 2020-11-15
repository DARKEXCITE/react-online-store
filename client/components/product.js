import React from 'react'
import { useSelector, useDispatch } from "react-redux"
import { removeFromBasket } from "../redux/reducers/basket"
import { addLog } from "../redux/reducers/logs";

const Product = (props) => {
    const { data } = props
    const dispatch = useDispatch()

    const currency = useSelector(store => store.currency)
    const rate = currency.rates[currency.currency]
    const actualPrice = (data.price * rate).toFixed(2)

    return (
        <div className="card flex flex-col">
            <div className="mb-2 flex items-center justify-center h-full">
                <img
                src={ data.image }
                alt={ data.title }
                className="product__image"
                />
            </div>

            <div className="flex justify-between mb-1">
                <h4 className="product__title">{ data.title }</h4>

                <div>
                    <span className="product__price">{ actualPrice }</span>&nbsp;
                    <span className="currency">{currency.signs[currency.currency]}</span>
                </div>
            </div>

            <div className="product__amount mb-1">В корзине: { data.quantity }</div>

            <div className="product__total_price mb-2">Итого: { (data.quantity * actualPrice).toFixed(2) }&nbsp;{currency.signs[currency.currency]}</div>

            <button
            type="button"
            className="product__remove transition duration-200 block w-full text-white pb-1 text-center rounded bg-red-600 hover:bg-red-700"
            onClick={() => {
                dispatch(removeFromBasket(data.id))
                dispatch(addLog(`remove "${data.title}" from the basket`))
            }}
            >
                Удалить
            </button>
        </div>
    )
}

Product.propTypes = {}

export default Product
