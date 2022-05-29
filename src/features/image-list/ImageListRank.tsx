import './ImageList.scss';
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { useTranslation } from "react-i18next";
import PhotoswipeWrapper from "../../common/components/photoswipe-wrapper/PhotoswipeWrapper";
import { File } from "../../common/dto/file";

function ImageListRank(props: IProps) {
  const { t } = useTranslation();

  return (
    <>
      <Row className="py-3">
        <Col xs={{span: 10, offset: 1}} lg={{span: 8, offset: 2}} xxl={{span: 6, offset: 3}} className="photo-explain-container px-1">
          <ol className="my-1">
            <li>{t("imageList.rank.rules.faceScore")}</li>
            <li>{t("imageList.rank.rules.faceHappinessLevel")}</li>
            <li>{t("imageList.rank.rules.facePhotoBeauty")}</li>
            <li>{t("imageList.rank.rules.bonus")}</li>
            <li>{t("imageList.rank.rules.other")}</li>
          </ol>
        </Col>
      </Row>
      <PhotoswipeWrapper
        showAsRanking
        isLoading={props.isLoading}
        galleryID={props.galleryID}
        images={props.images}/>
    </>
  );
}

interface IProps {
  images: File[];
  isLoading: boolean;
  galleryID: string;
}

export default ImageListRank;