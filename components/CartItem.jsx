import React from "react";
import Link from 'next/link'
import {Paper,Grid,Card,CardMedia,CardContent, Typography} from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@material-ui/icons/IndeterminateCheckBoxOutlined';

import { decrease, increase } from '../store/Actions'

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
  card: {
    backgroundColor: "#EBE5E3",
    display: "flex",
    marginTop: 10,
    padding:'10px 0px 0px 10px'
  },
  h6: {
    textTransform:"Capitalize",
    fontFamily: '"Sofia-Pro", sans-serif',
    fontSize: 15,
    fontWeight: 600,
    lineHeight: 1.2,
    letterSpacing: -0.5,
    color: "rgba(80,80,80,1)"
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
 
  label: {
    color: "red",
    letterSpacing: "1px",
    fontWeight: 400,
    fontsize: 6
  },

  media: {
    height: 80,
    width: 80,
    backgroundSize: "cover",
    backgroundPosition: "top"    
  },

  content: {
    padding: 0
  },
  bigspacer: {
    height: 10
  },
  cover: {
    minWidth: 95
  },
  px_2: {
    width:'20px',
    paddingLeft: '1px',
    paddingRight: '1px',
    margin:'0px 3px 3px 3px'
  },
}));


const CartItem = ({item, dispatch, cart}) => {
  const classes = useStyles();
    return (    
    <Paper elevation={3}>     
                <Card className={classes.card}>
                    <Grid container spacing={4}>
                    <Grid item xs={12} sm={2} className={classes.cover}>
                        <CardMedia  
                        className={classes.media}
                        image={item.images[0].url}
                        title={item.images[0].url}
                        />
                    </Grid>
                    <Grid item xs={12} sm={5}>
                        <CardContent className={classes.content}>                 
                        <Typography className={classes.h6}>
                            <Link href={`/product/${item._id}`}>
                                <a>{item.title}</a>
                            </Link>
                        </Typography>
                        <div className={classes.spacer} />
                        <Typography
                            variant="subtitle1"
                            color="textSecondary"
                            className={classes.subtitle1}
                        >
                            ${item.quantity * item.price}
                        </Typography>     
                        <div className={classes.spacer} />            
                            <Typography
                            variant="subtitle1"
                            color="textSecondary"
                            className={classes.subtitle1}
                            >
                            {
                                item.inStock > 0
                                ? <span className="mb-1 text-danger">In Stock: {item.inStock}</span>
                                : <span className="mb-1 text-danger">Out Stock</span>
                            }
                            </Typography>
                        </CardContent>
                    </Grid>
                    <Grid item xs={12} sm={3}>   
                    <IconButton color="secondary"             
                        onClick={ () => dispatch(decrease(cart, item._id)) } 
                        disabled={item.quantity === 1 ? true : false}
                        >
                        <IndeterminateCheckBoxOutlinedIcon  /> 
                    </IconButton>         
                        <span className={classes.px_2}>{item.quantity}</span>
                        
                        <IconButton color="secondary"                   
                            onClick={ () => dispatch(increase(cart, item._id)) }
                            disabled={item.quantity === item.inStock ? true : false}
                        >
                        <AddBoxOutlinedIcon/> 
                        </IconButton>                     
                    </Grid>
                    <Grid item xs={12} sm={1}>
                    <IconButton aria-label="delete" color="secondary">
                        <DeleteIcon 
                        onClick={() => dispatch({
                            type: 'ADD_MODAL',
                            payload: [{ data: cart, id: item._id, title: item.title, isOpen:true, type: 'ADD_CART' }]
                        })}
                        />
                    </IconButton>       
                    </Grid>
                    </Grid>
            </Card> 
            </Paper>            
    )
}

export default CartItem