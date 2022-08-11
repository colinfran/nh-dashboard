import {useEffect, useState} from "react"
import './App.css';
import { Routes, Route, Link, useLocation } from "react-router-dom";
import Home from './Routes/Home';
import Wallet from './Routes/Wallet';
import Switch from '@mui/material/Switch';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import * as React from "react";
import { styled as mstyled} from '@mui/material/styles';

const TabsContainer = mstyled(Tabs)(({ theme }) => ({
  backgroundColor: "#49515F",
  color:"white"
}));

function App() {
  const [data, setData] = useState();
  const [transactions, setTransactions] = useState();
  const [timeLeft, setTimeLeft] = useState(0);
  const [refreshOn, setRefreshOn] = useState(true);

  // get data from backend, fetch every 45 seconds
  // api is rate limitted, so data retrieval will occur every 45 seconds
  // this timer shows the countdown
  useEffect(() => {
    if (refreshOn){
      async function fetchData() {
        try {
          await fetch('/getData')
          .then(response => response.json())
          .then(data => {
            console.log(data)
            setData(data)
          });
        } catch (e) {
          console.error('Error fetching nicehash data; Backend is possibly offline;', e);
        };
      };
      if(timeLeft===0){
        fetchData();
        setTimeLeft(45)
        console.log('Data Refreshed. Refreshing Data again in 45 seconds.');
      }
      if (!timeLeft) return;
      const intervalId = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [timeLeft, refreshOn]);

  useEffect(() => {
    async function fetchData() {
      try {
        await fetch('/getWalletTransactions')
        .then(response => response.json())
        .then(data => {
          console.log(data)
          setTransactions(data)
        });
      } catch (e) {
        console.error('Error fetching nicehash transaction data; Backend is possibly offline;', e);
      };
    };
    fetchData();
  }, []);

  const location = useLocation();

  return (
    <div className="App">
      <TabsContainer value={location.pathname} centered >
        <Tab 
          label="Rigs"
          component={Link}
          to={`/`}
          value={`/`} 
        />
        <Tab 
          label="Wallet"
          component={Link}
          to={`/wallet`}
          value={`/wallet`} 
        />
      </TabsContainer>
      <header className="App-header">
        <div style={{width: "92%"}}>
          <Routes>
            <Route path="/" element={<Home data={data} transactions={transactions}/>} />
            <Route path="/wallet" element={<Wallet data={data} transactions={transactions} setTransactions={setTransactions}/>} />
          </Routes>
        </div>
      </header>
      <div style={{display:"flex", flexDirection:"row", backgroundColor: "#49515F",justifyContent: "center", alignItems: "center"}}>
        <Switch checked={refreshOn} onChange={()=>setRefreshOn(!refreshOn)}/>
        {refreshOn ? (<div onClick={()=>window.location.reload()} style={{color:"#fff", marginLeft: 50}}>{`Refreshing data in ${timeLeft} seconds`}</div>) : (<div style={{color:"#fff", marginLeft: 50}}>Turn on to refresh every 45 seconds</div>)}
      </div>
    </div>
  );
}

export default App;
