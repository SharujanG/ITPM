import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import AddJob from './components/AddJob';
import AllJobs from './components/AllJobs';
// import Header from './components/Header';
import Register from './components/Register';
import UpdateJob from './components/UpdateJob';
import NavBar from './components/NavBar';
import Login from './components/Login';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <div>
        {/* <Header/> */}
        {<NavBar/>}
        <Routes>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/jobs" element={<AllJobs/>}/>
          <Route path="/add-job" element={<AddJob/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/update-job/:id" element={<UpdateJob/>}/>
          
        </Routes>
      </div>
    </Router>
    
  );
}

export default App;
