import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


import {Auth0Provider} from '@auth0/auth0-react';
import { BrowserRouter } from 'react-router-dom';

import {Routes,Route} from 'react-router-dom'
import Konular from './components/pages/Konular';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<React.StrictMode>
 

 <Auth0Provider domain={process.env.REACT_APP_AUTH0_DOMAIN} clientId={process.env.REACT_APP_CLIENT_ID} redirectUri={window.location.origin}>
<BrowserRouter>

<Routes>
       
<Route path="Konular/:memeberId" element={<Konular />} />
<Route path="/" element={<App />} />
      </Routes>

</BrowserRouter>


</Auth0Provider>





 
   </React.StrictMode>
  

   
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
