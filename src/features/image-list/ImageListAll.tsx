import './ImageList.scss';
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { useTranslation } from "react-i18next";
import PhotoswipeWrapper from "../../common/components/photoswipe-wrapper/PhotoswipeWrapper";
import { File } from "../../common/dto/file";
import ReloadButton from '../../common/components/reload-button/ReloadButton';
import liff from '@line/liff/dist/lib';
import Container from 'react-bootstrap/esm/Container';
import ErrorAlert from '../../common/components/error-alert/ErrorAlert';
import { fetchFileList } from '../../common/utils/fileApiCall';
import { useEffect, useState } from 'react';
import { Gallery } from '../../common/dto/gallery';

function ImageListAll(props: IProps) {
  const { t } = useTranslation();
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
    if (props.defalutImages && props.defalutImages.length > 0) {
      setImages(props.defalutImages);
    } else {
      setIsLoading(true);
      fetchFileList(
        FILE_LIMIT,
        "",
        false,
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
    }
  }, [t, props.defalutImages]);

  const reloadImage = () => {
    setIsReloading(true);
    fetchFileList(
      FILE_LIMIT,
      images[images.length - 1].id,
      false,
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
          reload: "",
        });
        setAlertMsg({
          top: "",
          reload: t("imageList.alert.reloadErr"),
        });
      },
      () => setIsReloading(false)
    );
  };

  return (
    <Container fluid className="pb-5">
      <Row>
        <Col>
          <h2 className="pt-5 text-center">{t('imageList.title.all')}</h2>
        </Col>
      </Row>
      <ErrorAlert msg={alertMsg.top} variant="danger" />
      {liff.getOS() === "ios" && !alertMsg.top && (
        <Row className="pt-3 pb-1">
          <Col xs={{span: 10, offset: 1}} lg={{span: 8, offset: 2}} xxl={{span: 6, offset: 3}} className="photo-explain-container px-1">
            <p className="my-1">{t("imageList.iosSave")}</p>
          </Col>
        </Row>
      )}
      <PhotoswipeWrapper
        isLoading={isLoading}
        gallery={Gallery.ALL}
        images={images}/>
      <ReloadButton
        alertMsg={alertMsg.reload}
        isReloading={isReloading}
        disableReload={isAll}
        disableReloadBtnTxt={t("imageList.button.allLoaded")}
        reloadBtnTxt={t("imageList.button.reload")}
        onReloadButtonClicked={reloadImage} />
    </Container>
  );
}

interface IProps {
  defalutImages?: File[];
}

export default ImageListAll;