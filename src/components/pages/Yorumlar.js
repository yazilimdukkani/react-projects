import LinearProgress from '@mui/material/LinearProgress';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { Button } from '@mui/material';
import { db, Yorumveri,productsRef } from "../firebase";
import {getDocs,querySnapshot,setDoc,query,where,collection,documentId ,onSnapshot,addDoc} from 'firebase/firestore';
import { useState } from 'react';
import Box from '@mui/material/Box';

import * as React from 'react';
import { Grid } from '@mui/material';


import PropTypes from 'prop-types';


import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PeopleAltSharpIcon from '@mui/icons-material/PeopleAltSharp';

function Yorumlar({user}) {


    const[yazi,Setyazi]=useState('');

    
  const url=window.location.pathname;
  const al=url.substr(9);


    const[description,Setdesc]=useState();
    const[price,Setprice]=useState('56');
    
    const ad = user;


    const Write=(event)=>{

        Setyazi(event.target.value);
        
        
        }

const [success,Setsuccess]=useState('');
    const YorumYaz=async()=>{
    
    if (yazi == "") {
      
alert('yazı boş olamaz');

    }
    else{
    
     await addDoc(collection(db, "yorumlar"), {
        name:ad,
        no:al,
        yazi:yazi,
        
      });

Setsuccess('başarıyla yorumunuz eklendi');


    }
    }
   
   

      const [open, setOpen] = React.useState(false);
    
      const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
    
  

    
    return ( <div>
 

<div>
<Grid container spacing={3}>
  <Grid item xs={7}>
  <Button variant="contained" onClick={handleClickOpen} sx={{ backgroundColor:'pink' }}>
        Yorum yaz
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Yorumunuzu yazın</DialogTitle>
        <DialogContent>
          <DialogContentText>
         Küfür içerik yok
          </DialogContentText>
        
          <TextField
            margin="dense"
            id="name"
            label="Yorum yazınız"
            type="text"
            fullWidth
            variant="standard"
          onChange={Write}/>
         
          <Button variant='contained' sx={{ backgroundColor:'purple' }}  onClick={YorumYaz}>Yorum yaz</Button>
          <br></br>
          {success}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
  </Grid>
  </Grid>
 
<br></br>




</div>
    </div> );
}

export default Yorumlar;