import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { addLog } from "./redux/reducers/logs"

const Logs = () => {
    const dispatch = useDispatch()
    const { listOfLogs } = useSelector(store => store.logs)

    return (
        <div>
            {listOfLogs.length > 0 &&
                <table className="m-auto">
                    <thead>
                        <th className="text-left">Действие</th>
                        <th>Время</th>
                    </thead>
                    <tbody>
                    {listOfLogs.map(log => {
                        return (
                            <tr key={log.date}>
                                <td>{log.data}</td>
                                <td className="pl-3">{log.date}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            }

            {listOfLogs.length < 1 &&
                <div className="flex justify-center items-center flex-col font-bold">
                    <div className="text-gray-300 text-2xl mb-5">Логи пусты</div>
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
        </div>
    )
}

Logs.propTypes = {}

export default React.memo(Logs)
