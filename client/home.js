import React from "react"
import { useSelector } from "react-redux"
import Card from "./components/card"

const Home = () => {
    const listOfGoods = useSelector(store => store.goods.listOfGoods.reduce((acc, rec, index) => {
        if (index < 10) {
            return [...acc, rec]
        }
        return [...acc]
    }, []))

    return (
        <main id="main" className="pb-12">
            <div id="cards" className="container mx-auto grid grid-cols-3 justify-center gap-16">
                {listOfGoods.map(elem => {
                    return (
                        <Card key={elem.id} data={elem}/>
                    )
                })}
            </div>
        </main>
    )
}

export default Home
