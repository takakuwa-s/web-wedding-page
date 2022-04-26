import WeddingNavbar from '../../components/wedding-navbar/WeddingNavbar';
import Attendance from '../attendance/Attendance';
import './App.scss';
import { initUser } from '../../../dto/user';
import AttendanceConfirm from '../attendance-confirm/AttendanceConfirm';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../home/Home';

function App() {
  const user = initUser();
  return (
    <BrowserRouter>
      <WeddingNavbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="attendance" element={<Attendance user={user} />} />
        <Route path="attendance/confirm" element={<AttendanceConfirm user={user} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;