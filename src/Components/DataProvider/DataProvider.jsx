
// importing react
import React, {createContext,useReducer} from 'react'

// creating a context for data
// this context will be used to provide data to the components
export const DataContext = createContext()



// creating a data provider component
// receiving props from the parent component
export const DataProvider =({children,reducer,initialState})=>{
    return (
        <DataContext.Provider value={useReducer(reducer,initialState)}>
            {children}
        </DataContext.Provider>
    )
}