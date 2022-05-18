import { useEffect, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { useTranslation } from "react-i18next";
import { fetchImageList, deleteImage } from "../../../utils/api-call";
import PhotoswipeWrapper from "../../components/photoswipe-wrapper/PhotoswipeWrapper";

function ImageList() {
  const FILE_LIMIT = 100;
  const [isLoading, setIsLoading] = useState(true);
  const [isReloading, setIsReloading] = useState(false);
  const [isAll, setIsAll] = useState(false);
  const [images, setImages] = useState([]);
  useEffect(() => {
    getImageList(
      res => setImages(res.files),
      () => setIsLoading(false)
    );
  }, []);
  const getImageList = (onSuccess: (res: any) => void, onComplete: () => void, startId?: string) => {
    let code: number
    fetchImageList(FILE_LIMIT, startId)
      .then(res => {
        code = res.status;
        return res.json();
      })
      .then(res => {
        if (code === 200) {
          if (res.files.length < FILE_LIMIT) {
            setIsAll(true);
          }
          onSuccess(res);
        } else {
          throw new Error(res.error);
        }
      })
      .catch(e => console.error(e))
      .finally(onComplete);
  };
  const reloadImage = () => {
    setIsReloading(true);
    getImageList(
      res => {
        const list = images.concat(res.files);
        setImages(list);
      },
      () => setIsReloading(false),
      images[images.length - 1]["id"]
    );
  };
  const removeImage = (id: string, pswp: any) => {
    pswp.close();
    setIsLoading(true);
    let code: number;
    deleteImage(id)
      .then(res => {
        code = res.status;
        if (code !== 204) {
          return res.json();
        }
        return null;
      })
      .then(res => {
        if (code === 204) {
          const list = images.filter(i => i['id'] !== id);
          setImages(list);
        } else {
          throw new Error(res.error);
        }
      })
      .catch(e => console.error(e))
      .finally(() => setIsLoading(false));
  };

  const { t } = useTranslation();
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
          galleryID="my-gallery"
          images={images}
          showDeleteBtn={true}
          onClickDeleteBtn={removeImage}
          onClickReloadBtn={reloadImage}/>
      </Col>
    </Row>
  </Container>
  );
}

export default ImageList;