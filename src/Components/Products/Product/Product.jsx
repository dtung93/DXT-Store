import React from 'react'
import {Card,CardMedia,CardContent,CardActions,Typography,IconButton} from '@material-ui/core'
import {AddShoppingCart} from '@material-ui/icons'
import useStyles from './styles'
import { ToastContainer,toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const Product = ({ product,onAddToCart }) => {
    const classes=useStyles()
  function Notify(x){
      toast(x+' '+'is'+' '+'added to cart',{
toastId:'toast-notify'

      })
  }
    return (
        
<div>
<Typography variant="h6" style={{fontWeight:'bold'}}>
    {product.price.formatted_with_symbol}
</Typography></div>
                </div>
                <Typography dangerouslySetInnerHTML={{__html: product.description}} variant="body2" color="textSecondary" />
            </CardContent>
            <CardActions disableSpacing className={classes.cardActions}>
<IconButton aria-label="Add To Cart" onClick={()=>{onAddToCart(product.id, 1)
Notify(product.name)}}>
    <ToastContainer 
    rtl
    position="top-right"
autoClose={1000}
hideProgressBar={true}
newestOnTop={false}
closeOnClick
pauseOnFocusLoss
draggable
pauseOnHover
    />
<AddShoppingCart />
</IconButton>
            </CardActions>
        </Card>
    )
}

export default Product
