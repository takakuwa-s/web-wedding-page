import liff from "@line/liff/dist/lib";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../../app/hooks";
import { updateAlertMsg } from "../../../features/image-list/fileSlice";
import AddButton from "../../../resource/add-button.png";
import { sendMessageToChat } from "../../utils/lineApiCall";
import './AddFileButton.scss';

function AddFileButton() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const onclick = () => {
    sendMessageToChat(
      [{
        type: "text",
        text: t("imageList.addFiles")
      }],
      () => liff.closeWindow(),
      e => {
        console.error(e);
        dispatch(updateAlertMsg(t("imageList.alert.addFileError")));
      }
    );
  };

  if (!liff.isApiAvailable('shareTargetPicker')) {
    return <></>;
  }

  return (
    <button className="add-file-btn" onClick={onclick}>
      <img src={AddButton} alt="add button" className="add-file-btn-img" />
    </button>
  );
}

export default AddFileButton;