import './ImageList.scss';
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { useTranslation } from "react-i18next";
import PhotoswipeWrapper from "../../common/components/photoswipe-wrapper/PhotoswipeWrapper";
import ReloadButton from '../../common/components/reload-button/ReloadButton';
import liff from '@line/liff/dist/lib';
import Container from 'react-bootstrap/esm/Container';
import ErrorAlert from '../../common/components/error-alert/ErrorAlert';
import { fetchFileList } from '../../common/utils/fileApiCall';
import { SetStateAction, useEffect, useState } from 'react';
import { Gallery } from '../../common/dto/gallery';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { updateAlertMsg, updateFiles, updateFilesAndAlertMsg } from './fileSlice';
import { FileStatus } from '../../common/dto/file';
import CheckImages from '../../common/components/check-images/CheckImages';
import Button from 'react-bootstrap/esm/Button';
import { CheckImage } from '../../common/dto/checkImage';
import { shareMessageToChat } from '../../common/utils/lineApiCall';
import { downloadFile, generateZipDownloadUrl } from '../../common/utils/fileDownloadUtils';
import AddFileButton from '../../common/components/add-file-button/AddFileButton';
import { useNavigate } from 'react-router-dom';

function ImageListAll() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.user.user);
  const files = useAppSelector((state: RootState) => state.files.files);
  const alertMsg = useAppSelector((state: RootState) => state.files.alertMsg);
  const [canMultiSelect, setCanMultiSelect] = useState(false);
  const [checkImages, setCheckImages] = useState<CheckImage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isReloading, setIsReloading] = useState(false);
  const [disableReloading, setDisableReloading] = useState(false);
  const [reloadAlertMsg, setReloadAlertMsg] = useState("");
  const FILE_LIMIT = 66;

  useEffect(() => {
    setIsLoading(true);
    fetchFileList(
      [FileStatus.OPEN, FileStatus.UPLOADED],
      FILE_LIMIT,
      "",
      false,
      false,
      user.isAdmin,
      false,
      f => {
        if (f.length < FILE_LIMIT) {
          setDisableReloading(true);
        }
        dispatch(updateFiles(f));
      },
      e => {
        console.error(e);
        setDisableReloading(true);
        dispatch(updateFilesAndAlertMsg({files: [], alertMsg: t("imageList.alert.loadErr")}));
      },
      () => setIsLoading(false)
    );
  }, [t, user.isAdmin, dispatch]);

  const reloadImage = () => {
    setIsReloading(true);
    fetchFileList(
      [FileStatus.OPEN, FileStatus.UPLOADED],
      FILE_LIMIT,
      files[files.length - 1].id,
      false,
      false,
      user.isAdmin,
      false,
      f => {
        if (f.length < FILE_LIMIT) {
          setDisableReloading(true);
        }
        const list = files.concat(f);
        dispatch(updateFiles(list));
      },
      e => {
        console.error(e);
        setReloadAlertMsg(t("imageList.alert.reloadErr") as SetStateAction<string>);
      },
      () => setIsReloading(false)
    );
  };

  const shareMultipleImages = () => {
    if (!liff.isApiAvailable('shareTargetPicker')) {
      dispatch(updateAlertMsg(t("error.description.unavailableSendMessageErr")));
      return;
    }
    if (checkImages.length > 5) {
      dispatch(updateAlertMsg(t("imageList.alert.outnumberShareMessageErr")));
      return;
    }
    const msg = checkImages
      .map(c => {
        return {
          "type": c.fileType,
          "originalContentUrl": c.contentUrl,
          "previewImageUrl": c.thumbnailUrl
        };
      });
    shareMessageToChat(
      msg,
      () => dispatch(updateAlertMsg("")),
      e => {
        console.error(e);
        dispatch(updateAlertMsg(t("imageList.alert.shareMessageErr")));
      },
      () => setCanMultiSelect(false));
  };

  const downloadMultipleImages = async () => {
    if (liff.isInClient()) {
      let url: string = window.location.protocol + '//' + window.location.host + '/image/buik_download?';
      checkImages.map(c => c.id).forEach(id => url += `id=${id}&`);
      url += `expire=${new Date().getTime() + 60000}`
      url += `&token=${liff.getAccessToken()}`
      console.log(url);
      liff.openWindow({
        url: url,
        external: true,
      });
      setCanMultiSelect(false);
      return;
    }
    const folderName = t("imageList.bulkDownloadFolderName");
    generateZipDownloadUrl(checkImages, folderName)
    .then((url: string) => {
      downloadFile(url, folderName + '.zip');
      URL.revokeObjectURL(url);
    }).catch(e => {
      console.error(e);
      dispatch(updateAlertMsg(t("imageList.alert.bulkDownloadErr")));
    }).finally(() => {
      setCanMultiSelect(false);
    });
  };

  const switchMultiSelect = () => {
    setCheckImages([]);
    dispatch(updateAlertMsg(""));
    setCanMultiSelect(!canMultiSelect)
  };

  return (
    <Container fluid className="pb-5">
      <div className="fixed-top bg-white">
        <Row>
          <Col>
            <h2 className="pt-3 text-center">{t('imageList.title.all')}</h2>
          </Col>
        </Row>
        <Row className="pt-0 pb-1">
          <Col className="ps-4 ">
            <Button
              type="button"
              className="me-2"
              size="sm"
              disabled={!files.length}
              variant={canMultiSelect ? "outline-dark" : "outline-info" }
              onClick={switchMultiSelect}
            >{canMultiSelect ? t("common.button.cancel") : t("common.button.select")}
            </Button>
            {canMultiSelect && (
              <>
                <Button
                  type="button"
                  size="sm"
                  variant="outline-info"
                  disabled={checkImages.length === 0}
                  onClick={shareMultipleImages}
                >{t("imageList.button.share")}
                </Button>
                <Button
                  type="button"
                  size="sm"
                  className='mx-2'
                  variant="outline-info"
                  disabled={checkImages.length === 0}
                  onClick={downloadMultipleImages}
                >{t("imageList.button.bulkDownload")}
                </Button>
                {/* {(liff.getOS() === "ios" || liff.getOS() === "android") && (
                  <Button
                    type="button"
                    size="sm"
                    variant="outline-secondary"
                    onClick={() => navigate("/image/buik_download/help")}
                  >{t("imageList.button.bulkDownloadHelp")}
                  </Button>
                )} */}
              </>
            )}
            {liff.getOS() === "ios" && !canMultiSelect && !alertMsg && (
              <span className="photo-explain-container m-3 p-1">{t("imageList.iosSave")}</span>
            )}
            {liff.getOS() === "android" && !canMultiSelect && !alertMsg && (
              <span className="photo-explain-container m-3 p-1">{t("imageList.androidSave")}</span>
            )}
          </Col>
        </Row>
        <ErrorAlert msg={alertMsg} variant="danger" />
      </div>
      <div className={alertMsg ? 'image-list-container-with-alert' : 'image-list-container'}>
        {canMultiSelect ? (
          <CheckImages onCheck={setCheckImages} />
        ) : (
          <PhotoswipeWrapper
            isLoading={isLoading}
            gallery={Gallery.ALL}
            showInformation={user.isAdmin}
            showDeleteBtn={user.isAdmin}
            showPatchBtn={user.isAdmin}
            allowSharing/>
        )}
        {!canMultiSelect && (
          <ReloadButton
            alertMsg={reloadAlertMsg}
            isReloading={isReloading}
            disableReload={disableReloading}
            disableReloadBtnTxt={t("imageList.button.allLoaded")}
            reloadBtnTxt={t("imageList.button.reload")}
            onReloadButtonClicked={reloadImage} />
        )}
      </div>
      <AddFileButton/>
    </Container>
  );
}

export default ImageListAll;