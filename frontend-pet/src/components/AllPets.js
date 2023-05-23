import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import XLSX from "xlsx";
import "../styles/AllJob.css";

export default function AllPets() {
  const [pets, setPets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  let navigate = useNavigate();
  
  const getData = async () => {
    await axios
      .get("http://localhost:5001/pets")
      .then((res) => {
        setPets(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const GenerateReport = () => {
    const XLSX = require("xlsx");
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(pets);
    XLSX.utils.book_append_sheet(wb, ws, "Pet Report");
    const wbBlob = new Blob(
      [XLSX.write(wb, { type: "array", bookType: "xlsx" })],
      { type: "application/octet-stream" }
    );
    const url = URL.createObjectURL(wbBlob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "Pet-report.xlsx");
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const onDelete = async (id) => {
    await axios
      .delete(`http://localhost:5001/pets/${id}`)
      .then(() => {
        alert("Pet Deleted Successfully");
        getData();
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  if (!pets) return alert("No Pets");

  const onUpdate = (data) => {
    navigate(`/update-pet/${data._id}`);
  };

  if (!pets) return alert("No Pets");
  const filteredPets = pets.filter((pets) => {
    return pets.petName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="container">
      <h1
        style={{ textAlign: "center", fontFamily: "poppins", fontSize: "50px" }}
      >
        All Pet Details
      </h1>
      <div className="container">
        <div>
          <button className="button-add" onClick={() => navigate("/add-pet")}>
            Add Pets
          </button>
        </div>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by Pet Title"
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
              <th style={{ textAlign: "center" }}>Pet Name</th>
              <th style={{ textAlign: "center" }}>Date</th>
              <th style={{ textAlign: "center" }}>Location</th>
              <th style={{ textAlign: "center" }}>Gender</th>
              <th style={{ textAlign: "center" }}>Size</th>
              <th style={{ textAlign: "center" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredPets.map((pet) => (
              <tr key={pet._id}>
                <td style={{ textAlign: "center" }}>{pet.petName}</td>
                <td style={{ textAlign: "center" }}>
                  {new Date(pet.date).toISOString().slice(0, 10)}
                </td>
                <td style={{ textAlign: "center" }}>{pet.location}</td>
                <td style={{ textAlign: "center" }}>{pet.gender}</td>
                <td style={{ textAlign: "center" }}>{pet.size}</td>
                <td>
                  <button
                    type="button"
                    className="btn-update"
                    onClick={() => onUpdate(pet)}
                  >
                    Update
                  </button>
                  &nbsp;
                  <button
                    type="button"
                    className="btn-delete"
                    onClick={() => onDelete(pet._id)}
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
