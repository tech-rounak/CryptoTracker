import { AppBar, MenuItem, Toolbar, Typography,Select} from '@mui/material';
import { Container } from '@mui/system';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React from 'react';
import{ useNavigate} from'react-router-dom'
import { CryptoState } from '../../CryptoContext/CryptoContext';
import { useState } from 'react';
import AuthModal from '../Modal/AuthModal'
import Account from './account/Account';
const Header=()=>{
    const darkTheme = createTheme({
        palette: {
          mode: 'dark',
        },
      });
      
    const history = useNavigate()
    
    const {currency,token,setCurrency,user} = CryptoState()
    
   
    console.log("User : "+user)
    console.log("token:"+token)
    return(
        <ThemeProvider theme={darkTheme}>
            <AppBar color='transparent' position='static'>
                <Container>
                    <Toolbar>
                        <Typography 
                        style={{flex:1,color : "gold",fontFamily: "Montserrat",fontWeight: "bold",cursor: "pointer"}}
                        onClick={()=>history("/")} variant = "h6"
                        >CryptoTracker</Typography>

                        <Select variant ="outlined" style ={{width:100,height:40,marginRight:15}}
                         value={currency} onChange={(e)=>setCurrency(e.target.value)}>
                            <MenuItem value={"USD"}>USD</MenuItem>
                            <MenuItem value={"INR"}>INR</MenuItem>
                        </Select>
                        {!user?<AuthModal />:<Account/>}
                    </Toolbar>
                </Container>
            </AppBar>
        </ThemeProvider>
    )
}
export default Header;