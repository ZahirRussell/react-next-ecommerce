import { useContext,useState,useEffect } from 'react'
import { DataContext } from '../store/GlobalState'
import { deleteItem } from '../store/Actions'
import { deleteData } from '../utils/fetchData'
import {useRouter} from 'next/router'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core'


const Modal = () => {    
    const {state, dispatch} = useContext(DataContext)
    const { modal } = state
    const router = useRouter()
    const [open, setOpen] = useState(false);    

    useEffect(() => {
        const handleOpen = () => {
          const res =   modal.map(a => a.isOpen);      
          setOpen(res[0]);
        }    
        handleOpen()
      },[modal])    

      const handleClose = () => {
        setOpen(false);
      };  

    const deleteProduct = (item) => {
        dispatch({type: 'NOTIFY', payload: {loading: true}})
        deleteData(`product/${item.id}`)
        .then(res => {
            if(res.err) return dispatch({type: 'NOTIFY', payload: {error: res.err}})
            dispatch({type: 'NOTIFY', payload: {success: res.msg}})
            return router.push('/')
        })
    }

    const handleSubmit = () => {
        if(modal.length !== 0){
            for(const item of modal){
                if(item.type === 'ADD_CART'){
                    dispatch(deleteItem(item.data, item.id, item.type))
                }        
        
                if(item.type === 'DELETE_PRODUCT') deleteProduct(item)
        
                dispatch({ type: 'ADD_MODAL', payload: [] })
            }
        }
    }

    return(
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{modal.length !== 0 && modal[0].title}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Do you want to delete this item?
                </DialogContentText>
                </DialogContent>
                <DialogActions>               
                <Button onClick={handleClose} color="primary" autoFocus>
                    Disagree
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    Agree
                </Button>
                </DialogActions>
            </Dialog>
        </>        
    )
}

export default Modal