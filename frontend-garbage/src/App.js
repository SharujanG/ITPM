import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddGarbage from "./components/AddGarbage";
import AllGarbages from "./components/AllGarbages";
// import Header from './components/Header';
import Register from "./components/Register";
import UpdateGarbage from "./components/UpdateGarbage";
import NavBar from "./components/NavBar";
import Login from "./components/Login";

function App() {
  return (
    <Router>
      <div>
        {/* <Header/> */}
        {<NavBar />}
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/garbages" element={<AllGarbages />} />
          <Route path="/add-garbage" element={<AddGarbage />} />
          <Route path="/update-garbage/:id" element={<UpdateGarbage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
