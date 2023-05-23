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





const DonationForm =() =>{
  const [NameOfDonator, setNameOfDonator] = React.useState();
  const [NameOfPlant, setNameOfPlant] = React.useState();
  const [Category, setCategory] = React.useState();
  const [Quantity, setQuantity] = React.useState();
  const [Address, setAddress] = React.useState();
  const [ContactNumber, setContactNumber] = React.useState();

 
const history = useHistory();

  // const homepage = async(e) => {
  //   history.push("/");
  // }

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


    const handleSubmit = async (event) => {
  
      var isSuccess = true;
  
      
  
      if (!NameOfDonator) {
        Swal.fire({
          title: "Error!",
          text: "Please enter Name of Donator !!!",
          icon: "error",
          confirmButtonText: "Ok",
          confirmButtonColor: "red",
        });
        isSuccess = false;
      }
  
      if (!NameOfPlant) {
        Swal.fire({
          title: "Error!",
          text: "Please enter Shop Name of Plant !!!",
          icon: "error",
          confirmButtonText: "Ok",
          confirmButtonColor: "red",
        });
        isSuccess = false;
      }

      if (!Category) {
        Swal.fire({
          title: "Error!",
          text: "Please enter Shop Category !!!",
          icon: "error",
          confirmButtonText: "Ok",
          confirmButtonColor: "red",
        });
        isSuccess = false;
      }
      if (!Quantity) {
        Swal.fire({
          title: "Error!",
          text: "Please enter Quantity !!!",
          icon: "error",
          confirmButtonText: "Ok",
          confirmButtonColor: "red",
        });
        isSuccess = false;
      }

      if (!Address) {
        Swal.fire({
          title: "Error!",
          text: "Please enter Address !!!",
          icon: "error",
          confirmButtonText: "Ok",
          confirmButtonColor: "red",
        });
        isSuccess = false;
      }

      if (!ContactNumber) {
        Swal.fire({
          title: "Error!",
          text: "Please enter ContactNumber !!!",
          icon: "error",
          confirmButtonText: "Ok",
          confirmButtonColor: "red",
        });
        isSuccess = false;
      }
  
      if (isSuccess ) {
        try {
          const config = {
            headers: {
              "Content-type": "application/json",
            },
          };
          const { data } = await axios.post(
            "http://localhost:5000/api/donation/register",
            {
              NameOfDonator,
              NameOfPlant,
              Category,
              Quantity,
              Address,
              ContactNumber,
            },
  
            config
          );
          console.log(data);
  
  
          Swal.fire({
            title: "success",
            text: "Submitted Successfully",
            icon: "success",
            confirmButtonText: "Close",
          });
          history.push("/");
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.response.data.error,
            footer: '<a href="">Why do I have this issue?</a>',
          });
  
          console.log(`Error occured ${error}`);
          console.log(error.response);
        }
      }
    }
 
  return (
  <div style={myStyle} > 

<Card style={{height:"40px",width:"700px",backgroundColor:"#ffffff",marginTop:"100px",marginLeft:"400px",opacity:"0.5",fontSize:"28px"}} >Donation Details</Card>
   

   <div style={{height:"450px",width:"700px",backgroundColor:"#ffffff",marginTop:"30px",marginLeft:"400px",opacity:"0.5",borderRadius:"2%"}}>
   <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        '& .MuiTextField-root': { width: '22ch',height: '2ch' }
      }}
    >
    
      <TextField sx={{marginTop:"15px",marginLeft:"50px"}} label={'Name of Donator'} id="margin-none" marginTop="" 
      onChange={(e)=>setNameOfDonator((e.target.value))}/>
      
      <TextField sx={{marginTop:"10px",marginLeft:"50px"}} label={'Name of Plant'} id="margin-dense" margin="dense" 
      onChange={(e)=>setNameOfPlant((e.target.value))}/>
      
      
      <FormControl sx={{width:"594px",marginTop:"10px",marginLeft:"50px"}} >
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={Category}
          label="Age"
          onChange={(e)=>setCategory((e.target.value))}
        >
          <MenuItem value={"Native"}>Native</MenuItem>
          <MenuItem value={"Outdoor"}>Outdoor</MenuItem>
          <MenuItem value={"Indoor"}>Indoor</MenuItem>
          <MenuItem value={"Flower"}>Flower</MenuItem>
        </Select>
      </FormControl>
  
      <TextField sx={{marginTop:"10px",marginLeft:"50px"}} label={'Quantity'} id="margin-normal" margin="normal" 
      onChange={(e)=>setQuantity((e.target.value))}/>

      <TextField sx={{marginTop:"10px",marginLeft:"50px"}} label={'Address'} id="margin-normal" margin="normal"
      onChange={(e)=>setAddress((e.target.value))} />

      <TextField sx={{marginTop:"10px",marginLeft:"50px"}} label={'Contact Number'} id="margin-normal" margin="normal"
      onChange={(e)=>setContactNumber((e.target.value))} />
      
      
      
    </Box>
    

   
   </div>
   <Button variant="success" style={{width:"300px",marginRight:"20px",backgroundColor:"#98F516",fontSize:"30px",opacity:"0.7"}}onClick={handleSubmit} >Submit
    </Button>
    
   
      

    
    </div>


    


  )
}

export default DonationForm