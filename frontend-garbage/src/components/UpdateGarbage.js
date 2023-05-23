import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/AddJob.css";

export default function UpdateGarbage() {
  let navigate = useNavigate();
  const { id: jid } = useParams();

  const [area, setArea] = useState("");
  const [date, setDate] = useState("");
  const [collectorName, setCollectorName] = useState("");
  const [garbageType, setGarbageType] = useState("");
  const [id, setID] = useState("");

  async function Update(e) {
    e.preventDefault();

    const updatedGarbage = {
      area,
      date,
      collectorName,
      garbageType,
    };

    await axios
      .put(`http://localhost:5001/garbages/${jid}`, updatedGarbage)
      .then(() => {
        alert("Garbage Updated Successfully");
        navigate("/garbages");
        localStorage.clear();
      })
      .catch((err) => {
        alert(err);
      });
  }

  useEffect(() => {
    axios
      .get(`http://localhost:5001/garbages/${jid}`)
      .then((data) => {
        setArea(data.data.area);
        console.log(data.data.date);
        setDate(data.data.date);
        setCollectorName(data.data.collectorName);
        setGarbageType(data.data.garbageType);
        setID();
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  return (
    <div className="container">
      <br></br>
      <form onSubmit={Update} className="my-form">
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
            collector Name
          </label>
          <input
            type="text"
            required
            className="form-control"
            id="collectorName"
            placeholder="Enter collectorName"
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
            placeholder="Enter Working Mode"
            value={garbageType}
            onChange={(e) => {
              setGarbageType(e.target.value);
            }}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          UPDATE
        </button>
      </form>
    </div>
  );
}
