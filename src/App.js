import logo from './logo.svg';
import './App.css';

import {Routes,Route} from 'react-router-dom'


import * as React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import { useState,useEffect } from 'react';
import Kontrol from './components/Kontrol';

import {onSnapshot} from 'firebase/firestore';

import { UserproductsLister ,addProduct} from './components/firebase';
import { productsRef,updateForm } from './components/firebase';
import Kullanici from './components/Kullanici';


import Navbar from './components/Navbar';

import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import Paginated from './components/Paginated';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Tablo from './components/Tablo';

import { styled } from '@mui/system';
import { TextareaAutosize } from '@mui/base';
import Input from '@mui/base/Input';
import { Button } from '@mui/material';
import Konular from './components/pages/Konular';
import {BrowserRouter} from 'react-router-dom';
function App() {
  
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

const itemsPerPage=8;

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
  return (
    <>


<div>

{isLoading?<div>bekle..</div>:isAuthenticated?

<div>



<div> 
<Navbar/>


<Tablo currentItems={currentItems}/>
<CustomInput aria-label="Demo input" placeholder="Başlık" className='input' />;
<br></br>
<StyledTextarea aria-label="empty textarea" placeholder="yazınızı yazın" className='textArea' />;
<br></br>

<Button variant='contained' sx={{ backgroundColor:'purple' }} className='konu-button'>Konu yaz</Button>
<br></br>



< a href='#'>
<ReactPaginate className='paginate'
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
         />

</a>



</div>
</div>
:


<div>  
<Navbar/>

<Tablo currentItems={currentItems}/>


< a href='#'>
<ReactPaginate className='paginate'
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        />
</a>


</div>







}


  
<div><div className='alt'>Burası footer</div></div>


</div>


       
   



 </>
  );
}

export default App;

