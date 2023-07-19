
import * as React from 'react';
import { styled } from '@mui/material/styles';
import { useAuth0 } from '@auth0/auth0-react';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import Menu from './Menu';
import Footer from './Footer';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// or
import { Input, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { onSnapshot,where,query,orderBy,updateDoc} from 'firebase/firestore';
import { productsRef,db} from "../firebase";
import { useState } from 'react';
import {doc} from 'firebase/firestore';

function Duzenleme() {
    
    const {loginWithRedirect, logout,isAuthenticated,isLoading,user} =useAuth0();//auth islemi yapılıyor
    const url=window.location.pathname;
    const al= url.substr(10);
    
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  

const[baslik,Setbaslik]=useState('');
const[yazi,Setyazi]=useState('');


const handleBaslik=(event)=>{


Setbaslik(event.target.value);

}

const handleYazi=(event)=>{


    Setyazi(event.target.value);
    
    }

const[success,Setsuccess]=useState();
    const handleKonu=(event)=>{


if (baslik == "" || yazi == "") {
    
alert("Boş olamaz");

}
else{


event.preventDefault();
const washingtonRef = doc(db, "products",al);
updateDoc(washingtonRef,{

name:baslik,
description:yazi


});

Setsuccess('İşlem başarılı');


}

    }

    return ( 
    
    <div>
        
        {


isLoading?<div><Box sx={{ width: '100%' }}>
      <LinearProgress />
    </Box></div>:isAuthenticated?<div>

<Menu/>


<Button variant="contained" onClick={handleClickOpen}>
Düzenleme dialog penceresini aç
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
         Düzenleyiniz
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Başlık"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleBaslik}
            value={baslik}
          />
               <TextField
            autoFocus
            margin="dense"
            id="yazi"
            label="yazınızı yazın"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleYazi}
            value={yazi}
          />

{success}

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleKonu}>Subscribe</Button>
        </DialogActions>
      </Dialog>


<Footer/>
</div>:isLoading?<div><Box sx={{ width: '100%' }}>
      <LinearProgress />
    </Box></div>:<div>{window.location.href="Sign"}</div>}
        


    </div> );
}

export default Duzenleme;