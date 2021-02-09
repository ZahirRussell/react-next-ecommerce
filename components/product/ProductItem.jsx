import { useContext } from 'react'
import Link from 'next/link'
import {Grid, Card,Button,CardActions,CardContent,CardMedia,Typography} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { DataContext } from '../../store/GlobalState'

const useStyles = makeStyles(theme => ({
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      },
      cardMedia: {
        paddingTop: '56.25%', // 16:9
      },
      cardContent: {
        flexGrow: 1,
      },
  }));
  
  
const ProductItem = ({product}) => {
    const classes = useStyles();
    const { state, dispatch } = useContext(DataContext);
    const { cart } = state;
      return (
            <Grid item xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={product.images[0].url} 
                    title={product.images[0].url} 
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                            {product.title}
                    </Typography>
                    <Typography>
                        <div style={{display:'flex', justifyContent:'space-between'}}>
                                <h5>${product.price}</h5>
                                {
                                product.inStock > 0
                                ? <h5 className="text-danger">In Stock: {product.inStock}</h5>
                                : <h5 className="text-danger">Out Stock</h5>
                                }
                        </div>                       
                    </Typography>
                    <Typography>
                        {product.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Link href={`product/${product._id}`}>
                        <a style={{marginLeft: '5px', flex: 1}}
                        >
                        <Button
                            variant="contained"
                            color="secondary"
                            fullWidth={true}
                            className={classes.button}
                            endIcon={<VisibilityIcon/>}
                            >
                            View Detail
                        </Button>                        
                            </a>
                    </Link>
                  </CardActions>
                </Card>
            </Grid>
      )
    }
    
export default ProductItem