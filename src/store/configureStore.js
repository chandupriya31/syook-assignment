import {createStore,combineReducers,applyMiddleware} from 'redux'
import {thunk} from 'redux-thunk'
import { dishReducer } from '../redux-reducer/dish-reducer'

export const configureStore = ()=>{
    const store = createStore(combineReducers({
        dish:dishReducer
    }),applyMiddleware(thunk))
    return store
}