import Menu from "./Menu";
import Footer from "./Footer";
import './admincss/yetki.css';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { productsRef,db } from "../firebase";
import { useEffect, useState } from "react";
import { onSnapshot,where,query,orderBy,updateDoc,deleteDoc,collection,getDocs,doc} from 'firebase/firestore';
// or

// or
import { Input, TextField } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

//table vs..

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Card from 'react-bootstrap/Card';
import InputBase from '@mui/material/InputBase';
import { Link } from 'react-router-dom';







import ReactPaginate from 'react-paginate';

function Arama() {
    
// tablo css
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

//duzenle penceresi
const [open, setOpen] = React.useState(false);
const handleClickOpen = () => {
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
};


//duzenle penceresi
const[data,Setdata]=useState([]);

const[ara,Setara]=useState("");
const {loginWithRedirect, logout,isAuthenticated,isLoading,user} =useAuth0();//auth islemi yapılıyor







const Search=(e)=>{


  Setara(e.target.value);

    const q = query(productsRef);


    return onSnapshot(q,(snapshot)=>{
    
      Setdata(snapshot.docs.map(doc => ({id: doc.id, ...doc.data()})));
      
    
    

      
      });
  



};

const [itemOffset, setItemOffset] = useState(0);
const itemsPerPage=12;

const endOffset = itemOffset + itemsPerPage;
console.log(`Loading items from ${itemOffset} to ${endOffset}`);
const currentItems = data.slice(itemOffset, endOffset);
const pageCount = Math.ceil(data.length / itemsPerPage);

// Invoke when user click to request another page.
const handlePageClick = (event) => {
  const newOffset = (event.selected * itemsPerPage) % data.length;
  console.log(
    `User requested page number ${event.selected}, which is offset ${newOffset}`
  );
  setItemOffset(newOffset);
};



const Submit=(e)=>{

 e.preventDefault();
  Setdata(data.filter((data)=>
  
  data.name.toLowerCase().includes(ara.toLowerCase())
  
  
  ));



}
//KONU SİLMEK İÇİN

const[id,Setid]=useState([]);




const link="/Duzenleme/";







 

//deleteDoc(doc(yorum, "yorumlar",e));

const Sil=async(e)=>{

const silindi= deleteDoc(doc(db, "products",e));

if (silindi) {
  
alert("Verileriniz silindi");

}
else{



}

}

const yorumLink="/YorumSil/";

    return (  <div>
     
     {isLoading?<div><Box sx={{ width: '100%' }}>
      <LinearProgress />
    </Box></div>:isAuthenticated?<div>
<Menu/>



{[
   
   'Dark',
 ].map((variant) => (
   <Card
     bg={variant.toLowerCase()}
     key={variant}
     text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
     style={{ width: '100%',height:'auto',overflow:'hidden' }}
     className="mb-2"
   >
     <Card.Header>Admin</Card.Header>
     <Card.Body>
       <Card.Title> Konular bölümü 
       <form id="create-course-form" onSubmit={Submit}>
  

  <InputGroup className="mb-3">
  <TextField id="outlined-basic" label="Aranacak kelimeyi giriniz" variant="outlined" onChange={Search} value={ara}  />
      <Button variant="info">Arama</Button>
        </InputGroup>
   
  
        </form>
 

       
       </Card.Title>
       <Card.Text>
       <div>
       <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>user</StyledTableCell>
            <StyledTableCell align="right">Başlık</StyledTableCell>
            <StyledTableCell align="right">Yorumlar</StyledTableCell>
            <StyledTableCell align="right">Düzenle</StyledTableCell>
            <StyledTableCell align="right">Sil</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentItems.map((row) => (
            <StyledTableRow key={row.id}>
      
              <StyledTableCell align="left">{row.user}</StyledTableCell>
              <StyledTableCell align="right">{row.name}</StyledTableCell>
              <StyledTableCell align="right"><Button variant="warning" href={yorumLink+row.id}>Yorumlar</Button></StyledTableCell>
              <StyledTableCell align="right"><Button href={link+row.id}>GüNCELLE</Button></StyledTableCell>
              <StyledTableCell align="right"><Button variant="danger" value={id} onClick={(e)=>{Sil(row.id)}}>SİL</Button></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
</div>




       </Card.Text>
     </Card.Body>
   </Card>
 ))}

<ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        className='react-paginate'/>
      


<Footer/>
</div>:isLoading?<div><Box sx={{ width: '100%' }}>
      <LinearProgress />
    </Box></div>:<div>{window.location.href="Sign"}</div>}
    </div>);
}

export default Arama;