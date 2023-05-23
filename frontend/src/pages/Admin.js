import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from 'react-bootstrap/Button';
import { useHistory } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Swal from 'sweetalert2';
import axios from 'axios';
import Select from '@mui/material/Select';
import Grid from "@mui/material/Grid";

import {
    UserButton,
    useUser,
  } from "@clerk/clerk-react";
  import FilledInput from '@mui/material/FilledInput';
  import InputAdornment from '@mui/material/InputAdornment';  
  import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Container from '@mui/material/Container';
import { useEffect } from 'react';

const myStyle={
  backgroundImage: 
"url('https://res.cloudinary.com/dgmrua3dm/image/upload/v1678868749/home_slide_4_eqk2vx.webp')",
  height:'100vh',
  marginTop:'-70px',
  fontSize:'50px',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  display: "flow-root"
  
};


const columns = [
  { id: 'NameOfDonator', label: 'Name Of Donator', minWidth: 70 },
  { id: 'NameOfPlant', label: 'Name Of Plant', minWidth: 70},
  { id: 'Quantity', label: 'Quantity', minWidth: 70},
  { id: 'Category', label: 'Category', minWidth: 70},
  
  
  {
    id: 'Address',
    label: 'Address',
    minWidth: 70,
    align: 'center',
    format: (value) => value.toFixed(2),
  },
  { id: 'ContactNumber', label: 'Contact Number', minWidth: 70},
  { id: 'Status', label: 'Options', minWidth: 70},
  { id: 'Delete', label: 'Delete Form', minWidth: 70},
];


function Admin() {
    const {user} = useUser();

    

    
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [forms, setForms] = React.useState();
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    const getAllForms= async () => {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        const { data } = await axios.post(
          "http://localhost:5000/api/donation/getAllForms",
          {},
          config
        );
 
        setForms(data);
        console.log(data);
 
      } catch (error) {
        console.log(error.response.data.error);
      }
    };
    useEffect(() => {
      getAllForms();
    }, []);

    const approveForm =async(form)=>{

      console.log(form);
      var formId = form._id;

      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Approve it!'
      }).then(async(result) => {
        if (result.isConfirmed) {
          try {
            const config = {
              headers: {
                "Content-type": "application/json",
              },
            };
            const { data } = await axios.post(
              "http://localhost:5000/api/donation/approveForm",
              {
                formId,
              },
              config
            );
     
            Swal.fire({
              title: "success",
              text: "Updated Successfully",
              icon: "success",
              confirmButtonText: "Close",
            });
            getAllForms();
          } catch (error) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text:  "Failed to update",
              footer: '<a href="">Why do I have this issue?</a>',
            });
            console.log(error);
          }
        }
      })

    }

    const deleteForm =async(form)=>{

      console.log(form);
      var formId = form._id;

      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Delete it!'
      }).then(async(result) => {
        if (result.isConfirmed) {
          try {
            const config = {
              headers: {
                "Content-type": "application/json",
              },
            };
            const { data } = await axios.post(
              "http://localhost:5000/api/donation/deleteForm",
              {
                formId,
              },
              config
            );
     
            Swal.fire({
              title: "success",
              text: "Deleted Successfully",
              icon: "success",
              confirmButtonText: "Close",
            });
          } catch (error) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text:  "Failed to delete",
              footer: '<a href="">Why do I have this issue?</a>',
            });
            console.log(error);
          }
        }
      })

    }
    return (
        <div style={myStyle} > 
      <div style={{marginLeft:"1400px"}}>
      {user? <UserButton/> : <h3>Login</h3>}
      </div>
         
      <FormControl width sx={{ m: 10,backgroundColor:"#ffffff",marginTop:"100px",marginLeft:"px",opacity:"0.5",width:"1000px"}} variant="filled"  >
          <InputLabel htmlFor="filled-adornment-Search">Search</InputLabel>
          <FilledInput
            id="filled-adornment-amount"
            endAdornment={<InputAdornment position="end"><SearchIcon/></InputAdornment>}
          />
        </FormControl>
        
        <Container sx={{ marginTop: "15vh" }}>

          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {forms?(
                  forms.forms.map((form) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={form._id}
                        // onClick={() => viewSHop(form)}
                      >
                        {columns.map((column) => {
                          var value = form[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {value==="Pending" ? (
                               <Button variant="outlined" onClick={()=>approveForm(form)}>Pending</Button>
                              ) : (
                                (value==="Delete"?
                                (
                                  <Button variant="contained" color="success" onClick={()=>deleteForm(form)}>Delete</Button>
                                ):(
                                  value
                                ))
                                
                              )}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })
                  ):(
                    <div>
                      Loading...
                    </div>
                  )
                  }
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={forms?forms.length:0}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Container>
    
   
      

    
  
      
          
  </div>
          
        )
}

export default Admin