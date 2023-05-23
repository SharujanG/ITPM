import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import XLSX from "xlsx";
import "../styles/AllJob.css";

export default function AllGarbages() {
  const [garbages, setGatbages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  let navigate = useNavigate();

  const getData = async () => {
    await axios
      .get("http://localhost:5001/garbages")
      .then((res) => {
        setGatbages(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const GenerateReport = () => {
    const XLSX = require("xlsx");
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(garbages);
    XLSX.utils.book_append_sheet(wb, ws, "Garbage Report");
    const wbBlob = new Blob(
      [XLSX.write(wb, { type: "array", bookType: "xlsx" })],
      { type: "application/octet-stream" }
    );
    const url = URL.createObjectURL(wbBlob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "Garbage-report.xlsx");
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const onDelete = async (id) => {
    await axios
      .delete(`http://localhost:5001/garbages/${id}`)
      .then(() => {
        alert("Garbage Deleted Successfully");
        getData();
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  if (!garbages) return alert("No Garbages");

  const onUpdate = (data) => {
    navigate(`/update-garbage/${data._id}`);
  };

  if (!garbages) return alert("No Garbages");
  const filteredGarnages = garbages.filter((garbages) => {
    return garbages.area.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="container">
      <h1
        style={{ textAlign: "center", fontFamily: "cursive", fontSize: "50px" }}
      >
        All Garbage Details
      </h1>
      <div className="container">
        <div>
          <button
            className="button-add"
            onClick={() => navigate("/add-garbage")}
          >
            Add Garbages
          </button>
        </div>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by Garbage Area"
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
              <th style={{ textAlign: "center" }}>Area</th>
              <th style={{ textAlign: "center" }}>Date</th>
              <th style={{ textAlign: "center" }}>Collector Name</th>
              <th style={{ textAlign: "center" }}>Garbage Type</th>
              <th style={{ textAlign: "center" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredGarnages.map((garbage) => (
              <tr key={garbage._id}>
                <td style={{ textAlign: "center" }}>{garbage.area}</td>
                <td style={{ textAlign: "center" }}>
                  {new Date(garbage.date).toISOString().slice(0, 10)}
                </td>
                <td style={{ textAlign: "center" }}>{garbage.collectorName}</td>
                <td style={{ textAlign: "center" }}>{garbage.garbageType}</td>
                <td>
                  <button
                    type="button"
                    className="btn-update"
                    onClick={() => onUpdate(garbage)}
                  >
                    Update
                  </button>
                  &nbsp;
                  <button
                    type="button"
                    className="btn-delete"
                    onClick={() => onDelete(garbage._id)}
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
