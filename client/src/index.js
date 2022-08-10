import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
);

reportWebVitals();

const warn = console.warn;

function logWarning(...warnings){
  let showWarning = true;
  warnings.forEach(warning => {
    if (warning.includes("UNSAFE_")) showWarning = false;
    else if (warning.includes("SourceMap")) showWarning = false;
    else if (warning.includes("source map")) showWarning = false;
    else if (warning.includes("DevTools")) showWarning = false;
  });
  if(showWarning) warn(...warnings);
}

console.warn  = logWarning;