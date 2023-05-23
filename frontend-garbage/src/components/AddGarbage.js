import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "../styles/AddJob.css";

export default function AddGarbage() {
  let navigate = useNavigate();

  const [area, setArea] = useState("");
  const [garbageType, setGarbageType] = useState("");
  const [collectorName, setCollectorName] = useState("");
  const [date, setDate] = useState("");

  async function addGarbage(e) {
    e.preventDefault();

    const newGarbage = {
      area,
      garbageType,
      collectorName,
      date: date.toString(),
    };
    console.log(newGarbage);
    await axios
      .post("http://localhost:5001/garbages", newGarbage)
      .then(() => {
        alert("Garbage Added Successfully");
        navigate("/garbages");
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <div className="container">
      <br></br>
      <form onSubmit={addGarbage} className="my-form">
        <div className="mb-3">
          <label forHtml="area" className="form-label">
            Area
          </label>
          <input
            type="text"
            required
            className="form-control"
            id="area"
            placeholder="Enter Area"
            value={area}
            onChange={(e) => {
              setArea(e.target.value);
            }}
          />
        </div>

        <div className="mb-3">
          <label forHtml="date" className="form-label">
            Date
          </label>
          <input
            type="date"
            required
            className="form-control"
            id="date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
            }}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="collectorName" className="form-label">
            Collector Name
          </label>
          <input
            type="text"
            required
            className="form-control"
            id="collectorName"
            placeholder="Enter Collector Name"
            value={collectorName}
            onChange={(e) => {
              setCollectorName(e.target.value);
            }}
          />
        </div>

        <div className="mb-3">
          <label forHtml="garbageType" className="form-label">
            Garbage Type
          </label>
          <input
            type="text"
            required
            className="form-control"
            id="garbageType"
            placeholder="Enter Garbage Type"
            value={garbageType}
            onChange={(e) => {
              setGarbageType(e.target.value);
            }}
          />
        </div>

        <button type="submit">ADD</button>
      </form>
    </div>
  );
}
