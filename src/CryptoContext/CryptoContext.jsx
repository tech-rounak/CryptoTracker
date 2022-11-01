import { useScrollTrigger } from '@mui/material';
import React,{createContext ,useContext,useState,useEffect} from 'react';
import * as axios from 'axios'
const Crypto = createContext()

const CryptoContext = ({children}) =>{
    const[currency,setCurrency] = useState("INR")
    const[symbol,setSymbol]=useState("Rs")
    const[user,setUser] = useState(false);
    const [token,setToken] = useState('');
    const [show,setShow]=useState(false);

    const[alert,setAlert]=useState({
        isOpen:false,
        type:"",
        msg:"",
    });
    useEffect(()=>{
        if(currency === "INR")setSymbol("₹");
        if(currency === "USD")setSymbol("$")
    },[currency])
    useEffect(()=>{
        console.log("useEffect calling authapi");
        const authApi = async()=>{
            try{
                
                const config={ 
                    headers : {
                        'x-auth-token': localStorage.getItem('token'),
                        'Content-Type': 'application/json',
                        'Accept':'application/json',
                    }
                }
                const resp = await axios.get('http://localhost:8000/user',config)
                
                
                console.log("res"+ resp);
                if(resp){
                    setUser(true);
                }
            }
            catch(err){
                setUser(false);
            };
        }
        authApi();
   
    },[user,token])
    return(
        <Crypto.Provider value = {
            {
                currency,
                symbol,
                setCurrency,
                user,
                alert,
                setAlert,
                token,setToken,
                show,setShow

            }
        }>{children}</Crypto.Provider>
    )
}

export default CryptoContext;

export const CryptoState=()=>{
   return useContext(Crypto);
}