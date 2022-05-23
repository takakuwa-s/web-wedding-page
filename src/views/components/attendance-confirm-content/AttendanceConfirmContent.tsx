import { useTranslation } from "react-i18next";
import { User } from "../../../dto/user";
import AttendanceConfirmItem from "../attendance-confirm-item/AttendanceConfirmItem";

function AttendanceConfirmContent(props: IProps) {
  const { t } = useTranslation();

  return (
    <>
      <AttendanceConfirmItem
        label={t("attendance.attendance.label")}
        value={props.user.attendance ? t("attendance.attendance.attend") : t("attendance.attendance.decline")}
      />
      <AttendanceConfirmItem
        label={t("attendance.guestType.label")}
        value={t("attendance.guestType." + props.user.guestType.toLowerCase())}
      />
      <AttendanceConfirmItem
        label={t("attendance.name.label")}
        value={props.user.familyName + " " + props.user.firstName}
      />
      <AttendanceConfirmItem
        label={t("attendance.nameKana.label")}
        value={props.user.familyNameKana + " " + props.user.firstNameKana}
      />
      <AttendanceConfirmItem
        label={t("attendance.phone.label")}
        value={props.user.phoneNumber}
      />
      <AttendanceConfirmItem
        label={t("attendance.postalCode.label")}
        value={props.user.postalCode}
      />
      <AttendanceConfirmItem
        label={t("attendance.address.label")}
        value={props.user.address}
      />
      <AttendanceConfirmItem
        label={t("attendance.allergy.label")}
        value={props.user.allergy}
      />
      <AttendanceConfirmItem
        label={t("attendance.message.label")}
        value={props.user.message}
        as="pre"
      />
    </>
  );
}

interface IProps {
  user: User;
}

export default AttendanceConfirmContent;