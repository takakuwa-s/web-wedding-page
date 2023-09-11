import WeddingNavbar from '../common/components/wedding-navbar/WeddingNavbar';
import Attendance from '../features/attendance/Attendance';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../features/home/Home';
import { error } from '../common/dto/error';
import ImageList from '../features/image-list/ImageList';
import UserDetail from '../features/user-detail/UserDetail';
import { useAppDispatch, useAppSelector } from './hooks';
import { updateUserAndFetched } from '../features/user-detail/userSlice';
import Admin from '../features/admin/Admin';
import { GuestType, User, initCompanions } from '../common/dto/user';
import ErrorPage from '../features/error-page/ErrorPage';
import AdminUserDetail from '../features/admin-user-detail/AdminUserDetail';
import { Gallery } from '../common/dto/gallery';
import { AdminPage } from '../common/dto/adminPage';
import BulkDownloadFiles from '../features/image-list/BulkDownloadFiles';
import { RootState } from './store';
import { getUser } from '../common/utils/userApiCall';
import liff from '@line/liff/dist/lib';
import { Config } from '../common/dto/config';
import { getConfig } from '../common/utils/configApiCall';
import { updateConfigAndFetched } from './configSlice';
import BulkDownloadFilesHelp from '../features/image-list/BulkDownloadFilesHelp';

function App() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.user.user);
  const userFetched = useAppSelector((state: RootState) => state.user.fetched);
  const config = useAppSelector((state: RootState) => state.config.config);
  const configFetched = useAppSelector((state: RootState) => state.config.fetched);
  if (!userFetched) {
    let userId = liff.getDecodedIDToken()?.sub;
    if (process.env.REACT_APP_ENV === 'local') {
      userId = "U544c7c84c496d89b3f56b034b75f8dae";
    }
    getUser(userId!,
      (u: User) => {
        if (!u.guestType) {
          u.guestType = GuestType.GROOM;
        }
        if (!u.companions) {
          u.companions = initCompanions();
        }
        dispatch(updateUserAndFetched({user: u, fetched: true}));
    });
  }
  if (!configFetched) {
    getConfig((c: Config) => {
      dispatch(updateConfigAndFetched({config: c, fetched: true}));
    })
  }

  const notFoundError: error = {code: 404, message: 'Not Found', descriptionKey: 'error.description.notFound'};
  const forbiddenError: error = {code: 403, message: 'Forbidden', descriptionKey: 'error.description.forbidden'};
  return (
    <BrowserRouter>
      <WeddingNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {config.attendanceFeatureAvailable && <Route path="attendance" element={<Attendance />} />}
        {config.fileFeatureAvailable && (
          <>
          <Route path="image/list/all" element={<ImageList gallery={Gallery.ALL} />} />
          <Route path="image/list/my" element={<ImageList gallery={Gallery.MY} />} />
          <Route path="image/list/rank" element={<ImageList gallery={Gallery.RANK} />} />
          <Route path="image/list/memory" element={<ImageList gallery={Gallery.MEMORY} />} />
          <Route path="image/buik_download" element={<BulkDownloadFiles />}  />
          <Route path="image/buik_download/help" element={<BulkDownloadFilesHelp />}  />
          </>
        )}
        <Route path="user" element={<UserDetail />} />
        {user.isAdmin ? (
          <>
            <Route path="admin/users" element={<Admin adminPage={AdminPage.USERS} />} />
            <Route path="admin/user/:id" element={<AdminUserDetail />} />
            <Route path="admin/push_notification" element={<Admin  adminPage={AdminPage.PUSH_NOTIFICATION} />} />
            <Route path="admin/slide_show" element={<Admin adminPage={AdminPage.SLIDE_SHOW} />} />
          </>
        ) : (
          <Route path="admin/*" element={<ErrorPage err={forbiddenError}/>} />
        )}
        <Route path="*" element={<ErrorPage err={notFoundError}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;