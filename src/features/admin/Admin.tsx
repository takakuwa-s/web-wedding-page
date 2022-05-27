import { useState } from "react";
import { useTranslation } from "react-i18next";
import BottomNavbar from "../../common/components/bottom-navbar/BottomNavbar";
import AdminPushNotification from "../admin-push-notification/AdminPushNotification";
import AdminUsers from "../admin-users/AdminUsers";
import ErrorPage from "../error-page/ErrorPage";

enum AdminPage {
  USERS = "USERS",
  PUSH_NOTIFICATION = "PUSH_NOTIFICATION",
}

function Admin() {
  const { t } = useTranslation();
  const [adminPage, setAdminPage] = useState<AdminPage>(AdminPage.USERS);
  const switchPage = (eventKey: any, event: any) => {
    setAdminPage(eventKey);
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

  let content: JSX.Element;
  switch (adminPage) {
    case AdminPage.USERS:
      content = <AdminUsers />;
      break;
    case AdminPage.PUSH_NOTIFICATION:
      content = <AdminPushNotification />;
      break;
    default:
      return <ErrorPage err={{code: 500, message: `Unknown admin page: ${adminPage}`, descriptionKey: 'error.description.unknown'}}/>
  }
  return (
    <>
      {content}
      <BottomNavbar navs={navs} onSelectNav={switchPage}/>
    </>
  );
}

export default Admin;
