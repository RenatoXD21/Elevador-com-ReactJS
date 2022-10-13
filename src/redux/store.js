import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import elevadorReducer from './slicers/elevadorSlice'
import andaresReducer from './slicers/andares.Slicer'

export const store = configureStore(
    {
        reducer: {
            elevador: elevadorReducer,
            andares: andaresReducer
        },
        middleware: [thunk]
    }
)