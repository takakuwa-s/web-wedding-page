import { useState } from "react";
import { useTranslation } from "react-i18next";
import BottomNavbar from "../../common/components/bottom-navbar/BottomNavbar";
import AdminInvitation from "../admin-invitation/AdminInvitation";
import AdminReminder from "../admin-reminder/AdminReminder";
import ErrorPage from "../error-page/ErrorPage";

enum Page {
  INVITATION = "INVITATION",
  REMINDER = "REMINDER",
}

function Admin() {
  const { t } = useTranslation();
  const [page, setPage] = useState<Page>(Page.INVITATION);
  const switchPage = (eventKey: any, event: any) => {
    setPage(eventKey);
  }
  const navs = [
    {
      id: Page.INVITATION,
      title: t("admin.tab.invitation"),
    },
    {
      id: Page.REMINDER,
      title: t("admin.tab.reminder"),
    },
  ];

  let content: JSX.Element;
  switch (page) {
    case Page.INVITATION:
      content = <AdminInvitation />;
      break;
    case Page.REMINDER:
      content = <AdminReminder />;
      break;
    default:
      return <ErrorPage err={{code: 500, message: `Unknown page: ${page}`, descriptionKey: 'error.description.unknown'}}/>
  }
  return (
    <>
      {content}
      <BottomNavbar navs={navs} onSelectNav={switchPage}/>
    </>
  );
}

export default Admin;
