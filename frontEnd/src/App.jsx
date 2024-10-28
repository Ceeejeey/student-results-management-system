import AdminDashboard from "./admin/AdminDashboard";
import StudentDashbord from "./Student/StudentDashBord";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Main11 from "./ui/Main11";
<<<<<<< Updated upstream
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
=======

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
>>>>>>> Stashed changes

import './index.css';
import Calendar from "./components/Calender";


const App = () => {

  
  return (
    <Router>
      {/* Header and Sidebar should be part of the layout, outside the Routes */}
      
      
      
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admindashbord" element={<AdminDashboard className='h-screen bg-blue-500' />} />
          <Route path="/studentdashbord" element={<StudentDashbord />} />
          <Route path="/main" element={<Main11/>}/>
          <Route path="/calender" element={<Calendar/>} />
          
      
        </Routes>
      
    </Router>
  );
}

export default App;
