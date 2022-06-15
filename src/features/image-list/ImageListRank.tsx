import './ImageList.scss';
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { useTranslation } from "react-i18next";
import PhotoswipeWrapper from "../../common/components/photoswipe-wrapper/PhotoswipeWrapper";
import { File } from "../../common/dto/file";
import ErrorAlert from '../../common/components/error-alert/ErrorAlert';
import Container from 'react-bootstrap/esm/Container';
import { useEffect, useState } from 'react';
import { fetchFileList } from '../../common/utils/fileApiCall';
import { Gallery } from '../../common/dto/gallery';

function ImageListRank() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const FILE_LIMIT = 10;

  useEffect(() => {
    setIsLoading(true);
    fetchFileList(
      FILE_LIMIT,
      "",
      false,
      true,
      true,
      f => setImages(f),
      e => {
        console.error(e);
        setAlertMsg(t("imageList.alert.loadErr"));
      },
      () => setIsLoading(false)
    );
  }, [t]);

  return (
    <Container fluid className="pb-5">
      <Row>
        <Col>
          <h2 className="pt-3 text-center">{t('imageList.title.rank')}</h2>
        </Col>
      </Row>
      <ErrorAlert msg={alertMsg} variant="danger" />
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
        isLoading={isLoading}
        gallery={Gallery.RANK}
        images={images}/>
    </Container>
  );
}

export default ImageListRank;