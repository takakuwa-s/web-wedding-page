import { useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { useTranslation } from "react-i18next";
import PhotoswipeWrapper from "../../common/components/photoswipe-wrapper/PhotoswipeWrapper";
import { File } from "../../common/dto/file";
import ReloadButton from '../../common/components/reload-button/ReloadButton';
import Button from 'react-bootstrap/esm/Button';
import CheckImages from "../../common/components/select-images/CheckImages";

function ImageListMy(props: IProps) {
  const { t } = useTranslation();
  const [canMultiSelect, setCanMultiSelect] = useState(false);
  const [checkedFileIds, setCheckedFileIds] = useState<string[]>([]);

  const removeMultipleImages = () => {
    setCanMultiSelect(false);
    console.log(checkedFileIds);
    props.removeMultipleImages(checkedFileIds)
    setCheckedFileIds([]);
  }

  return (
    <>
      <Row className="pt-0 pb-1">
        <Col xs={4} className="pl-3 text-start">
          <Button
            type="button"
            size="sm"
            variant={canMultiSelect ? "outline-dark" : "outline-info" }
            onClick={() => setCanMultiSelect(!canMultiSelect)}
          >{canMultiSelect ? t("common.button.cancel") : t("common.button.select")}
          </Button>
        </Col>
        <Col xs={4} className="text-center">
          {canMultiSelect && (
            <Button
              type="button"
              size="sm"
              variant="outline-danger"
              onClick={removeMultipleImages}
            >{t("common.button.delete")}
            </Button>
          )}
        </Col>
      </Row>
      {canMultiSelect ? (
        <CheckImages
          images={props.images}
          onCheck={setCheckedFileIds}
        />
      ) : (
        <PhotoswipeWrapper
          isLoading={props.isLoading}
          galleryID={props.galleryID}
          images={props.images}
          showDeleteBtn
          onClickDeleteBtn={props.removeImage}
        />
      )}
      {!canMultiSelect && (
        <ReloadButton 
          isReloading={props.isReloading}
          disableReload={props.isAll}
          disableReloadBtnTxt={t("imageList.button.allLoaded")}
          reloadBtnTxt={t("imageList.button.reload")}
          onReloadButtonClicked={props.reloadImage} />
      )}
    </>
  );
}

interface IProps {
  images: File[];
  isAll: boolean;
  isLoading: boolean;
  isReloading: boolean;
  galleryID: string;
  reloadImage: () => void;
  removeImage: (id: string, pswp: any) => void;
  removeMultipleImages: (ids: string[]) => void;
}

export default ImageListMy;