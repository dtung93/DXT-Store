
import emailjs from 'emailjs-com'
import {init} from 'emailjs-com'
import React, { Component } from 'react'
emailjs.init("user_V9KiezCH0jF9A3TE8HU1T")

export default class Mail extends Component {
constructor(props){
    super(props)
this.state={from_name:'Tung',to_name:'',message:'',to_email:"",reply_to:'',bcc:[],info:''}
}
sendMail=(e)=>
{
   
let [Service_ID, Template_ID,templateParams]=['service_95eszgo', 'template_n8bquii', this.state]
  
    emailjs.send(Service_ID, Template_ID, this.state)
        .then(function(response) {
           console.log('SUCCESS!', response.status, response.text);
alert('SUCCESS!');
        }, function(error) {
           console.log('FAILED...', error);
        });
}

updateState=(e)=>{
    this.setState({[e.target.name]:e.target.value})
}

render(){
    return(
        <>
        Ho ten nhan <input type="text" name="to_name"  onChange={this.updateState} /> <br />
        Email nhan<input type="text" name="to_email" onChange={this.updateState} /> <br />
        Noi dung: 
            <textarea name="message"  onChange={this.updateState}  ></textarea> <br />

        <input type='button' value='send mail' onClick={this.sendMail} />
        </>
    )
}
}
