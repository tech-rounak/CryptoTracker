import React from 'react';
import classes from './App.module.css';
import { BrowserRouter,Route ,Routes} from 'react-router-dom';
import Header from './components/Header/Header';
import Homepage from './Pages/Homepage/Homepage';
import CoinPage from './Pages/CoinPage/CoinPage';
import Toast from './components/Alert/Alert'
function App(){
  return (
    <BrowserRouter>
      <div className = {classes.App}>
        <Header />
          <Routes>
            <Route path='/' element={<Homepage />}/>
            <Route path='/coins/:id' element={<CoinPage />} />
          </Routes>
      </div>
      <Toast />
    </BrowserRouter>
  )
}

export default App;

// API key: DSI38OV06PT8FR29. 