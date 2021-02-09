import { useState, useContext, useEffect } from 'react'
import { DataContext } from '../store/GlobalState'
import Link from 'next/link'
import * as React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import UpdateIcon from '@material-ui/icons/Update';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';
import AddBoxTwoToneIcon from '@material-ui/icons/AddBoxTwoTone';

import { patchData } from '../utils/fetchData'
import { Box, Button, Container, IconButton, Tooltip } from '@material-ui/core';
import Meta from '../components/Meta';
import { getData} from '../utils/fetchData'

const ManageProducts = ({products}) => {
    const { dispatch } = useContext(DataContext)
    return( 
        <Box m={2} pt={3}>
          <Meta title="Product Manage" description="Product List" />
          <Container maxWidth="md">  
            <section className="row text-secondary my-3">             
                <Link href={'create'}>
                    <a>
                       <Button
                          variant="contained"
                          color="secondary"
                          fullWidth={true}
                        endIcon={<AddBoxTwoToneIcon/>}
                        >
                        Create New
                    </Button>                        
                    </a>
                </Link>   
                         
                <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right">Stock</TableCell>
                        <TableCell align="right">Action</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {products.map((product) => (
                        <TableRow key={product._id}>
                        <TableCell component="th" scope="row">
                            {product.title}
                        </TableCell>
                        <TableCell align="right">${product.price}</TableCell>
                        <TableCell align="right">{product.inStock}</TableCell>
                        <TableCell align="right">
                        <Link href={`/create/${product._id}`}>
                             <IconButton color="primary">
                                <EditTwoToneIcon />
                            </IconButton>
                        </Link>                           

                            <IconButton aria-label="delete" color="secondary">
                                <DeleteTwoToneIcon 
                                onClick={() => dispatch({
                                    type: 'ADD_MODAL',
                                    payload: [{ data: '', id: product._id, title: product.title, isOpen:true, type: 'DELETE_PRODUCT' }]
                                })}
                                />
                            </IconButton>  
                        </TableCell>                        
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>              
            </section>
        </Container>
        </Box>
    )
}
export async function getServerSideProps() {
    const res = await getData('product')
    return {
      props: {
        products: res.products
      },
    }
  }
export default ManageProducts

