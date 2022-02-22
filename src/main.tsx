import React from 'react'
import ReactDOM from 'react-dom'
import "../styles/main.css"
import {BrowserRouter} from "react-router-dom"
import { Routing } from './Routing'
import { QueryClient, QueryClientProvider } from 'react-query'
const queryClient = new QueryClient();
ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <React.StrictMode>
        <Routing />
      </React.StrictMode>
    </BrowserRouter>
  </QueryClientProvider>,
  document.getElementById('root')
)
