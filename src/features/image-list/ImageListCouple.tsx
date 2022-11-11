import './ImageList.scss';
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { useTranslation } from "react-i18next";
import PhotoswipeWrapper from "../../common/components/photoswipe-wrapper/PhotoswipeWrapper";
import ReloadButton from '../../common/components/reload-button/ReloadButton';
import Container from 'react-bootstrap/esm/Container';
import ErrorAlert from '../../common/components/error-alert/ErrorAlert';
import { fetchFileList } from '../../common/utils/fileApiCall';
import { SetStateAction, useEffect, useState } from 'react';
import { Gallery } from '../../common/dto/gallery';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { updateFiles, updateFilesAndAlertMsg } from './fileSlice';
import { FileStatus } from '../../common/dto/file';

function ImageListCouple() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.user.val);
  const files = useAppSelector((state: RootState) => state.files.files);
  const alertMsg = useAppSelector((state: RootState) => state.files.alertMsg);
  const [isLoading, setIsLoading] = useState(false);
  const [isReloading, setIsReloading] = useState(false);
  const [disableReloading, setDisableReloading] = useState(false);
  const [reloadAlertMsg, setReloadAlertMsg] = useState("");
  const FILE_LIMIT = 50;

  useEffect(() => {
    setIsLoading(true);
    fetchFileList(
      FILE_LIMIT,
      "",
      false,
      false,
      [FileStatus.OPEN],
      false,
      true,
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
  }, [t, dispatch]);

  const reloadImage = () => {
    setIsReloading(true);
    fetchFileList(
      FILE_LIMIT,
      files[files.length - 1].id,
      false,
      false,
      [FileStatus.OPEN],
      false,
      true,
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

  return (
    <Container fluid className="pb-5">
      <Row>
        <Col>
          <h2 className="pt-3 text-center">{t('imageList.title.couple')}</h2>
        </Col>
      </Row>
      <ErrorAlert msg={alertMsg} variant="danger" />
      <PhotoswipeWrapper
        isLoading={isLoading}
        gallery={Gallery.COUPLE}
        showDeleteBtn={user.isAdmin}
        showPatchBtn={user.isAdmin}/>
      <ReloadButton
        alertMsg={reloadAlertMsg}
        isReloading={isReloading}
        disableReload={disableReloading}
        disableReloadBtnTxt={t("imageList.button.allLoaded")}
        reloadBtnTxt={t("imageList.button.reload")}
        onReloadButtonClicked={reloadImage} />
    </Container>
  );
}

export default ImageListCouple;