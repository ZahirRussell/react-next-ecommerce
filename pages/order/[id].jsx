
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Avatar, Button, Link, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@material-ui/core';
import {patchData,getData} from '../../utils/fetchData'
import {updateItem} from '../../store/Actions'
import { useRouter } from 'next/router'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Meta from '../../components/Meta'

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(800 + theme.spacing(2) * 2)]: {
      width: 800,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(800 + theme.spacing(2) * 2)]: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },

  listItem: {
    textTransform: 'capitalize',
    padding: theme.spacing(1, 0),
  },
  total: {   
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
  truncate: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }
}));



const ViewDetail = ({order}) => {
  const classes = useStyles();
   const router = useRouter()

          
  return (
    <React.Fragment>
      <CssBaseline />  
      <Meta title="Invoice" description={order._id} />    
      <main className={classes.layout}>  
        <Link href='/myOrder'>
            <Button startIcon={<ArrowBackIcon />} variant="outlined"  size="small" color="primary" className={classes.button}>
               Order List
            </Button>
        </Link>       
 
      {
      // orderDetail.orderDetail.map(order => (
      <Paper className={classes.paper} elevation={4}>          
        <Typography variant="h5" gutterBottom>
            Invoice: {order._id}
      </Typography>
      <small>Ordered on: {new Date(order.createdAt).toLocaleDateString()}</small>
      <hr/>
      <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6" gutterBottom className={classes.title}>
                      Shipping
                  </Typography>
                   <Typography gutterBottom>Name: {order.name}</Typography> 
                    <Typography gutterBottom>Address: {order.address}</Typography>
                    <Typography gutterBottom>Mobile: {order.mobile}</Typography>
                </Grid>
                <Grid item container direction="column" xs={12} sm={6}>
                  <Typography variant="h6" gutterBottom className={classes.title}>
                        Billing
                    </Typography>
                     <Typography gutterBottom>Name: {order.name}</Typography>
                    <Typography gutterBottom>Address: {order.address}</Typography>
                    <Typography gutterBottom>Mobile: {order.mobile}</Typography>                
                </Grid>
            </Grid>
          <hr/>
        <List disablePadding>
          {order.cart.map((product) => (
            <ListItem className={classes.listItem} key={product._id} alignItems="flex-start">
               <ListItemAvatar>
                    <Avatar alt={product.images[0].url} src={product.images[0].url} />
                </ListItemAvatar>
              <ListItemText primary={product.title}/>
              <Typography variant="body2">{product.quantity} x {product.price} = ${product.price * product.quantity}</Typography>
            </ListItem>
          ))}         
          <ListItem className={classes.listItem}>
          <ListItemText></ListItemText>          
            <Typography variant="subtitle1" className={classes.total}>
                Total: ${order.total}
            </Typography>
          </ListItem>
        </List>
        <hr/>
        <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6" gutterBottom className={classes.title}>
                      Delivery Details
                  </Typography>
                  <Typography gutterBottom>  
                    {
                          order.delivered ? `Deliverd on: ${new Date(order.updatedAt).toLocaleDateString()}` : 'Not Delivered'
                      }
                  </Typography>                  
                </Grid>
                <Grid item container direction="column" xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom className={classes.title}>
                        Payment details
                    </Typography>

                    <Grid container>
                        <Grid item xs={4}>
                            <Typography gutterBottom>  { order.paid ? `Paid on ${new Date(order.dateOfPayment).toLocaleDateString()}` : 'Not Paid' }
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography gutterBottom> 
                              {order.method && <h6>Method: <em>{order.method}</em></h6>}</Typography>
                        </Grid>
                        <Grid item xs={4}>
                                <Typography gutterBottom> { order.paymentId && <p>PaymentId: <em>{order.paymentId}</em></p>}
                                </Typography>
                        </Grid>
                    </Grid>
                    </Grid>
            </Grid>
        </Paper>
      //))
      }
      </main>
    </React.Fragment>
  );
}

export async function getServerSideProps({params: {id}}) {
    const res = await getData(`order/${id}`)
    return {
      props: { order: res.order }, 
    }
}

export default ViewDetail