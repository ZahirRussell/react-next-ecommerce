import React from 'react';
import { useRouter } from 'next/router'
import { useState, useContext } from 'react'
import { Box,Grid, Button,Container, Typography } from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


import { getData } from '../../utils/fetchData'
import { DataContext } from '../../store/GlobalState'
import { addToCart } from '../../store/Actions'
import Meta from '../../components/Meta'



const ViewDetail = (props) => {
  const [product] = useState(props.product)
  const [tab, setTab] = useState(0)
  const router = useRouter()

  const { state, dispatch } = useContext(DataContext)
  const { cart } = state

  const isActive = (index) => {
      if(tab === index) return " active";
      return ""
  }
  return (  
        <Box m={2} pt={3}>          
          <Meta title={product.title} description={product.description} />
            <Container maxWidth="md">          
            <Grid container spacing={2}>    
                <Grid item sm={7}>
                    <div className="product-gallery">
                    <div className="product-image">
                        <img className="active img-thumbnail rounded" src={ product.images[tab].url } alt={ product.images[tab].url }/>
                    </div>
                    <ul key={ product.images[0].public_id }  className="image-list">
                        {product.images.map((img, index) => (                        
                                <li className="image-item">
                                    <img key={index} src={img.url} alt={img.url}
                                    className={`${isActive(index)} img-thumbnail rounded`}                                
                                    onClick={() => setTab(index)} />
                                </li>                            
                            ))}
                    </ul>
                    </div>
                </Grid>
                <Grid item sm={5}>
                    <Typography component="h2" variant="h4">
                      {product.title}
                  </Typography>
                  <Typography variant="h6">
                        Price: ${product.price}
                  </Typography>
                    <div>
                        <span class="left">{
                                product.inStock > 0
                                ?<Typography variant="h6">In Stock: {product.inStock}</Typography>
                                : <Typography className="text-danger" variant="h6">Stock Out</Typography>
                            }</span><span class="right"><Typography variant="h6">Sold: {product.sold}</Typography></span>
                    </div>
                    <hr/>
                    <div>
                        <p>{product.description}</p>
                  </div>

                      <Button
                        variant="contained"
                        color="primary"
                        className="buttonBack"
                        startIcon={<ArrowBackIcon/>}
                        onClick={() => router.back()}          
                      >
                        Go Back
                      </Button>
                        <Button          
                          variant="contained"
                          color="secondary"
                          type="submit"
                          style={{margin:'10px'}} 
                          endIcon={<AddShoppingCartIcon />}
                          disabled={product.inStock === 0 ? true : false} 
                          onClick={() => dispatch(addToCart(product, cart))} >
                          Add to Cart
                        </Button>   

                    </Grid>
                </Grid>
          </Container>          
        </Box>
  );
}



export async function getServerSideProps({params: {pid}}) {
    const res = await getData(`product/${pid}`)
    return {
      props: { product: res.product }, 
    }
}

// //Here we use getStaticPaths , because this page also statically pre-rendering page that use dynamic routes.

// // This function gets called at build time
// export async function getStaticPaths() {
//     // Call an external API endpoint to get products
//     const res = await getData('product')

//     const ids = res.products.map((product) => product._id)
  
//     // Get the paths we want to pre-render based on products
//     const paths = ids.map((id) => ({
//       params: { id: id }
//     }))

  
//     // We'll pre-render only these paths at build time.
//     // { fallback: false } means other routes should 404.
//     return { paths, fallback: false }
//   }



// export async function getStaticProps({params: {id}}) {
//     const res = await getData(`product/${id}`)
//     return {
//       props: { product: res.product }, 
//     }
// }



export default ViewDetail


