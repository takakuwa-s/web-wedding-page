import { useTranslation } from "react-i18next";
import { User } from "../../dto/user";
import AttendanceConfirmItem from "../attendance-confirm-item/AttendanceConfirmItem";

function AttendanceConfirmContent(props: IProps) {
  const { t } = useTranslation();
  const { attendance, guestType, familyName, firstName, familyNameKana, firstNameKana,
    phoneNumber, postalCode, address, allergy, message} = props.user;

  return (
    <>
      <AttendanceConfirmItem
        label={t("attendance.attendance.label")}
        value={attendance ? t("attendance.attendance.attend") : t("attendance.attendance.decline")}
      />
      <AttendanceConfirmItem
        label={t("attendance.guestType.label")}
        value={t(`attendance.guestType.${guestType.toLowerCase()}`)}
      />
      <AttendanceConfirmItem
        label={t("attendance.name.label")}
        value={`${familyName} ${firstName}`}
      />
      <AttendanceConfirmItem
        label={t("attendance.nameKana.label")}
        value={`${familyNameKana} ${firstNameKana}`}
      />
      <AttendanceConfirmItem
        label={t("attendance.phone.label")}
        value={phoneNumber}
      />
      <AttendanceConfirmItem
        label={t("attendance.postalCode.label")}
        value={postalCode}
      />
      <AttendanceConfirmItem
        label={t("attendance.address.label")}
        value={address}
      />
      <AttendanceConfirmItem
        label={t("attendance.allergy.label")}
        value={allergy}
      />
      <AttendanceConfirmItem
        label={t("attendance.message.label")}
        value={message}
        as="pre"
      />
    </>
  );
}

interface IProps {
  user: User;
}

export default AttendanceConfirmContent;