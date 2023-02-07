import React, {useState, useRef} from "react";
import { Link } from "react-router-dom";
import uniqid from 'uniqid';

import nhlogo from "./nhlogo.png"
import "./index.css"

const LogIn = (props) => {

  const [errorOccured, setErrorOccured] = useState(false);
  const inputEmailRef = useRef(null);
  const inputPasswordRef = useRef(null);

  const validateLogin = async () => {
    console.log(inputEmailRef.current.value)
    console.log(inputPasswordRef.current.value)
    if (!inputEmailRef.current.value ) {
      return setErrorOccured(true)
    } else if (!inputPasswordRef.current.value) {
      return setErrorOccured(true)
    }
    try {
      await fetch("/loginUser",
      {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: inputEmailRef.current.value,
          password: inputPasswordRef.current.value,
        })
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.loggedIn){
            props.setIsLoggedIn(true)
            localStorage.setItem("userSession", uniqid())
          }else{
            setErrorOccured(true)
          }
        });
    } catch (e) {
      console.error(
        "Error fetching nicehash transaction data; Backend is possibly offline;",
        e
      );
    }
  }

  return (
    <>
      <div className="NHApp">
        <img src={nhlogo} className="logo" alt="Business view - Reports" />
        <div className="form">
          <div className="LoginError" style={{visibility: errorOccured ? "initial": "hidden"}}>Login Failed. Please provide a correct email and password.</div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" placeholder="email@email.com" ref={inputEmailRef} />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" ref={inputPasswordRef} onKeyDown={(e) => e.key === 'Enter' && validateLogin()}/>
          </div>
          <button className="primary" onClick={()=>validateLogin()}>Login</button>
        </div>
      </div>
      <Link className="DemoButton" to="/demo">Check out the demo</Link>
    </>
  );
}

export default LogIn;