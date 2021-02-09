import React, { useContext } from 'react'
import {useRouter} from 'next/router'
import Link from 'next/link'

import { AppBar, Badge, IconButton, Toolbar,Tooltip, Typography } from '@material-ui/core'
import { makeStyles } from "@material-ui/core/styles";
import ListIcon from '@material-ui/icons/List';
import ListAltTwoToneIcon from '@material-ui/icons/ListAltTwoTone';
import LocalMallTwoToneIcon from '@material-ui/icons/LocalMallTwoTone';

import {DataContext} from '../store/GlobalState'


const useStyles = makeStyles(theme => ({
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
}));


function Nav () {
  const classes = useStyles();
  const router = useRouter()
  const {state, dispatch} = useContext(DataContext)
  const { cart } = state


    const isActive = (r) => {
        if(r === router.pathname){
            return " active"
        }else{
            return ""
        }
    }
    return (
      <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
            <Link color="textPrimary" href="/" className={classes.link}>
              E Commerce
            </Link>
          </Typography>
          <nav>
            <Link variant="button" color="textPrimary" href="/cart" className={classes.link}>
              <IconButton aria-label="show 4 new mails" color="inherit">  
                <Tooltip title="Cart Item" arrow>
                  <Badge badgeContent={cart.length} color="secondary">
                    <LocalMallTwoToneIcon />                                         
                  </Badge>
                </Tooltip> 
                </IconButton>
            </Link>
            <Link variant="button" color="textPrimary" href="/myOrder" className={classes.link}>
              <Tooltip  title="Order List">
                <IconButton aria-label="show 4 new mails" color="inherit">  
                    <ListIcon />    
                </IconButton>
             </Tooltip>              
            </Link>

            <Link variant="button" color="textPrimary" href="/manageProducts" className={classes.link}>
              <Tooltip title="Manage Products" arrow>
                <IconButton aria-label="show 4 new mails" color="inherit">  
                              <ListAltTwoToneIcon />     
                  </IconButton>
              </Tooltip>
            </Link>
          </nav>
          
        </Toolbar>
      </AppBar>
    )
  }
  
  export default Nav
  
