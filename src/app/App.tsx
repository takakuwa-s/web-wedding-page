import WeddingNavbar from '../common/components/wedding-navbar/WeddingNavbar';
import Attendance from '../features/attendance/Attendance';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../features/home/Home';
import { error } from '../common/dto/error';
import ImageList from '../features/image-list/ImageList';
import UserDetail from '../features/user-detail/UserDetail';
import { useAppDispatch } from './hooks';
import { updateUser } from '../features/user-detail/userSlice';
import Admin from '../features/admin/Admin';
import { User } from '../common/dto/user';
import ErrorPage from '../features/error-page/ErrorPage';
import { File } from "./../common/dto/file";
import { updateFiles } from '../features/image-list/fileSlice';
import AdminUserDetail from '../features/admin-user-detail/AdminUserDetail';

function App(props: IProps) {
  const dispatch = useAppDispatch();
  dispatch(updateUser(props.user));
  dispatch(updateFiles(props.files));

  const notFoundError: error = {code: 404, message: 'Not Found', descriptionKey: 'error.description.notFound'};
  return (
    <BrowserRouter>
      <WeddingNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="image/list" element={<ImageList />} />
        <Route path="user" element={<UserDetail />} />
        {props.user.isAdmin && <Route path="admin" element={<Admin />} />}
        {props.user.isAdmin && <Route path="admin/user/:id" element={<AdminUserDetail />} />}
        <Route path="*" element={<ErrorPage err={notFoundError}/>} />
      </Routes>
    </BrowserRouter>
  );
}

interface IProps {
  user: User;
  files: File[];
}

export default App;