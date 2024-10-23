import AdminDashboard from "./admin/AdminDashboard";
import StudentDashbord from "./Student/StudentDashBord";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Main11 from "./ui/Main11";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import './index.css';


const App = () => {

  
  return (
    <Router>
      {/* Header and Sidebar should be part of the layout, outside the Routes */}
      
      
      
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admindashbord" element={<AdminDashboard className='bg-blue-500 h-screen' />} />
          <Route path="/studentdashbord" element={<StudentDashbord />} />
          <Route path="/main" element={<Main11/>}/>
      
        </Routes>
      
    </Router>
  );
}

export default App;
