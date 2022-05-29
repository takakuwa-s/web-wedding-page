import { useEffect, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { useTranslation } from "react-i18next";
import { fetchFileList, deleteFile, deleteFileList } from "../../common/utils/fileApiCall";
import BottomNavbar from "../../common/components/bottom-navbar/BottomNavbar";
import { File } from "../../common/dto/file";
import ErrorAlert from '../../common/components/error-alert/ErrorAlert';
import { RootState } from '../../app/store';
import { useAppSelector } from '../../app/hooks';
import { useSearchParams } from 'react-router-dom';
import ImageListAll from './ImageListAll';
import ImageListRank from './ImageListRank';
import ImageListMy from './ImageListMy';

enum Gallery {
  ALL_GALLERY_ID = "ALL_GALLERY_ID",
  MY_GALLERY_ID = "MY_GALLERY_ID",
  RANK_GALLERY_ID = "RANK_GALLERY_ID",
}

function ImageList() {
  const FILE_LIMIT = 50;
  const RANK_FILE_LIMIT = 10;
  const allFiles = useAppSelector((state: RootState) => state.files.val);
  const [searchParams] = useSearchParams();
  const needReload = searchParams.get("reload");
  const { t } = useTranslation();
  const [galleryID, setGalleryID] = useState<Gallery>(Gallery.ALL_GALLERY_ID);
  const [isLoading, setIsLoading] = useState(false);
  const [isReloading, setIsReloading] = useState(false);
  const [isAll, setIsAll] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [images, setImages] = useState<File[]>(allFiles);

  useEffect(() => {
    if (needReload) {
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
          setAlertMsg("");
        },
        e => {
          console.error(e);
          setAlertMsg(t("imageList.alert.loadErr"));
        },
        () => setIsLoading(false)
      );
    }
  }, [t, needReload]);

  const reloadImage = () => {
    setIsReloading(true);
    fetchFileList(
      FILE_LIMIT,
      images[images.length - 1].id,
      galleryID === Gallery.MY_GALLERY_ID,
      galleryID === Gallery.RANK_GALLERY_ID,
      f => {
        if (f.length < FILE_LIMIT) {
          setIsAll(true);
        }
        const list = images.concat(f);
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
    const list = images;
    const deletedList = images.filter(i => i.id !== id);
    setImages(deletedList);
    pswp.close();
    deleteFile(
      id,
      () => {
        setAlertMsg("");
      },
      e => {
        console.error(e);
        setImages(list);
        setAlertMsg(t("imageList.alert.deleteErr"));
      },
      () => {});
  };

  const removeMultipleImages = (ids: string[]) => {
    const list = images;
    const deletedList = images.filter(f => !ids.includes(f.id));
    setImages(deletedList);
    deleteFileList(
      ids,
      () => {
        setAlertMsg("");
      },
      e => {
        console.error(e);
        setImages(list);
        setAlertMsg(t("imageList.alert.deleteErr"));
      },
      () => {});
  };

  const switchGallery = (eventKey: any, event: any) => {
    setIsLoading(true);
    setIsAll(false);
    setAlertMsg("");
    setGalleryID(eventKey);
    fetchFileList(
      eventKey === Gallery.RANK_GALLERY_ID ? RANK_FILE_LIMIT : FILE_LIMIT,
      "",
      false,
      eventKey === Gallery.RANK_GALLERY_ID,
      f => {
        if (f.length < FILE_LIMIT) {
          setIsAll(true);
        }
        setImages(f);
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
      id: Gallery.ALL_GALLERY_ID,
      title: t("imageList.tab.all"),
    },
    {
      id: Gallery.MY_GALLERY_ID,
      title: t("imageList.tab.mine"),
    },
    {
      id: Gallery.RANK_GALLERY_ID,
      title: t("imageList.tab.rank"),
    },
  ];

  const imageEl = {
    ALL_GALLERY_ID: <ImageListAll
                      images={images}
                      isAll={isAll}
                      isLoading={isLoading}
                      isReloading={isReloading}
                      galleryID={galleryID}
                      reloadImage={reloadImage}
                    />,
    MY_GALLERY_ID: <ImageListMy
                    images={images}
                    isAll={isAll}
                    isLoading={isLoading}
                    isReloading={isReloading}
                    galleryID={galleryID}
                    reloadImage={reloadImage}
                    removeImage={removeImage}
                    removeMultipleImages={removeMultipleImages}
                  />,
    RANK_GALLERY_ID: <ImageListRank
                      images={images}
                      isLoading={isLoading}
                      galleryID={galleryID}
                    />
  };

  return (
    <>
      <Container fluid className="pb-5">
        <Row>
          <Col>
            <h2 className="pt-5 text-center">{t('imageList.title')}</h2>
          </Col>
        </Row>
        <ErrorAlert msg={alertMsg} variant="danger" />
        {imageEl[galleryID]}
      </Container>
      <BottomNavbar navs={navs} onSelectNav={switchGallery}/>
    </>
  );
}

export default ImageList;