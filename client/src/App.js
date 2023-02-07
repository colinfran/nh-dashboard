import { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import Home from "./Routes/Home";
import Wallet from "./Routes/Wallet";
import Switch from "@mui/material/Switch";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import * as React from "react";
import { styled as mstyled } from "@mui/material/styles";
import { usePageVisibility } from "react-page-visibility";

import demoData from "./demo-data/data.json";
import demoTransactions from "./demo-data/transactions.json";
import LogIn from "./Components/LogIn";

const TabsContainer = mstyled(Tabs)(({ theme }) => ({
  backgroundColor: "#49515F",
  color: "white",
}));

function App() {
  const location = useLocation();
  const isDemo = location.pathname.includes("demo");

  const [data, setData] = useState();
  const [transactions, setTransactions] = useState();
  const [timeLeft, setTimeLeft] = useState(0);
  const [refreshOn, setRefreshOn] = useState(!isDemo);

  const isVisible = usePageVisibility();

  let isLoggedInStartup = false
  if (localStorage.getItem("userSession") === null) {
    isLoggedInStartup = false
  }else{
    isLoggedInStartup = true
  }

  localStorage.getItem("mytime")

  const [isLoggedIn, setIsLoggedIn] = useState(isLoggedInStartup);



  const fetchMinerDataProd = async () => {
    try {
      await fetch("/getData")
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setData(data);
        });
    } catch (e) {
      console.error(
        "Error fetching nicehash data; Backend is possibly offline;",
        e
      );
    }
  };

  const fetchMinerDataDemo = async () => {
    setData(demoData);
    console.log(demoData);

  };

  const fetchWalletDataProd = async () => {
    try {
      await fetch("/getWalletTransactions")
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setTransactions(data);
        });
    } catch (e) {
      console.error(
        "Error fetching nicehash transaction data; Backend is possibly offline;",
        e
      );
    }
  };

  const fetchWalletDataDemo = async () => {
    setTransactions({transactions: demoTransactions.slice(0,10)});
    console.log({transactions: demoTransactions.slice(0,10)});

  };

  // get data from backend, fetch every 45 seconds
  // api is rate limitted, so data retrieval will occur every 45 seconds
  // this timer shows the countdown
  useEffect(() => {
    if (refreshOn && isVisible && isLoggedIn) {
      if (timeLeft === 0) {
        fetchMinerDataProd();
        setTimeLeft(45);
        console.log("Data Refreshed. Refreshing Data again in 45 seconds.");
      }
      if (!timeLeft) return;
      const intervalId = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [timeLeft, refreshOn, isVisible, isLoggedIn]);

  useEffect(() => {
    if (isDemo) {
      fetchMinerDataDemo();
      fetchWalletDataDemo();
    } else {
      if (isLoggedIn){
        fetchWalletDataProd();
      }
    }
  }, [isDemo, isLoggedIn]);

  return (
    <div className="App">
      {
         isDemo && !isLoggedIn && (
          <TabsContainer value={location.pathname} centered>
            <Tab label="Rigs" component={Link} to={`/demo`} value={`/demo`} id="1"/>,
            <Tab label="Wallet" component={Link} to={`/demo/wallet`} value={`/demo/wallet`} id="2"/>
          </TabsContainer>
         )
      }
      {
        isLoggedIn && !isDemo && (
          <TabsContainer value={location.pathname} centered>
            <Tab label="Rigs" component={Link} to={`/`} value={`/`} id="1"/>,
            <Tab label="Wallet" component={Link} to={`/wallet`} value={`/wallet`} id="2"/>
          </TabsContainer>
        )
      }
      <header className="App-header">
        {
          isLoggedIn || isDemo ? (
            <div style={{ width: "92%" }}>
              <Routes>
                <Route
                  path="/"
                  element={<Home data={data} transactions={transactions} />}
                />
                <Route
                  path="/wallet"
                  element={
                    <Wallet
                      data={data}
                      transactions={transactions}
                      setTransactions={setTransactions}
                    />
                  }
                />
                <Route
                  path="/demo/"
                  element={<Home data={data} transactions={transactions} />}
                />
                <Route
                  path="/demo/wallet"
                  element={
                    <Wallet
                      data={data}
                      transactions={transactions}
                      setTransactions={setTransactions}
                    />
                  }
                />
              </Routes>
            </div>
          ) : (
            <LogIn setIsLoggedIn={setIsLoggedIn}/>
          )
        }
      </header>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          backgroundColor: "#49515F",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {!isDemo && isLoggedIn && (
          <>
            <Switch checked={refreshOn} onChange={() => setRefreshOn(!refreshOn)} />
            {refreshOn ? (
              <div
                onClick={() => window.location.reload()}
                style={{ color: "#fff", marginLeft: 50 }}
              >{`Refreshing data in ${timeLeft} seconds`}</div>
            ) : (
              <div style={{ color: "#fff", marginLeft: 50 }}>
                Turn on to refresh every 45 seconds
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
