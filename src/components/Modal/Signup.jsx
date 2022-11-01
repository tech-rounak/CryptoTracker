import React from 'react';
import { TextField,Button, Typography } from '@mui/material';
import { useState } from 'react';
import {CryptoState} from '../../CryptoContext/CryptoContext';
import axios from 'axios';
const SignUp = () => {
    const {setToken} = CryptoState();

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword]= useState('');
    const {alert,setAlert} = CryptoState();
    console.log(alert)
    const checkPassword = ()=>{
        if(password !== confirmPassword){
            setAlert({
                isOpen:true,
                msg:"Password Do NotMatch",
                type:"warning"
            })
            return;
        }
    };
    const SignupHandler = async() =>{
        try{
            const payload = {
                email:email,
                password:password
            }
            const res = await axios.post('http://localhost:8000/user/signup',payload);
            localStorage.setItem('token',res.data.result)
            setToken(res.data.result)
            setAlert({
                isOpen:true,
                msg:"Signup Successfull",
                type:"success"
            })
        }
        catch(error){
            console.log(error)
            setAlert({
                isOpen:true,
                msg:error.response.data.msg,
                type:"error"
            })
        }
    }
    return (
        <div style={{display:"flex",flexDirection:"column",columnGap:"10px"}}>
            <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth
                            style={{marginBottom:"22px"}}
                            onChange = {(e)=>setEmail(e.target.value)}
                        />
            <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth
                            style={{marginBottom:"22px"}}
                            onChange = {(e)=>setPassword(e.target.value)}
                        />
            <TextField id="outlined-basic" label="Confirm Password" variant="outlined" fullWidth
                        style={{marginBottom:"22px"}}
                        onBlur = {(e)=>setConfirmPassword(e.target.value)}
                    />
            <Button style={{backgroundColor: "gold",height:"3rem",fontWeight:"bold"}} variant="contained" onClick={SignupHandler}>Signup</Button>
        </div>   
    )
}
export default SignUp