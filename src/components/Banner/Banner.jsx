import { Typography,Select,MenuItem} from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';
import { CryptoState } from '../../CryptoContext/CryptoContext';
import Classes from "./Banner.module.css"
import Carousel from "./Carousel/Carousel"

const Banner = () =>{
    const {show,setShow,setAlert,setToken} = CryptoState();
    const logoutHandler = ()=>{
        localStorage.removeItem('token');
        setToken(null);
        setShow(false);
        setAlert({
            isOpen:true,
            msg:"Logout Successfull",
            type:"success"
        })
    }
    const isLogin = (
        <div>
        <Select variant ="standard" defaultOpen="true"
            style ={{width: "100%",
                    height: "40px",
                    color:'white'}}
             >
           <MenuItem value={"My DashBoard"}>My DashBoard</MenuItem>
           <MenuItem value={"Logout"} onClick={logoutHandler}>Logout</MenuItem>
       </Select>
       </div>
    );
    return(
        <div className={Classes.bannerBack}>
            <Container className={Classes.bannerContent}>
                {show?<div className={Classes.drop}>{isLogin}</div>:null}
                <div className = {Classes.tagline}>
                    <Typography variant ="h2" style={{fontWeight:"bold",marginBottom:15,fontFamily:"Montserrat"}}>
                        Crypto Tracker
                    </Typography>
                    <Typography variant="subtitle2" style={{color:"darkgrey",textTransform:"capitalize",fontFamily:"Montserrat"}}>
                        Get all the info regarding your favourite Crypto
                    </Typography>
                    
                </div>
                <Carousel />
            </Container>
        </div>
    )
};

export default Banner;