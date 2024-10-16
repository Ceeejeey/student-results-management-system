import Dashbord from "./pages/Dashbord";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

function App() {
  return(   
    <Router>
      <Routes>
        
        <Route path='/' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashbord' element={<Dashbord />} />

      </Routes>
    </Router>
  );
}

export default App;
