import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


import {Auth0Provider} from '@auth0/auth0-react';
import { BrowserRouter } from 'react-router-dom';

import {Routes,Route} from 'react-router-dom'
import Konular from './components/pages/Konular';

import Sign from './components/admin/Sign';
import Home from './components/admin/Home';
import Menu from './components/admin/Menu';
import Arama from './components/admin/Arama';
import Duzenleme from './components/admin/Duzenleme';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  
<React.StrictMode>
 

<BrowserRouter>
<Auth0Provider domain={process.env.REACT_APP_AUTH0_DOMAIN} clientId={process.env.REACT_APP_CLIENT_ID} redirectUri={window.location.origin}>

<Routes>
       
<Route path="Konular/:memeberId" element={<Konular />} />
<Route path="/" element={<App />} />

         

      </Routes>
      </Auth0Provider>
      

<Auth0Provider
    domain="dev-hzqei4oajozcl4fz.us.auth0.com"
    clientId="fQU12Vxtc0wYJnE5hFIhFpBLFqCL3VPV"
   
      redirectUri="http://localhost:3000/Sign">
<Routes>



<Route path='Sign' element={<Sign/>}/>
<Route path='Home' element={<Home/>}/>
<Route path='Menu' element={<Menu/>}/>
<Route path='Arama' element={<Arama/>}/>
<Route path='Duzenleme/:id' element={<Duzenleme/>}/>
</Routes>
</Auth0Provider>
</BrowserRouter>

</React.StrictMode>










 
  
  

   
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
