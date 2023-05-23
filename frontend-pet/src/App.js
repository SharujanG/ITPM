import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import AddPet from './components/AddPet';
import AllPets from './components/AllPets';
// import Header from './components/Header';
import Register from './components/Register';
import UpdatePet from './components/UpdatePet';
import NavBar from './components/NavBar';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <div>
        {/* <Header/> */}
        {<NavBar/>}
        <Routes>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/pets" element={<AllPets/>}/>
          <Route path="/add-pet" element={<AddPet/>}/>
          <Route path="/update-pet/:id" element={<UpdatePet/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
