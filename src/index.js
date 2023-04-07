import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from "react-router-dom";
import {Footer} from "./components";
import AppController from "./AppController";


ReactDOM.render(
  <BrowserRouter>
    <AppController />
      <Footer />
  </BrowserRouter>,
  document.getElementById('root')
);

