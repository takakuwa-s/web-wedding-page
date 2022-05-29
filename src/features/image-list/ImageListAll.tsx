import './ImageList.scss';
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { useTranslation } from "react-i18next";
import PhotoswipeWrapper from "../../common/components/photoswipe-wrapper/PhotoswipeWrapper";
import { File } from "../../common/dto/file";
import ReloadButton from '../../common/components/reload-button/ReloadButton';
import liff from '@line/liff/dist/lib';

function ImageListAll(props: IProps) {
  const { t } = useTranslation();

  return (
    <>
      {liff.getOS() === "ios" && (
        <Row className="pt-3 pb-1">
          <Col xs={{span: 10, offset: 1}} lg={{span: 8, offset: 2}} xxl={{span: 6, offset: 3}} className="photo-explain-container px-1">
            <p className="my-1">{t("imageList.iosSave")}</p>
          </Col>
        </Row>
      )}
      <PhotoswipeWrapper
        isLoading={props.isLoading}
        galleryID={props.galleryID}
        images={props.images}/>
      <ReloadButton 
        isReloading={props.isReloading}
        disableReload={props.isAll}
        disableReloadBtnTxt={t("imageList.button.allLoaded")}
        reloadBtnTxt={t("imageList.button.reload")}
        onReloadButtonClicked={props.reloadImage} />
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
}

export default ImageListAll;