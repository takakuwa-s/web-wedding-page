import './ImageList.scss';
import { useEffect, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { useTranslation } from "react-i18next";
import { fetchImageList, deleteImage } from "../../../utils/file-api-call";
import BottomNavbar from "../../components/bottom-navbar/BottomNavbar";
import PhotoswipeWrapper from "../../components/photoswipe-wrapper/PhotoswipeWrapper";
import { File } from "../../../dto/file";
import Loading from "../../components/loading/Loading";
import Button from "react-bootstrap/esm/Button";
import Alert from "react-bootstrap/esm/Alert";

function ImageList() {
  const FILE_LIMIT = 50;
  const RANK_FILE_LIMIT = 10;
  const AllGalleryID = "all-gallery";
  const MyGalleryID = "my-gallery";
  const RankGalleryID = "rank-gallery";
  const { t } = useTranslation();
  const [galleryID, setGalleryID] = useState(AllGalleryID);
  const [isLoading, setIsLoading] = useState(true);
  const [isReloading, setIsReloading] = useState(false);
  const [isAll, setIsAll] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [images, setImages] = useState<File[]>([]);

  useEffect(() => {
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
      },
      e => {
        console.error(e);
        setAlertMsg(t("imageList.alert.loadErr"));
      },
      () => setIsLoading(false)
    );
  }, [t]);
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
    pswp.close();
    setIsLoading(true);
    deleteImage(
      id,
      () => {
        const list = images.filter(i => i.id !== id);
        setImages(list);
        setAlertMsg("");
      },
      e => {
        console.error(e);
        setAlertMsg(t("imageList.alert.deleteErr"));
      },
      () => setIsLoading(false));
  };

  const switchGallery = (eventKey: any, event: any) => {
    setGalleryID(eventKey);
    setIsLoading(true);
    setIsAll(false);
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
        setAlertMsg("");
      },
      e => {
        console.error(e);
        setAlertMsg(t("imageList.alert.loadErr"));
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

  let reloadEl: JSX.Element | null = null;
  if (isAll) {
    reloadEl = (
      <Row className="py-4">
        <Col className="d-grid gap-2 mx-auto">
          <Button
            type="button"
            size="sm"
            variant="outline-dark"
            disabled
          >{t("common.button.allLoaded")}
          </Button>
        </Col>
      </Row>
    );
  } else if (isReloading) {
    reloadEl = <Loading />;
  } else {
    reloadEl = (
      <Row className="py-4">
        <Col className="d-grid gap-2 mx-auto">
          <Button
            type="button"
            size="sm"
            variant="outline-info"
            onClick={reloadImage}
          >{t("common.button.reload")}
          </Button>
        </Col>
      </Row>
    );
  }
  return (
    <>
      <Container fluid className="pb-5">
        <Row>
          <Col>
            <h2 className="pt-5 text-center">{t('imageList.title')}</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <Alert show={!!alertMsg} variant="danger" className="pb-0">
              <p>{alertMsg}</p>
            </Alert>
          </Col>
        </Row>
        {galleryID === RankGalleryID && (
          <Row className="py-3">
            <Col xs={{span: 10, offset: 1}} className="photo-ranking-rule-container px-1">
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
        {(galleryID === MyGalleryID || galleryID === AllGalleryID) && reloadEl}
      </Container>
      <BottomNavbar navs={navs} onSelectNav={switchGallery}/>
    </>
  );
}

export default ImageList;