import React from 'react'
import Navbar from 'react-bootstrap/Navbar';


function Navigation() {

  
  return (
    <div> <Navbar style={{backgroundColor:"#30C621",height:"80px"}}>
     
   
    
      <Navbar.Brand href="#home">
        <img
          src="https://res.cloudinary.com/dgmrua3dm/image/upload/v1678827858/images-removebg-preview_njoqbs.png"
          width="50"
          height="50"
          className="d-inline-block align-top"
          alt="React Bootstrap logo"
        />
        <div class="text-warning" style={{fontSize:"20px",marginLeft:"80px",marginTop:"5px"}}>SMART CITY </div>
        <div class="text-light"style={{fontSize:"10px",marginLeft:"80px",marginTop:"2px"}}>Tree Donation Center </div>
      </Navbar.Brand>
      

  
  </Navbar>
  </div>
  )
}

export default Navigation