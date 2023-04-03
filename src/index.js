import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import {Footer} from "./components";


ReactDOM.render(
  <BrowserRouter>
    <App style={{maxWidth:1400}}/>
      <Footer />
  </BrowserRouter>,
  document.getElementById('root')
);

