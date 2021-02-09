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

import { patchData } from '../utils/fetchData'
import { Box, Container, Tooltip } from '@material-ui/core';
import Meta from '../components/Meta';

const MyOrder = () => {
    const {state, dispatch} = useContext(DataContext)
    const { notify, orders } = state

    return( 
        <Box m={2} pt={3}>
          <Meta title="My Order Page" description="Order List" />
          <Container maxWidth="md">
            <div className="profile_page">
                <section className="row text-secondary my-3">              
                <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell align="right">Date</TableCell>
                        <TableCell align="right">Total</TableCell>
                        <TableCell align="right">Delivered</TableCell>
                        <TableCell align="right">Paid</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {orders.map((order) => (
                        <TableRow key={order._id}>
                        <TableCell component="th" scope="row">
                            <Link href={`/order/${order._id}`}>
                                <a>{order._id}</a>
                            </Link>
                        </TableCell>
                        <TableCell align="right">{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell align="right">${order.total}</TableCell>
                        <TableCell align="right">
                            {
                                order.delivered
                                ?
                                <Tooltip title="Done" arrow>
                                    <DoneAllIcon color="primary"/>
                                </Tooltip>                     
                                :     
                                <Tooltip title="Pending" arrow>
                                    <UpdateIcon className="text-danger"/>
                                </Tooltip>
                            }
                        </TableCell>
                        <TableCell align="right">
                            {
                            order.paid
                            ? 
                                <Tooltip title="Done" arrow>
                                    <DoneAllIcon color="primary"/>
                                </Tooltip>                         
                            :     
                                <Tooltip title="Pending" arrow>
                                    <UpdateIcon className="text-danger"/>
                                </Tooltip>
                            }
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>              
                </section>
            </div>
        </Container>
        </Box>
    )
}

export default MyOrder

