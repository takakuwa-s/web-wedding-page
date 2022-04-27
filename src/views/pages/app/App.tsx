import WeddingNavbar from '../../components/wedding-navbar/WeddingNavbar';
import Attendance from '../attendance/Attendance';
import './App.scss';
import AttendanceConfirm from '../attendance-confirm/AttendanceConfirm';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../home/Home';

function App() {
  return (
    <BrowserRouter>
      <WeddingNavbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="attendance/confirm" element={<AttendanceConfirm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;