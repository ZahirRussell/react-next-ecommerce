import { createContext, useReducer, useEffect } from 'react'
import reducers from './Reducers'
import { getData } from '../utils/fetchData'


export const DataContext = createContext()


export const DataProvider = ({children}) => {
    const initialState = { 
        notify: {}, cart: [], modal: [], orders: []
    }

    const [state, dispatch] = useReducer(reducers, initialState)
    const { cart } = state

   

    useEffect(() => {
        const my_cart = JSON.parse(localStorage.getItem('my_cart'))

        if(my_cart) dispatch({ type: 'ADD_CART', payload: my_cart })
    }, [])

    useEffect(() => {
        localStorage.setItem('my_cart', JSON.stringify(cart))
    }, [cart])

    useEffect(() => {
            getData('order')
            .then(res => {
                if(res.err) return dispatch({type: 'NOTIFY', payload: {error: res.err}})
                
                dispatch({type: 'ADD_ORDERS', payload: res.orders})
            })       
    },[])

    return(
        <DataContext.Provider value={{state, dispatch}}>
            {children}
        </DataContext.Provider>
    )
}