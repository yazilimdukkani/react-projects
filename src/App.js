import logo from './logo.svg';
import './App.css';

import {Routes,Route} from 'react-router-dom'


import * as React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import { useState,useEffect } from 'react';
import Kontrol from './components/Kontrol';



import { UserproductsLister ,addProduct} from './components/firebase';
import { productsRef,db } from './components/firebase';
import Kullanici from './components/Kullanici';


import Navbar from './components/Navbar';

import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import Paginated from './components/Paginated';



import Grid from '@mui/material/Grid';
import Tablo from './components/Tablo';

import { styled } from '@mui/system';
import { TextareaAutosize } from '@mui/base';
import Input from '@mui/base/Input';
import { Button } from '@mui/material';
import Konular from './components/pages/Konular';
import {BrowserRouter} from 'react-router-dom';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {getFirestore,collection,onSnapshot,deleteDoc,doc,addDoc,updateDoc,setDoc,query,where,documentId} from 'firebase/firestore';
import Konuekle from './components/Konuekle';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

function App({us}) {
  
// burda stateler
  const[users,Setusers]=useState([]);
  const[veriler,Setveriler]=useState([]);//veritabanındaki konuların verilerini ceker baham
 const {loginWithRedirect, logout,isAuthenticated,isLoading,user} =useAuth0();//auth islemi yapılıyor

// burda stateler

 useEffect(()=>{
  return onSnapshot(productsRef,(snapshot)=>{
  
Setveriler(snapshot.docs.map(doc => ({id: doc.id, ...doc.data()})));
  

 
  
  });
  
  
},[]);

//const items=veriler;


const [itemOffset, setItemOffset] = useState(0);

// Simulate fetching items from another resources.
// (This could be items from props; or items loaded in a local state
// from an API endpoint with useEffect and useState)

const itemsPerPage=5;

const endOffset = itemOffset + itemsPerPage;
console.log(`Loading items from ${itemOffset} to ${endOffset}`);
const currentItems = veriler.slice(itemOffset, endOffset);
const pageCount = Math.ceil(veriler.length / itemsPerPage);

// Invoke when user click to request another page.
const handlePageClick = (event) => {
  const newOffset = (event.selected * itemsPerPage) % veriler.length;
  console.log(
    `User requested page number ${event.selected}, which is offset ${newOffset}`
  );
  setItemOffset(newOffset);
};
//text area
const blue = {
  100: '#DAECFF',
  200: '#b6daff',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  900: '#003A75',
};

const grey = {
  50: '#f6f8fa',
  100: '#eaeef2',
  200: '#d0d7de',
  300: '#afb8c1',
  400: '#8c959f',
  500: '#6e7781',
  600: '#57606a',
  700: '#424a53',
  800: '#32383f',
  900: '#24292f',
};
const StyledTextarea = styled(TextareaAutosize)(
  ({ theme }) => `
  width: 320px;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 12px;
  border-radius: 12px 12px 0 12px;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: 0px 2px 24px ${
    theme.palette.mode === 'dark' ? blue[900] : blue[100]
  };

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`,
);

//input burdan

const StyledInputElement = styled('input')(
  ({ theme }) => `
  width: 320px;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5rem;
  padding: 8px 12px;
  border-radius: 8px;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[500] : blue[200]};
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`,
);

const CustomInput = React.forwardRef(function CustomInput(props, ref) {
  return <Input slots={{ input: StyledInputElement }} {...props} ref={ref} />;
});

//input bitis
//konu yaz


const [open, setOpen] = React.useState(false);
    
const handleClickOpen = () => {
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
};




//konu insert
const[subject,Setsubject]=useState('');
const[icerik,Seticerik]=useState('');
const[success,Setsuccess]=useState('');
const kalem=(event)=>{

Seticerik(event.target.value);


}


const baslik=(event)=>{

  Setsubject(event.target.value);
  
  
  }
const addProduct=async()=>{
if (subject == "" || icerik == "") {
 
  alert('Boş bırakılamaz');

}
else{
 await  addDoc(collection(db, "products"), {
  description:icerik,  
  name:subject,
    user:user.name,
  
    
  })
  Setsuccess('işlem başarılı');

}
  
  }


  return (
    <>

<div>

{isLoading?<div>  <Box  sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
      <LinearProgress color="secondary" />
      <LinearProgress color="success" />
      <LinearProgress color="inherit" />
    </Box></div>:isAuthenticated?

<div>

<div> 
<Navbar/>


<Tablo currentItems={currentItems}/>


<Grid container spacing={3}>
  <Grid item xs={7}>
  <Button variant="contained" onClick={handleClickOpen} sx={{ backgroundColor:'pink' }}>
       Konu yaz
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>İçerik</DialogTitle>
        <DialogContent>
          <DialogContentText>
         Küfür içerik yok
          </DialogContentText>
          <TextField
            margin="dense"
            id="name"
            label="Başlık"
            type="text"
            fullWidth
            variant="standard"
        onChange={baslik}/><br></br>
          <TextField
            margin="dense"
            id="name"
            label="Yorum yazınız"
            type="text"
            fullWidth
            variant="standard"
        onChange={kalem}/>
         
          <Button variant='contained' sx={{ backgroundColor:'purple' }} onClick={addProduct} >Konu  yaz</Button>
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


<Stack spacing={pageCount}>


<Pagination count={pageCount} onChange={(e, value) => setItemOffset(value)} color="secondary" /></Stack>
</div>
</div>
:


<div>  
<Navbar/>

<Tablo currentItems={currentItems}/>


<Stack spacing={pageCount}>


<Pagination count={pageCount} onChange={(e, value) => setItemOffset(value)} color="secondary" /></Stack>


</div>







}


  
<div><div className='alt'>Burası footer</div></div>


</div>


       
   



 </>
  );
}

export default App;

