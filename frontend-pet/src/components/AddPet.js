import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


import '../styles/AddJob.css'

export default function AddPet() {
    let navigate = useNavigate();

    const [petName, setPetName] = useState("");
    const [date, setDate] = useState("");
    const [location, setLocation] = useState("");
    const [gender, setGender] = useState("");
    const [size, setSize] = useState("");
    // const [age, setAge] = useState("");
    // const [colour, setColour] = useState("");
    
   

    async function addPet(e) {
        e.preventDefault();

        const newPet = {
          petName,
          date:date.toString(),
          location,
          gender,
          size
        //   age,
        //   colour
            
        }
        console.log(newPet);
        await axios.post("http://localhost:5001/pets",newPet)
        .then(() => {
            alert("Pet Added Successfully");
            navigate('/pets');
        })
        .catch(err => {
            alert(err);
        })
    }
      
        // const getCurrentDate = () => {
        //   const currentDate = new Date();
        //   const year = currentDate.getFullYear();
        //   let month = (currentDate.getMonth() + 1).toString();
        //   let day = currentDate.getDate().toString();
      
        //   // Add leading zero if month/day is a single digit
        //   month = month.length === 1 ? '0' + month : month;
        //   day = day.length === 1 ? '0' + day : day;
      
        //   return `${year}-${month}-${day}`;
        // };
        
        
          
        

    return (
        <div className='container'>
            <br></br>
            <form onSubmit={addPet} className="my-form">
            <div className="mb-3">
                    <label forHtml="petName" className="form-label">Pet Name</label>
                    <input type="text" className="form-control" id="petName" placeholder="Enter Pet Name" value={petName} onChange={(e) => {setPetName(e.target.value)}}/>
                </div>
        
                <div className="mb-3">
                    <label forHtml="date" className="form-label">Date</label>
                    <input type="date" className="form-control" id="date"  value={date}  onChange={(e) => {setDate(e.target.value)}}/>
                </div>

                <div className="mb-3">
                    <label htmlFor="location" className="form-label">Location</label>
                    <input type="text" className="form-control" id="location" placeholder="Enter Location" value={location} onChange={(e) => {setLocation(e.target.value)}} />
                </div>
                
                
                <div className="mb-3">
                    <label forHtml="gender" className="form-label">Gender</label>
                    <input type="text" className="form-control" id="gender" placeholder="Enter Gender" value={gender} onChange={(e) => {setGender(e.target.value)}}/>
                </div>

                <div className="mb-3">
                    <label forHtml="size" className="form-label">Size</label>
                    <select type="text" className="form-control" id="size" placeholder="Enter Size" value={size} onChange={(e) => {setSize(e.target.value)}}>
                        <option value="">Select Size</option>
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                    </select>

                </div>
                <button type="submit" >ADD</button>
            </form>
        </div>
    )
}
