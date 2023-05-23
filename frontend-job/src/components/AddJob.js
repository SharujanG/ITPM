import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


import '../styles/AddJob.css'

export default function AddJob() {
    let navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [location, setLocation] = useState("");
    const [workingmode, setWorkingMode] = useState("");
    const [requirement, setRequirement] = useState("");
    
   

    async function addJob(e) {
        e.preventDefault();

        const newJob = {
          title,
          date:date.toString(),
          location,
          workingmode,
          requirement
            
        }
        console.log(newJob);
        await axios.post("http://localhost:5001/jobs",newJob)
        .then(() => {
            alert("Job Added Successfully");
            navigate('/jobs');
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
            <form onSubmit={addJob} className="my-form">
            <div className="mb-3">
                    <label forHtml="title" className="form-label">Job Title</label>
                    <input type="text" className="form-control" id="title" placeholder="Enter Job Title" value={title} onChange={(e) => {setTitle(e.target.value)}}/>
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
    <label htmlFor="workingmode" className="form-label">Working Mode</label>
    <select className="form-select" id="workingmode" value={workingmode} onChange={(e) => {setWorkingMode(e.target.value)}}>
        <option value="">Select working mode</option>
        <option value="Remote">Remote</option>
        <option value="Hybrid">Hybrid</option>
    </select>
</div>


                <div className="mb-3">
                    <label forHtml="requirement" className="form-label">Requirement</label>
                    <textarea type="text" className="form-control" id="requirement" placeholder="Enter Requirement" value={requirement} onChange={(e) => {setRequirement(e.target.value)}}/>
                </div>
                <button type="submit" >ADD</button>
            </form>
        </div>
    )
}
