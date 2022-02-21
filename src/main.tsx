import React from 'react'
import ReactDOM from 'react-dom'
import "../styles/main.css"
import {BrowserRouter} from "react-router-dom"
import { Routing } from './Routing'

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode> 
      <Routing />
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
)
