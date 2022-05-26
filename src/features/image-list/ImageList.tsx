import './ImageList.scss';
import { useEffect, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { useTranslation } from "react-i18next";
import { fetchImageList, deleteImage } from "../../common/utils/fileApiCall";
import BottomNavbar from "../../common/components/bottom-navbar/BottomNavbar";
import PhotoswipeWrapper from "../../common/components/photoswipe-wrapper/PhotoswipeWrapper";
import { File } from "../../common/dto/file";
import ErrorAlert from '../../common/components/error-alert/ErrorAlert';
import ReloadButton from '../../common/components/reload-button/ReloadButton';
import { RootState } from '../../app/store';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { updateFilesForAll, updateFilesForMy, updateFilesForRank, updateReload } from './fileSlice';

function ImageList() {
  const dispatch = useAppDispatch();
  const FILE_LIMIT = 50;
  const RANK_FILE_LIMIT = 10;
  const AllGalleryID = "all-gallery";
  const MyGalleryID = "my-gallery";
  const RankGalleryID = "rank-gallery";
  const allFiles = useAppSelector((state: RootState) => state.files.all);
  const myFiles = useAppSelector((state: RootState) => state.files.my);
  const rankFiles = useAppSelector((state: RootState) => state.files.rank);
  const needReload = useAppSelector((state: RootState) => state.files.reload);
  const { t } = useTranslation();
  const [galleryID, setGalleryID] = useState(AllGalleryID);
  const [isLoading, setIsLoading] = useState(false);
  const [isReloading, setIsReloading] = useState(false);
  const [isAll, setIsAll] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [images, setImages] = useState<File[]>(allFiles);

  useEffect(() => {
    if (allFiles.length === 0) {
      setIsLoading(true);
    }
    if (needReload) {
      fetchImageList(
        FILE_LIMIT,
        "",
        false,
        false,
        files => {
          if (files.length < FILE_LIMIT) {
            setIsAll(true);
          }
          setImages(files);
          setAlertMsg("");
          dispatch(updateFilesForAll(files));
        },
        e => {
          console.error(e);
          setAlertMsg(t("imageList.alert.loadErr"));
        },
        () => setIsLoading(false)
      );
    }
  }, [t, needReload, dispatch, allFiles.length]);

  const reloadImage = () => {
    setIsReloading(true);
    fetchImageList(
      FILE_LIMIT,
      images[images.length - 1].id,
      galleryID === MyGalleryID,
      galleryID === RankGalleryID,
      files => {
        if (files.length < FILE_LIMIT) {
          setIsAll(true);
        }
        const list = images.concat(files);
        setImages(list);
        setAlertMsg("");
      },
      e => {
        console.error(e);
        setAlertMsg(t("imageList.alert.reloadErr"));
      },
      () => setIsReloading(false)
    );
  };
  const removeImage = (id: string, pswp: any) => {
    const list = images.filter(i => i.id !== id);
    setImages(list);
    pswp.close();
    deleteImage(
      id,
      () => {
        setAlertMsg("");
        dispatch(updateReload(true));
        dispatch(updateFilesForMy(list));
      },
      e => {
        console.error(e);
        setImages(myFiles);
        setAlertMsg(t("imageList.alert.deleteErr"));
      },
      () => {});
  };

  const switchGallery = (eventKey: any, event: any) => {
    let files: File[];
    switch (eventKey) {
      case AllGalleryID:
        files = allFiles;
        break;
      case MyGalleryID:
        files = myFiles;
        break;
      case RankGalleryID:
        files = rankFiles;
        break;
      default:
        files = [];
    }
    if (files.length > 0) {
      setImages(files);
    } else {
      setIsLoading(true);
    }
    setGalleryID(eventKey);
    setIsAll(false);
    setAlertMsg("");
    fetchImageList(
      eventKey === RankGalleryID ? RANK_FILE_LIMIT : FILE_LIMIT,
      "",
      eventKey === MyGalleryID,
      eventKey === RankGalleryID,
      files => {
        if (files.length < FILE_LIMIT) {
          setIsAll(true);
        }
        setImages(files);
        switch (eventKey) {
          case AllGalleryID:
            dispatch(updateFilesForAll(files));
            break;
          case MyGalleryID:
            dispatch(updateFilesForMy(files));
            break;
          case RankGalleryID:
            dispatch(updateFilesForRank(files));
            break;
        }
      },
      e => {
        console.error(e);
        if (files.length === 0) {
          setAlertMsg(t("imageList.alert.loadErr"));
        } else {
          setAlertMsg(t("imageList.alert.reloadErr"));
        }
      },
      () => setIsLoading(false)
    );
  };

  const navs = [
    {
      id: AllGalleryID,
      title: t("imageList.tab.all"),
    },
    {
      id: MyGalleryID,
      title: t("imageList.tab.mine"),
    },
    {
      id: RankGalleryID,
      title: t("imageList.tab.rank"),
    },
  ];

  return (
    <>
      <Container fluid className="pb-5">
        <Row>
          <Col>
            <h2 className="pt-5 text-center">{t('imageList.title')}</h2>
          </Col>
        </Row>
        <ErrorAlert msg={alertMsg} variant="danger" />
        {galleryID === RankGalleryID && (
          <Row className="py-3">
            <Col xs={{span: 10, offset: 1}} lg={{span: 8, offset: 2}} xxl={{span: 6, offset: 3}} className="photo-ranking-rule-container px-1">
              <ol className="my-1">
                <li>{t("imageList.rank.rules.faceScore")}</li>
                <li>{t("imageList.rank.rules.faceHappinessLevel")}</li>
                <li>{t("imageList.rank.rules.facePhotoBeauty")}</li>
                <li>{t("imageList.rank.rules.bonus")}</li>
                <li>{t("imageList.rank.rules.other")}</li>
              </ol>
            </Col>
          </Row>
        )}
        <Row>
          <Col>
            <PhotoswipeWrapper
              showAsRanking={galleryID === RankGalleryID}
              isLoading={isLoading}
              galleryID={galleryID}
              images={images}
              showDeleteBtn={galleryID === MyGalleryID}
              onClickDeleteBtn={removeImage}/>
          </Col>
        </Row>
        {(galleryID === MyGalleryID || galleryID === AllGalleryID) &&
          <ReloadButton 
            isReloading={isReloading}
            disableReload={isAll}
            disableReloadBtnTxt={t("imageList.button.allLoaded")}
            reloadBtnTxt={t("imageList.button.reload")}
            onReloadButtonClicked={reloadImage} />}
      </Container>
      <BottomNavbar navs={navs} onSelectNav={switchGallery}/>
    </>
  );
}

export default ImageList;