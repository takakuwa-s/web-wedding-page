import { useEffect, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { useTranslation } from "react-i18next";
import PhotoswipeWrapper from "../../common/components/photoswipe-wrapper/PhotoswipeWrapper";
import ReloadButton from '../../common/components/reload-button/ReloadButton';
import Button from 'react-bootstrap/esm/Button';
import ErrorAlert from "../../common/components/error-alert/ErrorAlert";
import Container from "react-bootstrap/esm/Container";
import { deleteFileList, fetchFileList } from "../../common/utils/fileApiCall";
import { Gallery } from "../../common/dto/gallery";
import CheckImages from "../../common/components/select-images/CheckImages";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { updateAlertMsg, updateFiles, updateFilesAndAlertMsg } from "./fileSlice";

function ImageListMy() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const files = useAppSelector((state: RootState) => state.files.files);
  const alertMsg = useAppSelector((state: RootState) => state.files.alertMsg);
  const [canMultiSelect, setCanMultiSelect] = useState(false);
  const [checkedFileIds, setCheckedFileIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isReloading, setIsReloading] = useState(false);
  const [disableReloading, setDisableReloading] = useState(false);
  const FILE_LIMIT = 50;

  useEffect(() => {
    setIsLoading(true);
    fetchFileList(
      FILE_LIMIT,
      "",
      true,
      false,
      null,
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
  }, [t, dispatch]);

  const reloadImage = () => {
    setIsReloading(true);
    fetchFileList(
      FILE_LIMIT,
      files[files.length - 1].id,
      true,
      false,
      null,
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
        dispatch(updateAlertMsg("imageList.alert.reloadErr"));
      },
      () => setIsReloading(false)
    );
  };

  const removeMultipleImages = () => {
    setCanMultiSelect(false);
    const list = files;
    const deletedList = files.filter(f => !checkedFileIds.includes(f.id));
    dispatch(updateFiles(deletedList));
    deleteFileList(
      checkedFileIds,
      () => dispatch(updateAlertMsg("")),
      e => {
        console.error(e);
        dispatch(updateFilesAndAlertMsg({files: list, alertMsg: t("imageList.alert.deleteErr")}));
      },
      () => {});
    setCheckedFileIds([]);
  }

  const enableMultiSelect = () => {
    setCheckedFileIds([]);
    dispatch(updateAlertMsg(""));
    setCanMultiSelect(!canMultiSelect)
  };

  return (
    <Container fluid className="pb-5">
      <div className="fixed-top bg-white">
        <Row>
          <Col>
            <h2 className="pt-3 text-center">{t('imageList.title.my')}</h2>
          </Col>
        </Row>
        <Row className="pt-0 pb-1">
          <Col xs={4} className="ps-4 text-start">
            <Button
              type="button"
              size="sm"
              disabled={!files.length}
              variant={canMultiSelect ? "outline-dark" : "outline-info" }
              onClick={enableMultiSelect}
            >{canMultiSelect ? t("common.button.cancel") : t("common.button.select")}
            </Button>
          </Col>
          <Col xs={4} className="text-center">
            {canMultiSelect && (
              <Button
                type="button"
                size="sm"
                variant="outline-danger"
                disabled={checkedFileIds.length === 0}
                onClick={removeMultipleImages}
              >{t("common.button.delete")}
              </Button>
            )}
          </Col>
        </Row>
        <ErrorAlert msg={alertMsg} variant="danger" />
      </div>
      <div className={alertMsg ? 'image-list-container-with-alert' : 'image-list-container'}>
        {canMultiSelect ? (
          <CheckImages
            onCheck={setCheckedFileIds}
          />
        ) : (
          <PhotoswipeWrapper
            isLoading={isLoading}
            gallery={Gallery.MY}
            showDeleteBtn
            showInformation
          />
        )}
        {!canMultiSelect && (
          <ReloadButton
            isReloading={isReloading}
            disableReload={disableReloading}
            disableReloadBtnTxt={t("imageList.button.allLoaded")}
            reloadBtnTxt={t("imageList.button.reload")}
            onReloadButtonClicked={reloadImage} />
        )}
      </div>
    </Container>
  );
}

export default ImageListMy;