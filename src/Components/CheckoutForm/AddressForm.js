import React,{useState,useEffect} from 'react'
import {InputLabel,Select,MenuItem,Button,Grid,Typography} from '@material-ui/core'
import {Link} from 'react-router-dom'
import {useForm,FormProvider} from 'react-hook-form'
import FormInput from './FormInput'
import {commerce} from '../../lib/commerce'
const AddressForm = ({checkoutToken,next}) => {
    const [shippingCountries,setShippingCountries]=useState([])
    const [shippingCountry,setShippingCountry]=useState('')
    const [shippingSubdivisions,setShippingSubdivisions]=useState([])
    const [shippingSubdivision,setShippingSubdivision]=useState('')
    const [shippingOptions,setShippingOptions]=useState([])
    const [shippingOption,setShippingOption]=useState('')
    const methods=useForm()
    const countries=   Object.entries(shippingCountries).map(([code,name])=>({id:code,label:name}))
    const subdivisions=   Object.entries(shippingSubdivisions).map(([code,name])=>({id:code,label:name}))
    const options =shippingOptions.map((x)=>({id:x.id,label:`${x.description} - (${x.price.formatted_with_code})`}))
 const fetchShippingCountries = async (checkoutTokenId)=>{
const {countries} = await commerce.services.localeListShippingCountries(checkoutTokenId)
setShippingCountries(countries)
setShippingCountry(Object.keys(countries)[0]) 
}
const fetchSubdivisions = async(countryCode)=>{
const {subdivisions}= await commerce.services.localeListSubdivisions(countryCode)
setShippingSubdivisions(subdivisions)
setShippingSubdivision(Object.keys(subdivisions)[0])

}
const fetchShippingOptions = async (checkoutTokenId,country,stateProvince=null)=>{
    const options = await commerce.checkout.getShippingOptions(checkoutTokenId,{country,region:stateProvince})
setShippingOptions(options)
setShippingOption(options[0].id)
}
useEffect(()=>{
fetchShippingCountries(checkoutToken.id)
},[])
useEffect(()=>{
 if (shippingCountry) fetchSubdivisions(shippingCountry)

},[shippingCountry])
useEffect(()=>{
    if(shippingSubdivision) fetchShippingOptions(checkoutToken.id,shippingCountry,shippingSubdivision) 
},[shippingSubdivision])
    return (
        <>
          <Typography variant="h6" gutterBottom>
Địa Chỉ Giao Hàng
          </Typography>
          <FormProvider {...methods}>

<form onSubmit={methods.handleSubmit((data)=>next({...data,shippingCountry,shippingSubdivision,shippingOption}))}>
<Grid container spacing={3}>
<FormInput  name='firstName' label='Tên'/>
<FormInput name='lastName' label='Họ'/>
<FormInput  name='address' label='Địa Chỉ'/>
<FormInput name='streetname' label='Tên Đường,Quận,Huyện' />
<FormInput name='email' id='email' label='Email'/>
<FormInput  name='city' label='Thành Phố'/>
<Grid item xs={12} sm={6}>
<InputLabel>Quốc Gia</InputLabel>
<Select value={shippingCountry} fullWidth onChange={(e)=>setShippingCountry(e.target.value)}>
  {countries.map((country)=>(
<MenuItem key={country.id} value={country.id}>
    {country.label}
</MenuItem>
))}
</Select>


</Grid>
<Grid item xs={12} sm={6}>
<InputLabel>Tỉnh/Thành</InputLabel>
<Select value={shippingSubdivision} fullWidth onChange={(e)=>setShippingSubdivision(e.target.value)}>
  {subdivisions.map((subdivision)=>(
<MenuItem key={subdivision.id} value={subdivision.id}>
    {subdivision.label}
</MenuItem>
))}
</Select>





</Grid>
<Grid item xs={12} sm={6}>
<InputLabel>Lựa chọn giao hàng</InputLabel>
<Select value={shippingOption} fullWidth onChange={(e)=>setShippingOption(e.target.value)}>
  {options.map((option)=>(
<MenuItem key={option.id} value={option.id}>
    {option.label}
</MenuItem>
))}
</Select>





</Grid>
</Grid>
<br />
<div style={{display:'flex', justifyContent:'space-between'}}>
<Button component={Link} to="/cart" variant="outlined">Quay lại giỏ hàng</Button>
<Button type="submit" variant="contained" color="primary">Tiếp tục</Button>
</div>
</form>

          </FormProvider>
        </>
    )
}

export default AddressForm
