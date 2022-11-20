import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AllTasks from './Components/AllTasks';


function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
          <Route path='/' element = {<AllTasks/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
