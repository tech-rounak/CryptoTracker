
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { SingleCoin } from '../../config/api';
import { CryptoState } from '../../CryptoContext/CryptoContext';
import CoinsInfo from '../../components/CoinsInfo/CoinsInfo';
import { Typography,LinearProgress } from '@mui/material';



const numberWithCommas = (num)=>{
    if(num===undefined)return "";
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
}
const CoinPage =()=>{
     const description= {
        width: "100%",
        fontFamily: "Montserrat",
        padding: 25,
        paddingBottom: 15,
        paddingTop: 0,
        textAlign: "justify",
      }
    const marketData = {
        alignSelf: "start",
        padding: 25,
        paddingTop: 10,
        width: "100%"
    }
    const{id} = useParams();
    const [coin,setCoin] = useState();
    const {currency,symbol} = CryptoState();

    const fetchCoin=async()=>{
        const{data} = await axios.get(SingleCoin(id))
        setCoin(data);
    }
    useEffect(()=>{
        fetchCoin();
    },[]);
    if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;
    // console.log(coin)
    return(
        <div style={{display: "flex"}}>
            <div style={{width: "30%",display:"flex",flexDirection: "column",alignItems: "center", marginTop: 25,borderRight: "2px solid gray"}}>
                <img src = {coin?.image.large} alt ={coin?.image} height="200" style={{marginBottom:20}}/>
                <Typography variant="h3" style={{fontWeight: "bold",marginBottom: 20}}>{coin?.name}</Typography>
                <Typography variant="subtitle1" style={description}>
                    <div dangerouslySetInnerHTML={{__html:(coin?.description.en.split(". ")[0])}} />
                </Typography>
                 <div style={marketData}>
                    <span style={{ display: "flex" }}>
                        <Typography variant="h5" style={{fontWeight: "bold",marginBottom: 20}}>
                        Rank:
                        </Typography>
                        &nbsp; &nbsp;
                        <Typography
                        variant="h5"
                        style={{
                            fontFamily: "Montserrat",
                        }}
                        >
                        {numberWithCommas(coin?.market_cap_rank)}
                        </Typography>
                    </span>

                    <span style={{ display: "flex" }}>
                        <Typography variant="h5" style={{fontWeight: "bold",marginBottom: 20}}>
                        Current Price:
                        </Typography>
                        &nbsp; &nbsp;
                        <Typography
                        variant="h5"
                        style={{
                            fontFamily: "Montserrat",
                        }}
                        >
                        {symbol}{" "}
                        {numberWithCommas(
                            coin?.market_data.current_price[currency.toLowerCase()]
                        )}
                        </Typography>
                    </span>

                   <span style={{ display: "flex" }}>
                        <Typography variant="h5" style={{fontWeight: "bold",marginBottom: 20}}>
                        Market Cap:
                        </Typography>
                        &nbsp; &nbsp;
                        <Typography
                        variant="h5"
                        style={{
                            fontFamily: "Montserrat",
                        }}
                        >
                        {symbol}{" "}
                        {numberWithCommas(
                            coin?.market_data.market_cap[currency.toLowerCase()]
                            .toString()
                            .slice(0, -6)
                        )}
                        M
                        </Typography>
                    </span>
                    
                </div>
            </div>
            <CoinsInfo coin={coin}/>
           
        </div>
    );
}

export default CoinPage