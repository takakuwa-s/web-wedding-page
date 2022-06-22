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
import { useEffect, useState } from 'react';
import { Gallery } from '../../common/dto/gallery';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { updateFiles, updateFilesAndAlertMsg } from './fileSlice';
import { useSearchParams } from 'react-router-dom';

function ImageListAll() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const noLoad = searchParams.get("noLoad");
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.user.val);
  const images = useAppSelector((state: RootState) => state.files.files);
  const alertMsg = useAppSelector((state: RootState) => state.files.alertMsg);
  const [isLoading, setIsLoading] = useState(false);
  const [isReloading, setIsReloading] = useState(false);
  const [disableReloading, setDisableReloading] = useState(false);
  const [reloadAlertMsg, setReloadAlertMsg] = useState("");
  const FILE_LIMIT = 50;

  useEffect(() => {
    if (!noLoad) {
      setIsLoading(true);
      fetchFileList(
        FILE_LIMIT,
        "",
        false,
        false,
        true,
        user.isAdmin,
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
    }
  }, [t, user.isAdmin, dispatch, noLoad]);

  const reloadImage = () => {
    setIsReloading(true);
    fetchFileList(
      FILE_LIMIT,
      images[images.length - 1].id,
      false,
      false,
      true,
      user.isAdmin,
      f => {
        if (f.length < FILE_LIMIT) {
          setDisableReloading(true);
        }
        const list = images.concat(f);
        dispatch(updateFiles(list));
      },
      e => {
        console.error(e);
        setReloadAlertMsg(t("imageList.alert.reloadErr"));
      },
      () => setIsReloading(false)
    );
  };

  return (
    <Container fluid className="pb-5">
      <Row>
        <Col>
          <h2 className="pt-3 text-center">{t('imageList.title.all')}</h2>
        </Col>
      </Row>
      <ErrorAlert msg={alertMsg} variant="danger" />
      {liff.getOS() === "ios" && !alertMsg && (
        <Row className="pt-3 pb-1">
          <Col xs={{span: 10, offset: 1}} lg={{span: 8, offset: 2}} xxl={{span: 6, offset: 3}} className="photo-explain-container px-1">
            <p className="my-1">{t("imageList.iosSave")}</p>
          </Col>
        </Row>
      )}
      <PhotoswipeWrapper
        isLoading={isLoading}
        gallery={Gallery.ALL}
        showInformation={user.isAdmin}
        showDeleteBtn={user.isAdmin}/>
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

export default ImageListAll;