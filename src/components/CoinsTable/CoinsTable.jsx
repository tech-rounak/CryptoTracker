import React,{useEffect, useState} from 'react';
import {useNavigate} from'react-router-dom';
import { ThemeProvider,createTheme } from '@mui/material/styles';
import { Container } from '@mui/system';
import axios from 'axios';
import { CoinList } from '../../config/api';
import { CryptoState } from '../../CryptoContext/CryptoContext';
import { LinearProgress, Table, TableRow, TableCell, TableContainer, TableHead, TextField, Typography, TableBody } from '@mui/material';
import classes from './CoinsTable.module.css';
import Pagination from "@mui/material/Pagination";
const numberWithCommas = (num)=>{
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
}

const CoinsTable = () =>{
    const history = useNavigate();
    const [coins,setCoins] = useState([]);
    const [loading,setLoading] = useState(false)
    const [search,setSearch] = useState("");
    const {currency,symbol} = CryptoState();
    const [page, setPage] = useState(1);

    const fetchCoins=async()=>{
        setLoading(true);
        const{data} =  await axios.get(CoinList(currency));
        setCoins(data);
        setLoading(false);
    }
    useEffect(()=>{
        fetchCoins();
    },[currency]);

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });
    const handleSearch =()=>{
        return coins.filter((coin)=>coin.name.toLowerCase().includes(search)||coin.symbol.toLowerCase().includes(search))
    }

    return(
        <ThemeProvider theme={darkTheme}>
            <Container style = {{textAlign:'center'}}>
                <Typography variant="h4" style={{margin:14,fontFamily:'Montserrat'}}>CryptoCurrency Prices By MarketCap</Typography>
                <TextField 
                    label="Search For Crypto Currency.."
                    variant='outlined'
                    style={{marginBottom:20,width:"100%"}}
                    onChange={(e)=>setSearch(e.target.value)}
                />
                <TableContainer>
                    {
                        loading?(<LinearProgress style={{backgroundColor:"gold"}}/>):
                        (<Table>
                            <TableHead style={{backgroundColor:"gold"}}>
                                <TableRow>
                                    {["Coin","Price","24 Change","Market Cap"].map((head)=>(
                                    <TableCell style={{color:"black",fontWeight:"700",fontFamily:"Montserrat"}}
                                        key={head} align={head==="Coin"?"":"right"}>
                                            {head}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                    {handleSearch()
                                    .slice((page - 1) * 10, (page - 1) * 10 + 10)
                                    .map((row) => {
                                        const profit = row.price_change_percentage_24h > 0;
                                        return (
                                            <TableRow
                                                onClick={() => history.push(`/coins/${row.id}`)}
                                                className={classes.row}
                                                key={row.name}
                                            >
                                                <TableCell
                                                component="th"
                                                scope="row"
                                                style={{
                                                    display: "flex",
                                                    gap: 15,
                                                }}
                                                >
                                                <img
                                                    src={row?.image}
                                                    alt={row.name}
                                                    height="50"
                                                    style={{ marginBottom: 10 }}
                                                />
                                                <div
                                                    style={{ display: "flex", flexDirection: "column" }}
                                                >
                                                    <span
                                                    style={{
                                                        textTransform: "uppercase",
                                                        fontSize: 22,
                                                    }}
                                                    >
                                                    {row.symbol}
                                                    </span>
                                                    <span style={{ color: "darkgrey" }}>
                                                    {row.name}
                                                    </span>
                                                </div>
                                                </TableCell>
                                                <TableCell align="right">
                                                {symbol}{" "}
                                                {numberWithCommas(row.current_price.toFixed(2))}
                                                </TableCell>
                                                <TableCell
                                                align="right"
                                                style={{
                                                    color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                                                    fontWeight: 500,
                                                }}
                                                >
                                                {profit && "+"}
                                                {row.price_change_percentage_24h.toFixed(2)}%
                                                </TableCell>
                                                <TableCell align="right">
                                                {symbol}{" "}
                                                {numberWithCommas(
                                                    row.market_cap.toString().slice(0, -6)
                                                )}

                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>)
                    }
                </TableContainer>
                <Pagination
                    count={(handleSearch()?.length / 10).toFixed(0)}
                    style={{
                        padding: 20,
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                    }}
                    classes={{ ul: classes.pagination }}
                    onChange={(_, value) => {
                        setPage(value);
                        window.scroll(0, 450);
                    }}
                    />
            </Container>
        </ThemeProvider>
    );
}

export default CoinsTable;