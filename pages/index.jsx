import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { getData } from '../utils/fetchData'
import ProductItem from '../components/product/ProductItem'
import Copyright from '../src/Copyright';
import Meta from '../components/Meta';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  
}));

const Home = ({products}) => {
  const classes = useStyles();

  return(
    <React.Fragment>
      <Meta title="Astha e-Commerce Home Page" description="All Products" />
      <main>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
           {             
             products.length === 0 
              ? <h2>No Products</h2>
              : products.map(product => (
                <ProductItem key={product._id} product={product} />
              ))
            }
          </Grid>
        </Container>
      </main>
      <footer>        
          <Copyright />
      </footer>
    </React.Fragment>
  )
}

// // Here we use getStaticProps, beacause this page is not not user-specific.
// export async function getStaticProps() {
//   const res = await getData('product')
//   return {
//     props: {
//       products: res.products,
//       notFound: true
//     }, 
//   }
// }

// Here we use getStaticProps, beacause this page is not not user-specific.
export async function getServerSideProps() {
  const res = await getData('product')
  return {
    props: {
      products: res.products,
      notFound: true
    }, 
  }
}

export default Home