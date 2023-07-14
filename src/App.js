import logo from './logo.svg';
import './App.css';

import {Routes,Route} from 'react-router-dom'



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
function App() {
  

  const[users,Setusers]=useState([]);
  const[veriler,Setveriler]=useState([]);//veritabanındaki konuların verilerini ceker baham
 const {loginWithRedirect, logout,isAuthenticated,isLoading,user} =useAuth0();//auth islemi yapılıyor


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

const itemsPerPage=1;

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




  return (
    <>


<div>

{isLoading?<div>bekle..</div>:isAuthenticated?

<div>



<div> 

<Navbar/>



<Kontrol currentItems={currentItems}/>


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

<Kontrol currentItems={currentItems}/>


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

