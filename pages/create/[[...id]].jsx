import React from 'react';
import {useState, useContext, useEffect} from 'react'
import {useRouter} from 'next/router'

import {Grid,Container,Button,TextField,Typography, Tooltip, IconButton} from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import SaveTwoToneIcon from '@material-ui/icons/SaveTwoTone';
import HelpTwoToneIcon from '@material-ui/icons/HelpTwoTone';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import {DataContext} from '../../store/GlobalState'
import {imageUpload} from '../../utils/imageUpload'
import {postData, getData, putData} from '../../utils/fetchData'
import Meta from '../../components/Meta'



const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const ProductsManager = () => {
    const initialState = {
        title: '',
        price: 0,
        inStock: 0,
        description: '',
        content: ''
    }
    
    const [product, setProduct] = useState(initialState)
    const {title, price, inStock, description, content} = product
    

    const [images, setImages] = useState([])
    const [tab, setTab] = useState(0)

    const {state, dispatch} = useContext(DataContext)
    const isActive = (index) => {
        if(tab === index) return " active";
        return ""
    }
    const router = useRouter()
    const {id} = router.query
    const [onEdit, setOnEdit] = useState(false)

    useEffect(() => {
        if(id){
            setOnEdit(true)
            getData(`product/${id}`).then(res => {
                setProduct(res.product)
                setImages(res.product.images)
            })
        }else{
            setOnEdit(false)
            setProduct(initialState)
            setImages([])
        }
    },[id])

    const handleChangeInput = e => {
        const {name, value} = e.target
        setProduct({...product, [name]:value})
        dispatch({type: 'NOTIFY', payload: {}})
    }

    const handleUploadInput = e => {
        dispatch({type: 'NOTIFY', payload: {}})
        let newImages = []
        let num = 0
        let err = ''
        const files = [...e.target.files]

        if(files.length === 0) 
        return dispatch({type: 'NOTIFY', payload: {error: 'Files does not exist.'}})

        files.forEach(file => {
            if(file.size > 1024 * 1024)
            return err = 'The largest image size is 1mb'

            if(file.type !== 'image/jpeg' && file.type !== 'image/png')
            return err = 'Image format is incorrect.'

            num += 1;
            if(num <= 5) newImages.push(file)
            return newImages;
        })

        if(err) dispatch({type: 'NOTIFY', payload: {error: err}})

        const imgCount = images.length
        if(imgCount + newImages.length > 5)
        return dispatch({type: 'NOTIFY', payload: {error: 'Select up to 5 images.'}})
        setImages([...images, ...newImages])
    }

    const deleteImage = index => {
        const newArr = [...images]
        newArr.splice(index, 1)
        setImages(newArr)
    }

    const handleSubmit = async(e) => {
        e.preventDefault()

        if(!title || !price || !inStock || !description || !content || images.length === 0)
        return dispatch({type: 'NOTIFY', payload: {error: 'Please add all the fields.'}})

    
        dispatch({type: 'NOTIFY', payload: {loading: true}})
        let media = []
        const imgNewURL = images.filter(img => !img.url)
        const imgOldURL = images.filter(img => img.url)

        if(imgNewURL.length > 0) media = await imageUpload(imgNewURL)
        
        let res;
        if(onEdit){
            res = await putData(`product/${id}`, {...product, images: [...imgOldURL, ...media]})
            if(res.err) return dispatch({type: 'NOTIFY', payload: {error: res.err}})
        }else{
            res = await postData('product', {...product, images: [...imgOldURL, ...media]})
            if(res.err) return dispatch({type: 'NOTIFY', payload: {error: res.err}})
        }

        dispatch({type: 'NOTIFY', payload: {success: res.msg}})
        return router.push('/')
    }


  const classes = useStyles();

  return (
    <Container component="main" maxWidth="md">
       <Meta title='Manage Product' description='Manage Product' />
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
            Manage Product
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
        <Grid container spacing={2}>           
            <Grid item xs={12}  sm={6}>
              <Grid container spacing={2}>            
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    autoFocus
                    fullWidth
                    value={title} 
                    size="small"
                    id="title"
                    label="Title"
                    name="title"
                    autoComplete="title"
                    onChange={handleChangeInput}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="price"
                    name="price"
                    variant="outlined"
                    required
                    fullWidth
                    value={price}
                    type="number"
                    size="small"
                    id="price"
                    label="Price"                    
                    onChange={handleChangeInput}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    value={inStock}
                    type="number"
                    size="small"
                    id="inStock"
                    label="Stock"
                    name="inStock"
                    autoComplete="inStock"
                    onChange={handleChangeInput}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="description"
                    label="Description"
                    placeholder="Description"
                    variant="outlined"
                    required
                    multiline
                    fullWidth
                    value={description}
                    size="small"
                    name="description"                     
                    rows={3}
                    onChange={handleChangeInput}
                  />                  
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="content"
                    label="Content"
                    placeholder="Content"
                    variant="outlined"
                    required
                    fullWidth
                    value={content}
                    size="small"
                    name="content"
                    multiline
                    rows={3}
                    onChange={handleChangeInput}
                  />                  
                </Grid>                
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Grid item xs={12}> 
                  <input
                    accept="image/*"
                    className={classes.input}
                    style={{ display: 'none' }}
                    id="raised-button-file"
                    multiple
                    type="file"
                    onChange={handleUploadInput}
                  />
                  <label htmlFor="raised-button-file">
                    <Button variant="raised" color="primary" component="span" className={classes.button} startIcon={<CloudUploadIcon />}>
                      Upload Product Images
                    </Button>
                  </label> 

                  <Tooltip  title="Maximum five images can be uploaded!">
                    <IconButton aria-label="show 4 new mails" color="inherit">  
                        <HelpTwoToneIcon />    
                    </IconButton>
                </Tooltip>         
              </Grid>
              <Grid item xs={12}> 
                <div className="row img-up mx-0">
                          {
                              images.map((img, index) => (
                                  <div key={index} className="file_img my-1">
                                      <img src={img.url ? img.url : URL.createObjectURL(img)}
                                      alt="" className="img-thumbnail rounded" />

                                      <span onClick={() => deleteImage(index)}>X</span>
                                  </div>
                              ))
                          }
                      </div> 
                </Grid>
            </Grid>
          </Grid>

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
            type="submit"
            variant="contained"
            color="primary"
            style={{margin:'10px'}}
            endIcon={<SaveTwoToneIcon/>}
            className={classes.submit}
          >
            {onEdit ? 'Update': 'Create'}
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default ProductsManager