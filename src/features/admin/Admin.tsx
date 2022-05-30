import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import BottomNavbar from "../../common/components/bottom-navbar/BottomNavbar";
import { AdminPage } from "../../common/dto/adminPage";
import AdminPushNotification from "../admin-push-notification/AdminPushNotification";
import AdminUsers from "../admin-users/AdminUsers";

function Admin(props: IProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const switchPage = (eventKey: any, event: any) => {
    navigate(`/admin/${eventKey.toLowerCase()}`);
  }
  const navs = [
    {
      id: AdminPage.USERS,
      title: t("admin.tab.users"),
    },
    {
      id: AdminPage.PUSH_NOTIFICATION,
      title: t("admin.tab.pushNotification"),
    },
  ];
  const components = {
    USERS: <AdminUsers />,
    PUSH_NOTIFICATION: <AdminPushNotification />,
  };
  return (
    <>
      {components[props.adminPage]}
      <BottomNavbar navs={navs} onSelectNav={switchPage}/>
    </>
  );
}

interface IProps {
  adminPage: AdminPage;
}

export default Admin;
