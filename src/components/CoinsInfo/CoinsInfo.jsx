import { CircularProgress } from '@mui/material';
import { ThemeProvider,createTheme } from '@mui/material/styles';
import axios from 'axios';
import React,{useEffect, useState} from 'react';
import { HistoricalChart } from '../../config/api';
import { CryptoState } from '../../CryptoContext/CryptoContext';
// import {Chart as ChartJS ,CategoryScale} from 'chart.js'
import { Line }from 'react-chartjs-2';
import SelectButton from '../SelectButton/SelectButton';
import { chartDays } from "../../config/data";

import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const CoinsInfo = ({coin})=>{
    const[historicData, setHistoricData] =useState();
    const [days,setDays] = useState();
    const [flag,setflag] = useState(false);

    const{currency} = CryptoState();

    const fetchHistoricalData=async()=>{
        const {data} = await axios.get(HistoricalChart(coin.id,days,currency));
        setflag(true);
        setHistoricData(data.prices);
    }
    // console.log(historicData);
    useEffect(()=>{
        fetchHistoricalData();
    },[days,currency])
    
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });
    return(
      <ThemeProvider theme={darkTheme}>
        <div style={{
            width:"75%",
            display:"flex",
            flexDirection:"column",
            alignItems:"center",
            justifyContent:"center",
            marginTop:25,
            padding:40,
        }}>
        {
            !historicData | flag === false ?(
                <CircularProgress style={{color:"gold"}} size ={250} thickness={1} />
            ):(
                <>
                <Line
                    data={{
                        labels: historicData.map((coin) => {
                        let date = new Date(coin[0]);
                        let time =
                            date.getHours() > 12
                            ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                            : `${date.getHours()}:${date.getMinutes()} AM`;
                        return days === 1 ? time : date.toLocaleDateString();
                        }),

                        datasets: [
                        {
                            data: historicData.map((coin) => coin[1]),
                            label: `Price ( Past ${days} Days ) in ${currency}`,
                            borderColor: "#EEBC1D",
                        },
                        ],
                    }}
                    options={{
                        elements: {
                        point: {
                            radius: 1,
                            },
                        },
                    }}
                    />
                    <div style={{
                            display: "flex",
                            marginTop: 20,
                            justifyContent: "space-around",
                            width: "100%",
                        }}
                        >
                        {
                            chartDays.map((day) => (
                                <SelectButton
                                key={day.value}
                                onClick={() => {setDays(day.value);
                                    setflag(false);
                                }}
                                selected={day.value === days}
                                >
                                {day.label}
                                </SelectButton>
                            ))
                        }
                    </div>
                </>
            )}
        </div>
      </ThemeProvider>
    );
}
export default CoinsInfo;