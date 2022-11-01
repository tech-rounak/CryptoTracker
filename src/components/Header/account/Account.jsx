import React, { Component } from 'react';
import { Avatar,Select,MenuItem,InputLabel } from '@mui/material';
import { useState } from 'react';
import CryptoContext, { CryptoState } from '../../../CryptoContext/CryptoContext';
const Account = () =>{
    
    
    const {show,setShow}=CryptoState()
    // console.log(show)
    return(
        <div>
          <Avatar sx={{ bgcolor: "gold" ,cursor :"pointer"}} onClick={()=>setShow(!show)}/>
        </div>
    );
}

export default Account