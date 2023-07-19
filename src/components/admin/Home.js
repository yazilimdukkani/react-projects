
import {auth} from './Ayar';
import './admincss/yetki.css';

import { signInWithEmailAndPassword,getAuth,signOut,firebase} from "firebase/auth";
import { useAuth0 } from '@auth0/auth0-react';

import { Link } from 'react-router-dom';
import Menu from './Menu';

import LinearProgress from '@mui/material/LinearProgress';
import Footer from "./Footer";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import {productsRef} from '../firebase';
import { useState } from 'react';
import { useEffect } from 'react';
import { onSnapshot,docs} from 'firebase/firestore';

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';

import ReactPaginate from 'react-paginate';
function Home() {
   
    const {loginWithRedirect, logout,isAuthenticated,isLoading,user} =useAuth0();//auth islemi yapılıyor

const[veriler,Setveriler]=useState([]);

useEffect(()=>{
  return onSnapshot(productsRef,(list)=>{
  
Setveriler(list.docs.map(doc => ({id: doc.id, ...doc.data()})));
  

 
  
  });
  
  
},[]);

// pagination

const [itemOffset, setItemOffset] = useState(0);

const itemsPerPage=10;

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
      

//pagination

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
return ( <div>
        

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
          style={{ width: '100%' }}
          className="mb-2"
        >
          <Card.Header>Admin</Card.Header>
          <Card.Body>
            <Card.Title> Konular bölümü 

            <Link to='/Arama'><Button variant="primary">Go to Search</Button></Link>

            
            </Card.Title>
            <Card.Text>
            <div>
            <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>User</StyledTableCell>
            <StyledTableCell align="right">Konu-Başlık</StyledTableCell>
            <StyledTableCell align="right">Düzenle</StyledTableCell>
            <StyledTableCell align="right">Sil</StyledTableCell>
    
          </TableRow>
        </TableHead>
        <TableBody>
          {currentItems.map((row) => (
            <StyledTableRow key={row.id}>
           
              <StyledTableCell align="left">{row.user}</StyledTableCell>
              <StyledTableCell align="right">{row.name}</StyledTableCell>
              <StyledTableCell align="right">Düzenle</StyledTableCell>
              <StyledTableCell align="right">Sil</StyledTableCell>
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
<ul>
<ReactPaginate
     
        className='react-paginate'
      />
 </ul>

<Footer/>
</div>:isLoading?<div><Box sx={{ width: '100%' }}>
      <LinearProgress />
    </Box></div>:<div>{window.location.href="Sign"}</div>
        }
    </div> );
}

export default Home;