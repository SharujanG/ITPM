import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import XLSX from "xlsx";
import "../styles/AllJob.css";

export default function AllJobss() {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  let navigate = useNavigate();
  
  const getData = async () => {
    await axios
      .get("http://localhost:5001/jobs")
      .then((res) => {
        setJobs(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const GenerateReport = () => {
    const XLSX = require("xlsx");
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(jobs);
    XLSX.utils.book_append_sheet(wb, ws, "Job Report");
    const wbBlob = new Blob(
      [XLSX.write(wb, { type: "array", bookType: "xlsx" })],
      { type: "application/octet-stream" }
    );
    const url = URL.createObjectURL(wbBlob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "Job-report.xlsx");
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const onDelete = async (id) => {
    await axios
      .delete(`http://localhost:5001/jobs/${id}`)
      .then(() => {
        alert("Job Deleted Successfully");
        getData();
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  if (!jobs) return alert("No Jobs");

  const onUpdate = (data) => {
    navigate(`/update-job/${data._id}`);
  };

  if (!jobs) return alert("No Jobs");
  const filteredJobs = jobs.filter((jobs) => {
    return jobs.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="container">
      <h1
       style={{ textAlign: "center", fontSize: "50px", fontFamily: "Poppins" }}

      >
        All Job Details
      </h1>
      <div className="container">
        <div>
          <button className="button-add" onClick={() => navigate("/add-job")}>
            Add Jobs
          </button>
        </div>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by Job Title"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button
          type="button"
          className="btn-report"
          onClick={() => GenerateReport()}
        >
          Generate Report
        </button>

        <table style={{ textAlign: "center" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>Title</th>
              <th style={{ textAlign: "center" }}>Date</th>
              <th style={{ textAlign: "center" }}>Location</th>
              <th style={{ textAlign: "center" }}>Working Mode</th>
              <th style={{ textAlign: "center" }}>Requirement</th>
              <th style={{ textAlign: "center" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredJobs.map((job) => (
              <tr key={job._id}>
                <td style={{ textAlign: "center" }}>{job.title}</td>
                <td style={{ textAlign: "center" }}>
                {job.date && new Date(job.date).toISOString().slice(0, 10)}
                </td>
                <td style={{ textAlign: "center" }}>{job.location}</td>
                <td style={{ textAlign: "center" }}>{job.workingmode}</td>
                <td style={{ textAlign: "center" }}>{job.requirement}</td>
                <td>
                  <button
                    type="button"
                    className="btn-update"
                    onClick={() => onUpdate(job)}
                  >
                    Update
                  </button>
                  &nbsp;
                  <button
                    type="button"
                    className="btn-delete"
                    onClick={() => onDelete(job._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
