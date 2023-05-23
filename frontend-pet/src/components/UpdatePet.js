import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import '../styles/AddJob.css'



export default function UpdatePet() {
    let navigate = useNavigate();
    const {id:jid} = useParams()
    
    const [petName, setPetName] = useState("");
    const [date, setDate] = useState("");
    const [location, setLocation] = useState("");
    const [gender, setGender] = useState("");
    const [size, setSize] = useState("");
    const[id, setID] = useState("");
    

    
    
    async function Update(e) {
        e.preventDefault();

        
        const updatedPet = {
            petName,
            date:date.toString(),
            location,
            gender,
            size
        }

        await axios.put(`http://localhost:5001/pets/${jid}`,updatedPet)
        .then(() => {
            alert("Pet Updated Successfully");
            navigate('/pets');
            localStorage.clear();
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
    
    
      

    useEffect(() => {
        axios.get(`http://localhost:5001/pets/${jid}`)
        .then((data) => { 
        setPetName(data.data.petName);
        console.log(data.data.date);
        setDate(data.data.date);
        setLocation(data.data.location);
        setGender(data.data.gender);
        setSize(data.data.size);
        setID();
        })
        .catch(err => {
            alert(err);
        })

       
    }, [])

    return (
        <div className='container'>
            <br></br>
            <form onSubmit={Update} className="my-form">
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
                <button type="submit" className="btn btn-primary">UPDATE</button>
            </form>
        </div>
    )
}