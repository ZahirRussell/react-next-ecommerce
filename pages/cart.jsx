import { useContext, useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Container, Grid, Box, Button,ButtonBase,Paper,Typography } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import RemoveShoppingCartTwoToneIcon from '@material-ui/icons/RemoveShoppingCartTwoTone';

import { getData } from '../utils/fetchData'
import { DataContext } from '../store/GlobalState'
import CartItem from '../components/CartItem'
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
  
  subtitle1: {
    fontFamily: '"Rubik", sans-serif',
    fontSize: 14,
    letterSpacing: "0.1em",
    fontStyle: "normal",
    fontWeight: 400,
    color: "rgba(80,80,80,1)"
  },
  
  spacer: {
    display: "block",
    height: 5
  },

  roundedbox: {
    marginTop: 10,
    borderRadius: 8,
    borderColor: "grey",
    padding: 20
  },

  bigspacer: {
    height: 10
  },


  emptyPaper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 600,
  },
  imgEmptyCart: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

const Cart = () => {
  const classes = useStyles();
  const { state, dispatch } = useContext(DataContext)
  const { cart } = state

  const [total, setTotal] = useState(0)
  const [callback, setCallback] = useState(false)
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

  useEffect(() => {
    const cartNative = JSON.parse(localStorage.getItem('my_cart'))
    if(cartNative && cartNative.length > 0){
      let newArr = []
      const updateCart = async () => {
        for (const item of cartNative){
          const res = await getData(`product/${item._id}`)
          const { _id, title, images, price, inStock, sold } = res.product
          if(inStock > 0){
            newArr.push({ 
              _id, title, images, price, inStock, sold,
              quantity: item.quantity > inStock ? inStock : item.quantity
            })
          }
        }

        dispatch({ type: 'ADD_CART', payload: newArr })
      }

      updateCart()
    } 
  },[callback])

  const handleCheckout = async () => {
    let updatedCart = [];
    for(const item of cart){
      const res = await getData(`product/${item._id}`)
      if(res.product.inStock - item.quantity >= 0){
        updatedCart.push(item)
      }
    }

    console.log(updatedCart)

    if(updatedCart.length < cart.length){
      setCallback(!callback)
      return dispatch({ type: 'NOTIFY', payload: {
        error: `The product is out of stock or the quantity is insufficient. Please try another one.`
      }})
    }

    return router.push('/checkout')

  }
  
  if( cart.length === 0 ) 
    return(
      <Paper className={classes.emptyPaper}>
        <Grid container spacing={2}>
          <Grid item sm container>
            <ButtonBase>
              <img className={classes.imgEmptyCart} src="/emptyCart.png" alt="empty" />
            </ButtonBase>
          </Grid>
        </Grid>
    </Paper>
    )

    return(
      <Box m={2} pt={3}>
        <Meta title="Cart Page" description="Added Products" />
          <Container >
          <div className="shopping-cart">
            <Grid container spacing={2}>    
              <Grid item sm={7}>                  
                    <div className="title">
                      Shopping Bag
                    </div>
                    {
                   cart.map(item => (
                       <CartItem key={item._id} item={item} dispatch={dispatch} cart={cart} />
                     ))
                   }  
                </Grid>
                <Grid item sm={5}>
                    <div className="title">
                      Summery
                    </div>
                      <Box border={2} className={classes.roundedbox}>
                        <Grid container spacing={1}>
                          <Grid item xs={12} sm={6}>
                            <Typography
                              variant="subtitle1"
                              align="left"
                            >
                              Total
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Typography
                              variant="subtitle1"
                              align="right"
                            >
                              ${total}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Box>
                      <div className={classes.bigspacer} /> 
                     
                        <Button onClick={handleCheckout} endIcon={<RemoveShoppingCartTwoToneIcon />} size="medium" variant="contained" color="secondary">
                          Proceed to checkout
                        </Button>
                </Grid>
              </Grid>
              </div>
          </Container>
      </Box>
    )
  }
  
export default Cart

