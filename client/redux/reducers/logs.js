import axios from 'axios'

const GET_LOGS = 'GET_LOGS'
const ADD_LOG = 'ADD_LOG'
const DELETE_LOGS = 'DELETE_LOGS'

const initialState = {
    listOfLogs: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_LOGS: {
            return {
                ...state,
                listOfLogs: action.data
            }
        }

        case ADD_LOG: {
            return {
                ...state,
                listOfLogs: [
                    ...state.listOfLogs,
                    action.data
                ]
            }
        }

        case DELETE_LOGS: {
            return {
                ...state,
                listOfLogs: []
            }
        }

        default:
            return state
    }
}

export function getLogs() {
    return (dispatch) => {
        axios.get('/api/v1/logs')
            .then(({ data }) => {
                dispatch({
                    type: GET_LOGS,
                    data
                })
            })
    }
}

export function addLog(log) {
    return (dispatch) => {
        axios.post('/api/v1/logs', { data: log })
            .then(({ data }) => {
                dispatch({
                    type: ADD_LOG,
                    data: data.log
                })
            })
    }
}

export function deleteLogs() {
    return (dispatch) => {
        axios.delete('/api/v1/logs')
            .then(() => {
                dispatch({
                    type: DELETE_LOGS,
                })
            })
    }
}
