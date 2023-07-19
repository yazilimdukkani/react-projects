import { Input } from "@mui/icons-material";
import './admincss/yetki.css';
import {auth} from './Ayar';

import { signInWithEmailAndPassword,getAuth,signOut,firebase} from "firebase/auth";
import { useCallback } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {Auth0Provider} from '@auth0/auth0-react';
import { useAuth0 } from '@auth0/auth0-react';
import Home from "./Home";
import { Button } from "@mui/material";
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Menu from "./Menu";
import { Link } from "react-router-dom";
import Footer from "./Footer";
function Sign() {
    
const[email,Setemail]=useState('');
const[password,Setpassword]=useState('');
const[depola,Setdepola]=useState('');




const {loginWithRedirect, logout,isAuthenticated,isLoading,user} =useAuth0();//auth islemi yapılıyor




    return ( 
      <div>

    <div className="arkaplan">
   



    {isLoading?<div> <Box sx={{ width: '100%' }}>
      <LinearProgress />
    </Box></div>:isAuthenticated?
    <div>
      <Menu/>
  
  Hoşgeldiniz burası admin paneli ekranıdır
  <Link to="/Home">Home</Link>
<Footer/>
  </div>
    :<div>
        <Grid container className="admin-buton">
      <Grid xs={6} xsOffset={5}>
    
      <Button onClick={loginWithRedirect} variant="contained" sx={{ backgroundColor:'#673ab7',padding: '25px 3px' }} >Admin panel Giriş</Button>
      </Grid>
        </Grid>
   

           
       
        </div>
}



</div>


    </div>
   );
}

export default Sign;