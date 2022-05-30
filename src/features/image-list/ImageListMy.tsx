import { useEffect, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { useTranslation } from "react-i18next";
import PhotoswipeWrapper from "../../common/components/photoswipe-wrapper/PhotoswipeWrapper";
import { File } from "../../common/dto/file";
import ReloadButton from '../../common/components/reload-button/ReloadButton';
import Button from 'react-bootstrap/esm/Button';
import ErrorAlert from "../../common/components/error-alert/ErrorAlert";
import Container from "react-bootstrap/esm/Container";
import { deleteFile, deleteFileList, fetchFileList } from "../../common/utils/fileApiCall";
import { Gallery } from "../../common/dto/gallery";
import CheckImages from "../../common/components/select-images/CheckImages";

function ImageListMy() {
  const { t } = useTranslation();
  const [canMultiSelect, setCanMultiSelect] = useState(false);
  const [checkedFileIds, setCheckedFileIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isReloading, setIsReloading] = useState(false);
  const [isAll, setIsAll] = useState(false);
  const [alertMsg, setAlertMsg] = useState({
    top: "",
    reload: "",
  });
  const [images, setImages] = useState<File[]>([]);
  const FILE_LIMIT = 50;

  useEffect(() => {
    setIsLoading(true);
    fetchFileList(
      FILE_LIMIT,
      "",
      true,
      false,
      f => {
        if (f.length < FILE_LIMIT) {
          setIsAll(true);
        }
        setImages(f);
      },
      e => {
        console.error(e);
        setAlertMsg({
          top: t("imageList.alert.loadErr"),
          reload: "",
        });
      },
      () => setIsLoading(false)
    );
  }, [t]);

  const reloadImage = () => {
    setIsReloading(true);
    fetchFileList(
      FILE_LIMIT,
      images[images.length - 1].id,
      true,
      false,
      f => {
        if (f.length < FILE_LIMIT) {
          setIsAll(true);
        }
        const list = images.concat(f);
        setImages(list);
        setAlertMsg({
          top: "",
          reload: "",
        });
      },
      e => {
        console.error(e);
        setAlertMsg({
          top: "",
          reload: t("imageList.alert.reloadErr"),
        });
      },
      () => setIsReloading(false)
    );
  };

  const removeImage = (id: string, pswp: any) => {
    const list = images;
    const deletedList = images.filter(i => i.id !== id);
    setImages(deletedList);
    pswp.close();
    deleteFile(
      id,
      () => {
        setAlertMsg({
          top: "",
          reload: "",
        });
      },
      e => {
        console.error(e);
        setImages(list);
        setAlertMsg({
          top: t("imageList.alert.deleteErr"),
          reload: "",
        });
      },
      () => {});
  };

  const removeMultipleImages = () => {
    setCanMultiSelect(false);
    const list = images;
    const deletedList = images.filter(f => !checkedFileIds.includes(f.id));
    setImages(deletedList);
    deleteFileList(
      checkedFileIds,
      () => {
        setAlertMsg({
          top: "",
          reload: "",
        });
      },
      e => {
        console.error(e);
        setImages(list);
        setAlertMsg({
          top: t("imageList.alert.deleteErr"),
          reload: "",
        });
      },
      () => {});
    setCheckedFileIds([]);
  }

  const enableMultiSelect = () => {
    setCheckedFileIds([]);
    setAlertMsg({
      top: "",
      reload: "",
    });
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
      </div>
      <div className="image-list-container">
        <ErrorAlert msg={alertMsg.top} variant="danger" />
        {canMultiSelect ? (
          <CheckImages
            images={images}
            onCheck={setCheckedFileIds}
          />
        ) : (
          <PhotoswipeWrapper
            isLoading={isLoading}
            gallery={Gallery.MY}
            images={images}
            showDeleteBtn
            onClickDeleteBtn={removeImage}
          />
        )}
        {!canMultiSelect && (
          <ReloadButton 
            alertMsg={alertMsg.reload}
            isReloading={isReloading}
            disableReload={isAll}
            disableReloadBtnTxt={t("imageList.button.allLoaded")}
            reloadBtnTxt={t("imageList.button.reload")}
            onReloadButtonClicked={reloadImage} />
        )}
      </div>
    </Container>
  );
}

export default ImageListMy;