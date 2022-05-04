import WeddingNavbar from '../../components/wedding-navbar/WeddingNavbar';
import Attendance from '../attendance/Attendance';
import './App.scss';
import AttendanceConfirm from '../attendance-confirm/AttendanceConfirm';
import Error from '../error/Error';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../home/Home';
import { error } from '../../../dto/error';

function App() {
  const notFoundError: error = {code: 404, message: 'Not Found', descriptionKey: 'error.description.notFound'};
  return (
    <BrowserRouter>
      <WeddingNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="attendance/confirm" element={<AttendanceConfirm />} />
        <Route path="*" element={<Error err={notFoundError}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;