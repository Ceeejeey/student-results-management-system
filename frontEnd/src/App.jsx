import AdminDashboard from "./admin/AdminDashboard";
import StudentDashbord from "./Student/StudentDashBord";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Main11 from "./ui/Main11";



import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';





import './index.css';
import Calendar from "./components/Calender";
import SelectUser from "./selectUser/SelectUser";
import TeacherRegister from "./pages/TeacherRegister";


const App = () => {

  
  return (
    <Router>
      {/* Header and Sidebar should be part of the layout, outside the Routes */}
      
      
      
        <Routes>
          <Route path="/" element={<SelectUser/>} />
          <Route path="/student-registration" element={<Register />} />
          <Route path="/teacher-registration" element={<TeacherRegister/>} />
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
