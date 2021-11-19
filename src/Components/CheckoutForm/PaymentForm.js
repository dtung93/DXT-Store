import React from 'react'
import {Typography,Button,Divider} from '@material-ui/core'
import { Elements,CardElement,ElementsConsumer } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import Review from'./Review'
const stripePromise=loadStripe('pk_test_51JFBFKHgGsHX8q4pcYLqgFcyHR6tsosAJv50MqSW2UCGKpz0OYpQygeEdmLLGo6MhHODKIbV7xnFpad4Jzy2hSvm00moGR3xZa')
const PaymentForm = ({timeout,checkoutToken,backStep,shippingData,onCaptureCheckout,nextStep}) => {
    const handleSubmit = async (event,elements,stripe)=>{
event.preventDefault()
if(!stripe||!elements) return
const cardElement =elements.getElement(CardElement)
const {error, paymentMethod}= await stripe.createPaymentMethod({type:'card',card:cardElement})
if(error){

    console.log(error)
} else {
   const orderData={
line_items:checkoutToken.live.line_items,
customer:{firstname:shippingData.firstName,lastname:shippingData.lastName,email:shippingData.email},
shipping:{name:'test street',street:shippingData.address,town_city:shippingData.city,
county_state:shippingData.shippingSubdivision,
country:shippingData.shippingCountry
},
fulfillment:{shipping_method:shippingData.shippingOption},
payment:{
    gateway:'stripe',
    stripe:{

payment_method_id:paymentMethod.id

    }
}
   }
onCaptureCheckout(checkoutToken.id,orderData)
timeout()
nextStep()
}
    }


    return (
        <>
        <Review checkoutToken={checkoutToken} />    
<Divider />
<Typography variant="h6" gutterBottom style={{margin:'20px 0'}}>Phương thức thanh toán</Typography>
<Elements stripe={stripePromise}>

<ElementsConsumer>
    {({elements,stripe})=>(
<form onSubmit={(e)=>handleSubmit(e,elements,stripe)}>
<CardElement />
<br /> <br/>
<div style={{display:'flex',justifyContent:'space-between'}}>
    <span style={{fontWeight:'bold',textDecoration:'underline',color:'blue'}}>USE 4242424242 FOR TEST</span>
<Button variant="outlined" onClick={backStep}>Quay lại</Button>
<Button type='submit' variant="contained" disabled={!stripe} color="primary">
    Trả {checkoutToken.live.subtotal.formatted_with_symbol}
    
    </Button>

</div>
</form>


    )}
</ElementsConsumer>
</Elements>
        </>
    )
    }

export default PaymentForm
