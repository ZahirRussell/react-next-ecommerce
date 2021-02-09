import { useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Container, Grid, Box, Button,TextField,Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import ConfirmationNumberTwoToneIcon from '@material-ui/icons/ConfirmationNumberTwoTone';

import { DataContext } from '../store/GlobalState'
import { postData } from '../utils/fetchData'
import Meta from '../components/Meta';

const useStyles = makeStyles(theme => ({
  root: {
    background: "linear-gradient(90deg, #D9DAEB, #EBE5E3)",
    flexGrow: 1,
    padding: 14
  },
  paper: {
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
    backgroundColor: "#EBE5E3"
  },
 
  h6: {
    fontFamily: '"Sofia-Pro", sans-serif',
    fontSize: 15,
    fontWeight: 600,
    lineHeight: 1.2,
    letterSpacing: -0.5,
    color: "rgba(80,80,80,1)"
  },
  
  spacer: {
    display: "block",
    height: 5
  },
  
  label: {
    color: "red",
    letterSpacing: "1px",
    fontWeight: 400,
    fontsize: 6
  },

  bigspacer: {
    height: 10
  },
  textField: {
    backgroundColor: "rgba(198,205,252,0.5)",
    borderBottomWidth: 2,
    width: "100%",
    borderRadius: `6px 6px 0 0`
  },
}));

const Cart = () => {
  const classes = useStyles();
  const { state, dispatch } = useContext(DataContext)
  const { cart, orders } = state

  const [total, setTotal] = useState(0)

  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [mobile, setMobile] = useState('')

  const router = useRouter()

  useEffect(() => {
    const getTotal = () => {
      const res = cart.reduce((prev, item) => {
        return prev + (item.price * item.quantity)
      },0)

      setTotal(res)
    }

    getTotal()
  },[cart])


  

  const handleOrder = async () => {
    if(!name || !address || !mobile)
    return dispatch({ type: 'NOTIFY', payload: {error: 'Please add add all fields.'}})
   

    dispatch({ type: 'NOTIFY', payload: {loading: true} })

    postData('order', {name, address, mobile, cart, total})
    .then(res => {
      if(res.err) return dispatch({ type: 'NOTIFY', payload: {error: res.err} })
    console.log('Order Response',res);
      dispatch({ type: 'ADD_CART', payload: [] })
      
      const newOrder = {
        ...res.newOrder
      }
      dispatch({ type: 'ADD_ORDERS', payload: [...orders, newOrder] })
      dispatch({ type: 'NOTIFY', payload: {success: res.msg} })
      return router.push(`/order/${res.newOrder._id}`)
      //return router.push('/myOrder')
    })

  }

    return(
      <Box m={2} pt={3}>
        <Meta title="Checkout Page" description="Checkout with details" />
          <Container >
          <div className="shopping-cart">    
            <Grid container spacing={2}> 
              <Grid item sm={5}>
                    <div className="title">
                      Shipping Details
                    </div>                     
                      <div className={classes.bigspacer} />
                      <TextField
                        name="name" 
                        id="name"
                        label="name"
                        className={clsx(classes.textField, classes.dense)}
                        margin="dense"
                        variant="filled"
                        value={name}
                        onChange={e => setName(e.target.value)}
                      />

                      <TextField
                        name="mobile" 
                        id="mobile"
                        label="mobile"
                        type="number"
                        className={clsx(classes.textField, classes.dense)}
                        margin="dense"
                        variant="filled"
                        value={mobile}
                        onChange={e => setMobile(e.target.value)}
                      />

                      <TextField
                        name="address" 
                        id="address"
                        label="Address"
                        className={clsx(classes.textField, classes.dense)}
                        margin="dense"
                        variant="filled"
                        multiline
                        rowsMax="4"
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                      />
                      <div className={classes.bigspacer} />                  

                        <Button onClick={handleOrder} endIcon={<ConfirmationNumberTwoToneIcon />} size="medium" variant="contained" color="secondary">
                          Confirm Order
                        </Button>
                </Grid>
           
              <Grid item xs={12} sm={6}>
                    <div className="title">
                      Order Summery
                    </div>                     
                      <div className={classes.bigspacer} />                  
                  {
                   cart.map(item => (
                      <List key={item._id}>                            
                        <ListItem>
                          <ListItemAvatar>
                                <Avatar alt={item.images[0].url} src={item.images[0].url} />
                          </ListItemAvatar>
                          <ListItemText
                            primary={item.title}
                            secondary={item.quantity ? `${item.quantity} x ${item.price}` : null}
                          />

                          <ListItemSecondaryAction>
                            ${item.quantity * item.price}
                          </ListItemSecondaryAction>
                        </ListItem>                            
                    </List>
                     ))
                   }
                 <hr/>
                 <Typography
                      style={{paddingRight:'40px'}}
                      align="right"
                      >
                     Total: ${total} 
                  </Typography>                                       
              </Grid>
              </Grid>
              </div>
          </Container>
      </Box>    
    )
  }

  <style jsx>
    {
        `
            .totalValue{
              font-size: 1rem;
              font-family: "Roboto", "Helvetica", "Arial", sans-serif;
              font-weight: 400;
              line-height: 1.75;
              letter-spacing: 0.00938em;  
              padding-right: 40px;             
            } 
        `
    }
  </style>
  
export default Cart
