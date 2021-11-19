import React,{useState,useEffect} from 'react'
import {Paper,Stepper,Step,StepLabel,Typography,CircularProgress,Divider,Button} from '@material-ui/core'
import useStyles from './styles'
import AddressForm from '../AddressForm'
import PaymentForm from '../PaymentForm'
import {commerce} from '../../../lib/commerce'
import {Link} from 'react-router-dom'
const steps=['Shipping Address','Payment Details']

const Checkout = ({cart,order,onCaptureCheckout,error}) => {
    const[activeStep,setActiveStep]=useState(0)
    const [checkoutToken,setCheckoutToken]=useState(null)
    const [shippingData,setShippingData]=useState({})
    const[isFinished,setIsFinished]=useState(false)
    const classes= useStyles()
    useEffect(()=>{
        const generateToken= async ()=>{
            try{
const token= await commerce.checkout.generateToken(cart.id,{type:'cart'})
     console.log(token)
     setCheckoutToken(token)
} catch (error){
console.log(error)
            }
        }
        generateToken()
    },[cart])
const nextStep =()=>setActiveStep((prevActiveStep)=>prevActiveStep+1)
const backStep =()=>setActiveStep((prevActiveStep)=>prevActiveStep-1)

    const next =(data)=>{
setShippingData(data)
nextStep()
    }
    const timeout = ()=>{
        setTimeout(()=>{setIsFinished(true)},4000)
    }
    let Confirmation =()=> order.customer ? (
<>
<div>
<Typography variant="h5" style={{color:'red'}}>Đặt hàng thành công, Xin cảm ơn &nbsp;{order.customer_name} {order.customer_email}</Typography>
<Divider className={classes.divider} />
<Typography variant="subtitle2">Đơn hàng refence: {order.customer_reference}, sẽ được gửi đến {order.customer_billing_address}</Typography>
</div>
<br />
<Button component={Link} to="/" variant="outlined" type="button">Quay lại trang chính</Button>
</>
    ) : isFinished ? (<>
        <div>
        <Typography variant="h5" style={{color:'red'}}>Đặt hàng thành công!!! Xin cảm ơn &nbsp;{order.customer_name} </Typography>
        <Divider className={classes.divider} />
        <Typography variant="subtitle2">Đơn hàng ******** {order.customer_reference}, sẽ được gửi đến {order.customer_address}</Typography>
        </div>
        <br />
        <Button component={Link} to="/" variant="outlined" type="button">Quay lại trang chính</Button>
        </>):(
        <div className={classes.spinner}>
<CircularProgress />
        </div>
    )
    if(error){
        <>
        <Typography varian="h5">

            Error:{error}
        </Typography>
        <br />
        <Button component={Link} to="/" variant="outlined" type="button">Quay lại</Button>
        </>
    }
    const Form =()=> activeStep === 0
    ?<AddressForm checkoutToken={checkoutToken} setShippingData={setShippingData} next={next} />
    :<PaymentForm nextStep={nextStep} shippingData={shippingData} checkoutToken={checkoutToken} backStep={backStep} onCaptureCheckout={onCaptureCheckout} timeout={timeout}/>
    
    return (
        <>
          <div className={classes.toolbar} />
          <main className={classes.layout}>
<Paper className={classes.paper}>
<Typography variant="h4" align="center">
Thanh toán
</Typography>
<Stepper activeStep={0} className={classes.stepper}>
{steps.map((step)=>(
    <Step key={step}>
    <StepLabel>{step}</StepLabel>
    </Step>
))}

</Stepper>
{activeStep === steps.length ?<Confirmation /> : checkoutToken && <Form/>}
</Paper>


          </main>
        </>
    )
}

export default Checkout
