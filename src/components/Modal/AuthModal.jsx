import React,{useState} from 'react'
import  PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import {Box,Modal,Tabs,Tab,Button, AppBar,Typography,TextField} from '@mui/material'
import Login from './Login'
import SignUp from './Signup';
function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
const AuthModal = () => {
    const theme=useTheme();
    const [open,setOpen] = useState(false);
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const openModal=()=>{
        setOpen(true);
    }
    const closeModal=()=>{
        setOpen(false);
    }
    return(
        <div>
            <Button style={{backgroundColor: "gold"}} variant="contained" onClick={openModal}>Login</Button>
            <Modal
                open={open}
                onClose={closeModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: "30%",
                    boxShadow: 24,
                    p: 4,
                    
                }}>
                <AppBar position="static"style={{borderRadius:"10px"}}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="secondary"
                        textColor="inherit"
                        variant="fullWidth"
                        aria-label="full width tabs example"
                        color='primary'
                    >
                    <Tab label="Login" />
                    <Tab label="Sign Up" />
                    </Tabs>

                    <TabPanel value={value} index={0} dir={theme.direction}>
                        <Login />
                    </TabPanel>
                    <TabPanel value={value} index={1} dir={theme.direction}>
                        <SignUp />
                    </TabPanel>
                </AppBar>
                </Box>
            </Modal>
        </div>
    )
}
export default AuthModal