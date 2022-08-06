import {useEffect, useState} from "react"
import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './Routes/Home';
import Wallet from './Routes/Wallet';
import Switch from '@mui/material/Switch';

function App() {
  const [data, setData] = useState();
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
          console.error('Error fetching nicehash data', e);
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

  return (
    <div className="App">
      <header className="App-header">
        <div style={{width: "92%"}}>
          <Routes>
            <Route path="/" element={<Home data={data}/>} />
            <Route path="/wallet" element={<Wallet data={data}/>} />
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
