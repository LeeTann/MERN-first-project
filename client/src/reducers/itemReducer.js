import uuid from 'uuid'
import { GET_ITEMS, ADD_ITEMS, DELETE_ITEM } from '../actions/types'

const initalState = {
    items: [
        { id: uuid(), name: 'Eggs'},
        { id: uuid(), name: 'Milk'},
        { id: uuid(), name: 'Steak'},
        { id: uuid(), name: 'Candy'}
    ]
}

export default function(state = initalState, action) {
    switch(action.type) {
        case GET_ITEMS:
            return{
                ...state
            }

        case DELETE_ITEM:
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload)
            }

        default:
            return state
    }
}