import { useState } from "react";
import { useTranslation } from "react-i18next";
import BottomNavbar from "../../common/components/bottom-navbar/BottomNavbar";
import { PushMessageType } from "../../common/dto/push-message-type";
import AdminInvitation from "../admin-invitation/AdminInvitation";
import AdminReminder from "../admin-reminder/AdminReminder";
import AdminUsers from "../admin-users/AdminUsers";
import ErrorPage from "../error-page/ErrorPage";

function Admin() {
  const { t } = useTranslation();
  const [pushMessageType, setPushMessageType] = useState<PushMessageType>(PushMessageType.USERS);
  const switchPage = (eventKey: any, event: any) => {
    setPushMessageType(eventKey);
  }
  const navs = [
    {
      id: PushMessageType.USERS,
      title: t("admin.tab.users"),
    },
    {
      id: PushMessageType.INVITATION,
      title: t("admin.tab.invitation"),
    },
    {
      id: PushMessageType.REMINDER,
      title: t("admin.tab.reminder"),
    },
  ];

  let content: JSX.Element;
  switch (pushMessageType) {
    case PushMessageType.USERS:
      content = <AdminUsers />;
      break;
    case PushMessageType.INVITATION:
      content = <AdminInvitation />;
      break;
    case PushMessageType.REMINDER:
      content = <AdminReminder />;
      break;
    default:
      return <ErrorPage err={{code: 500, message: `Unknown push message type: ${pushMessageType}`, descriptionKey: 'error.description.unknown'}}/>
  }
  return (
    <>
      {content}
      <BottomNavbar navs={navs} onSelectNav={switchPage}/>
    </>
  );
}

export default Admin;
