import React,{useState} from 'react';
import { TextField,Button, Typography } from '@mui/material';
import axios from 'axios';
import { CryptoState } from '../../CryptoContext/CryptoContext';
const Login = () => {
    const {setToken,setAlert} = CryptoState();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
   
    const LoginHandler = async() =>{
        try{
            const payload = {
                email:email,
                password:password
            }
            const res = await axios.post('http://localhost:8000/user/login',payload);
            // console.log(res.data)
            localStorage.setItem('token',res.data.result)
            setToken(res.data.result)
            setAlert({
                isOpen:true,
                msg:"Login Successful",
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

            <Button style={{backgroundColor: "gold",height:"3rem",fontWeight:"bold"}} variant="contained" onClick={LoginHandler}>Login</Button>

        </div>   
    )
}
export default Login