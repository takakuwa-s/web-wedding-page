import './ImageList.scss';
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { useTranslation } from "react-i18next";
import PhotoswipeWrapper from "../../common/components/photoswipe-wrapper/PhotoswipeWrapper";
import ErrorAlert from '../../common/components/error-alert/ErrorAlert';
import Container from 'react-bootstrap/esm/Container';
import { useEffect, useState } from 'react';
import { fetchFileList } from '../../common/utils/fileApiCall';
import { Gallery } from '../../common/dto/gallery';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { updateFiles, updateFilesAndAlertMsg } from './fileSlice';

function ImageListRank() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.user.val);
  const alertMsg = useAppSelector((state: RootState) => state.files.alertMsg);
  const [isLoading, setIsLoading] = useState(false);
  const FILE_LIMIT = 10;

  useEffect(() => {
    setIsLoading(true);
    fetchFileList(
      FILE_LIMIT,
      "",
      false,
      true,
      true,
      user.isAdmin,
      f => dispatch(updateFiles(f)),
      e => {
        console.error(e);
        dispatch(updateFilesAndAlertMsg({files: [], alertMsg: t("imageList.alert.loadErr")}));
      },
      () => setIsLoading(false)
    );
  }, [t, user.isAdmin, dispatch]);

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
            <li>{t("imageList.rankRules.faceScore")}</li>
            <li>{t("imageList.rankRules.faceHappinessLevel")}</li>
            <li>{t("imageList.rankRules.facePhotoBeauty")}</li>
            <li>{t("imageList.rankRules.bonus")}</li>
            <li>{t("imageList.rankRules.other")}</li>
          </ol>
        </Col>
      </Row>
      <PhotoswipeWrapper
        showAsRanking
        isLoading={isLoading}
        gallery={Gallery.RANK}
        showInformation={user.isAdmin}
        showDeleteBtn={user.isAdmin}/>
    </Container>
  );
}

export default ImageListRank;