import { Link } from 'react-router-dom'
import React from 'react'
import { useDispatch, useSelector } from "react-redux"

import { setCurrency } from "../redux/reducers/currency"
import { addLog, deleteLogs } from "../redux/reducers/logs"

const Header = (props) => {
  const dispatch = useDispatch()
  const basketCount = useSelector(state => state.basket.listOfBasket).length || 0
  const totalGoods = useSelector(state => state.goods.listOfGoods).length

  return (
    <header id="header" className="bg-purple-400 py-4 text-white mb-5">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex flex-col">
          <Link to="/"
                id="brand-name"
                className="font-bold mr-5 text-3xl"
                onClick={() => {
                  dispatch(addLog(`navigate to / page`))
                }}
          >
            STORE
          </Link>
          <Link to="/basket"
                id="order-count"
                onClick={() => {
                  dispatch(addLog(`navigate to /basket page`))
                }}
          >
            Корзина: <span className="font-bold">{ basketCount }</span>
          </Link>
        </div>

        <div>
          <h3 className="mb-1 font-bold">Валюта:</h3>
          <button
              type="button"
              className="mr-1 bg-purple-600 px-2 rounded hover:bg-purple-700"
              onClick={() => {
                dispatch(setCurrency('USD'))
              }}
          >
            USD
          </button>
          <button type="button"
                  className="mr-1 bg-purple-600 px-2 rounded hover:bg-purple-700"
                  onClick={() => {
                    dispatch(setCurrency('EUR'))
                  }}
          >
            EUR
          </button>
          <button type="button"
                  className="bg-purple-600 px-2 rounded hover:bg-purple-700"
                  onClick={() => {
                    dispatch(setCurrency('CAD'))
                  }}
          >
            CAD
          </button>
        </div>

        <div>
          <h3 className="mb-1 font-bold">Сортировка:</h3>
          <button
            type="button"
            id="sort-price"
            className="mr-1 bg-purple-600 px-2 rounded hover:bg-purple-700"
            onClick={() => {
              props.changeSortMethod('price')
            }}
          >
            По цене
          </button>
          <button
            type="button"
            id="sort-name"
            className="bg-purple-600 px-2 rounded hover:bg-purple-700"
            onClick={() => {
              props.changeSortMethod('title')
            }}
          >
            По названию
          </button>
        </div>

        <div>
          <div className="mb-1">
            Товаров: <span className="font-bold">{ totalGoods }</span>
          </div>

          <div className="flex">
            <button
                type="button"
                className="bg-red-600 py-2 px-3 rounded hover:bg-red-700 mr-1"
                onClick={() => {
                  dispatch(deleteLogs())
                }}
            >
              <svg className="w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M6 2l2-2h4l2 2h4v2H2V2h4zM3 6h14l-1 14H4L3 6zm5 2v10h1V8H8zm3 0v10h1V8h-1z"/></svg>
            </button>

            <Link to="/logs"
                  className="bg-green-600 py-2 px-3 rounded hover:bg-green-700"
                  onClick={() => {
                    dispatch(addLog(`navigate to /logs page`))
                  }}>
              <svg className="w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M15.3 14.89l2.77 2.77a1 1 0 0 1 0 1.41 1 1 0 0 1-1.41 0l-2.59-2.58A5.99 5.99 0 0 1 11 18V9.04a1 1 0 0 0-2 0V18a5.98 5.98 0 0 1-3.07-1.51l-2.59 2.58a1 1 0 0 1-1.41 0 1 1 0 0 1 0-1.41l2.77-2.77A5.95 5.95 0 0 1 4.07 13H1a1 1 0 1 1 0-2h3V8.41L.93 5.34a1 1 0 0 1 0-1.41 1 1 0 0 1 1.41 0l2.1 2.1h11.12l2.1-2.1a1 1 0 0 1 1.41 0 1 1 0 0 1 0 1.41L16 8.41V11h3a1 1 0 1 1 0 2h-3.07c-.1.67-.32 1.31-.63 1.89zM15 5H5a5 5 0 1 1 10 0z"/></svg>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

Header.propTypes = {}

export default React.memo(Header)
