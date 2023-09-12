import { useTranslation } from "react-i18next";
import { User } from "../../dto/user";
import AttendanceConfirmItem from "../attendance-confirm-item/AttendanceConfirmItem";

function AttendanceConfirmContent(props: IProps) {
  const { t } = useTranslation();
  const { attendance, guestType, name, nameKana,
    email, postalCode, address, allergy, companions, message} = props.user;
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
        value={name}
      />
      <AttendanceConfirmItem
        label={t("attendance.nameKana.label")}
        value={nameKana}
      />
      <AttendanceConfirmItem
        label="メールアドレス"
        value={email}
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
        label="お連れ様1 名前"
        value={companions[0].name}
      />
      <AttendanceConfirmItem
        label="お連れ様1 アレルギー"
        value={companions[0].allergy}
      />
      <AttendanceConfirmItem
        label="お連れ様1 名前"
        value={companions[1].name}
      />
      <AttendanceConfirmItem
        label="お連れ様2 アレルギー"
        value={companions[1].allergy}
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