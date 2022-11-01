import React from 'react';
import {Snackbar,Alert, alertTitleClasses} from '@mui/material'
import {CryptoState} from '../../CryptoContext/CryptoContext';
const Toast = () => {
    const {alert,setAlert} = CryptoState();
    // console.log(alert);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setAlert({isOpen:false});
      };
    return (
       <div>
           <Snackbar anchorOrigin={{ vertical:'top',horizontal:'center'}}
                    open={alert.isOpen} 
                    // autoHideDuration={6000}
                    onClose={handleClose}>
                <Alert variant ="filled" onClose={handleClose} severity={alert.type} sx={{ width: '100%' }}>
                    {alert.msg}
                </Alert>
          </Snackbar>
       </div>
    );
}
export default Toast;