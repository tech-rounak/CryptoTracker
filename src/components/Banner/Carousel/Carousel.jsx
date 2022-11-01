import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Classes from "./Carousel.module.css";
import {TrendingCoins} from '../../../config/api'
import { CryptoState } from '../../../CryptoContext/CryptoContext';
import axios from "axios"
import 'react-alice-carousel/lib/alice-carousel.css';
import AliceCarousel from 'react-alice-carousel';

const Carousel = ()=>{
    const numberWithCommas = (num)=>{
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
    }
    const responsive={
        0:{
            items:2,
        },
        512:{
            items:4,
        },
    };
    const [trending,setTrending] = useState([]);
    const{currency,symbol} = CryptoState();
    const fectchTrendingCoins = async() =>{
        // console.log(currency)
        const {data} = await axios.get(TrendingCoins(currency));
        setTrending(data);
    }
    // console.log(trending);
    useEffect(()=>{
        fectchTrendingCoins();
    },[currency])
    const items = trending.map((coin)=>{
        let profit=coin.price_change_percentage_24h >= 0;
        return (
        <Link className={Classes.carouselItem} to={`/coins/${coin.id}`}>
            <img src = {coin?.image}
                alt={coin.name}
                height="60"
                style={{marginBottom:10}} 
            />
            <span style={{color:profit > 0 ?"green":"red"}}>
                {coin?.symbol}
                &nbsp;
                <span>
                    {profit && '+'} {coin?.price_change_percentage_24h.toFixed(2)}%
                </span>
            </span>
            <span style={{fontSize:22,fontWeight:500}}>
                {symbol}{numberWithCommas(coin?.current_price.toFixed(2))}
            </span>
        </Link>
        );
    })
    // console.log(items)
    return(
        <div className={Classes.carousel}>
            <AliceCarousel 
            mouseTracking 
            infinite 
            autoPlayInterval={1000} 
            animationDuration={1500}
            disableDotsControls
            responsive ={responsive}
            disableButtonsControls
            items={items}
            autoPlay
            />
        </div>
    )
}

export default Carousel