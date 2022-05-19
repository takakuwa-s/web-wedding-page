import { useEffect, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { useTranslation } from "react-i18next";
import { fetchImageList, deleteImage } from "../../../utils/file-api-call";
import BottomNavbar from "../../components/bottom-navbar/BottomNavbar";
import PhotoswipeWrapper from "../../components/photoswipe-wrapper/PhotoswipeWrapper";
import { File } from "../../../dto/file";

function ImageList() {
  const FILE_LIMIT = 12;
  const AllGalleryID = "all-gallery";
  const MyGalleryID = "my-gallery";
  const { t } = useTranslation();
  const [galleryID, setGalleryID] = useState(AllGalleryID);
  const [isLoading, setIsLoading] = useState(true);
  const [isReloading, setIsReloading] = useState(false);
  const [isAll, setIsAll] = useState(false);
  const [images, setImages] = useState<File[]>([]);

  useEffect(() => {
    fetchImageList(
      FILE_LIMIT,
      "",
      false,
      files => {
        if (files.length < FILE_LIMIT) {
          setIsAll(true);
        }
        setImages(files)
      },
      () => setIsLoading(false)
    );
  }, []);
  const reloadImage = () => {
    setIsReloading(true);
    fetchImageList(
      FILE_LIMIT,
      images[images.length - 1].id,
      galleryID === MyGalleryID,
      files => {
        if (files.length < FILE_LIMIT) {
          setIsAll(true);
        }
        const list = images.concat(files);
        setImages(list);
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
      },
      () => setIsLoading(false));
  };

  const switchGallery = (eventKey: any, event: any) => {
    setGalleryID(eventKey);
    setIsLoading(true);
    setIsAll(false);
    fetchImageList(
      FILE_LIMIT,
      "",
      eventKey === MyGalleryID,
      files => {
        if (files.length < FILE_LIMIT) {
          setIsAll(true);
        }
        setImages(files)
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
  ];
  return (
    <Container fluid>
    <Row>
      <Col>
        <h2 className="pt-5 text-center">{t('imageList.title')}</h2>
      </Col>
    </Row>
    <Row className="pb-5">
      <Col>
        <PhotoswipeWrapper
          isLoading={isLoading}
          isReloading={isReloading}
          isAll={isAll}
          galleryID={galleryID}
          images={images}
          showDeleteBtn={galleryID === MyGalleryID}
          onClickDeleteBtn={removeImage}
          onClickReloadBtn={reloadImage}/>
      </Col>
    </Row>
    <BottomNavbar navs={navs} onSelectNav={switchGallery} />
  </Container>
  );
}

export default ImageList;