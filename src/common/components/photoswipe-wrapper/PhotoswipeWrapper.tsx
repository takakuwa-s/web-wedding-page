import 'photoswipe/style.css';
import './PhotoswipeWrapper.scss';
import PhotoSwipeLightbox, { PhotoSwipeOptions } from "photoswipe/lightbox";
import { useEffect } from "react";
import Image from 'react-bootstrap/Image'
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import { useTranslation } from 'react-i18next';
import Loading from '../loading/Loading';
import Table from 'react-bootstrap/esm/Table';
import rank1 from "./../../../resource/imagelist-ranking-1.png"
import rank2 from "./../../../resource/imagelist-ranking-2.png"
import rank3 from "./../../../resource/imagelist-ranking-3.png"
import liff from '@line/liff/dist/lib';
import { Gallery } from '../../dto/gallery';
import ProcessingImage from '../processing-image/ProcessingImage';
import { setId, setShow, switchShow } from '../information-panel/informationPanelSlice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { updateAlertMsg, updateFiles, updateFilesAndAlertMsg } from '../../../features/image-list/fileSlice';
import { deleteFile } from '../../utils/fileApiCall';
import { RootState } from '../../../app/store';

function PhotoswipeWrapper(props: IProps) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const galleryId = `${props.gallery}-GALLERY`
  const images = useAppSelector((state: RootState) => state.files.files);

  useEffect(() => {
    const removeImage = (id: string, pswp: any) => {
      const list = images;
      const deletedList = images.filter(i => i.id !== id);
      dispatch(updateFiles(deletedList));
      pswp.close();
      deleteFile(
        id,
        () => dispatch(updateAlertMsg("")),
        e => {
          console.error(e);
          dispatch(updateFilesAndAlertMsg({files: list, alertMsg: t("imageList.alert.deleteErr")}));
        },
        () => {});
    };

    const options: PhotoSwipeOptions = {
      gallery: `#${galleryId}`,
      children: 'a',
      showHideAnimationType: 'zoom',
      tapAction: () => {
        if (props.showInformation) {
          dispatch(setShow(false));
        }
      },
      pswpModule: () => import('photoswipe'),
    };
    let lightbox: any = new PhotoSwipeLightbox(options);
    lightbox.on('uiRegister', () => {
      if (liff.getOS() !== 'ios') {
        lightbox.pswp.ui.registerElement({
          name: 'download-button',
          order: 9,
          isButton: true,
          tagName: 'a',
          html: '<svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true" class="pswp__icn"><path d="M20.5 14.3 17.1 18V10h-2.2v7.9l-3.4-3.6L10 16l6 6.1 6-6.1ZM23 23H9v2h14Z" /></svg>',
          onInit: (el: any, pswp: any) => {
            el.setAttribute('download', '');
            el.setAttribute('target', '_blank');
            el.setAttribute('rel', 'noopener');
            pswp.on('change', () => el.href = pswp.currSlide.data.src);
          }
        });
      }
      if (props.showDeleteBtn) {
        lightbox.pswp.ui.registerElement({
          name: 'delete-button',
          order: 19,
          isButton: true,
          html: `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 172 172" style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#ffffff"><path d="M71.66667,14.33333l-7.16667,7.16667h-43v14.33333h7.95052l12.77962,109.33366v0.05599c0.939,7.07108 7.07882,12.44368 14.20736,12.44368h59.111c7.12853,0 13.26835,-5.37269 14.20736,-12.44368l0.014,-0.05599l12.77962,-109.33366h7.95052v-14.33333h-43l-7.16667,-7.16667zM43.89583,35.83333h84.20833l-12.55566,107.5h-59.111z"></path></g></g></svg>`,
          onClick: (event: any, el: any, pswp: any) => {
            removeImage(pswp.currSlide.data.alt, pswp);
          }
          });
      }
      if (props.showInformation) {
        lightbox.pswp.ui.registerElement({
          name: 'information-panel',
          order: 18,
          isButton: true,
          html: `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
          width="24" height="24"
          viewBox="0 0 50 50"
          style=" fill:white;"><path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 25 11 A 3 3 0 0 0 22 14 A 3 3 0 0 0 25 17 A 3 3 0 0 0 28 14 A 3 3 0 0 0 25 11 z M 21 21 L 21 23 L 22 23 L 23 23 L 23 36 L 22 36 L 21 36 L 21 38 L 22 38 L 23 38 L 27 38 L 28 38 L 29 38 L 29 36 L 28 36 L 27 36 L 27 21 L 26 21 L 22 21 L 21 21 z"></path></svg>`,
          onClick: (event: any, el: any, pswp: any) => {
            dispatch(switchShow());
            dispatch(setId(pswp.currSlide.data.alt));
          }
          });
      }
    });
    if (props.showInformation) {
      lightbox.on('closingAnimationStart', () => {
        dispatch(setShow(false));
      });
      lightbox.on('contentResize', ( e: any ) => {
        dispatch(setShow(false));
      });
    }
    lightbox.init();
    return () => {
      lightbox.destroy();
      lightbox = null;
    };
  }, [props, galleryId, dispatch, t, images]);

  if (props.isLoading) {
    return <Loading />;
  } else if (props.showAsRanking) {
    const rankImages = [rank1, rank2, rank3];
    return (
      <Row className="pswp-gallery ps-1 pt-2 pb-4" id={galleryId}>
        <Col>
          {images.map((image, idx) => (
            <Row key={galleryId + '-' + idx} className="pb-1">
              <Col xs={1} md={2} lg={3} xxl={4} className="p-1 text-end">
                {idx >= 0 && idx <= 2 ?
                  <img src={rankImages[idx]} alt={(idx+1).toString()} width={35}/> :
                  <span>{idx+1}</span>}
              </Col>
              <Col xs={5} md={4} lg={3} xxl={2}>
                <a
                  href={image.contentUrl}
                  data-pswp-width={image.width}
                  data-pswp-height={image.height}
                  data-cropped="true"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Image className="square" rounded src={image.thumbnailUrl} alt={image.id} />
                </a>
              </Col>
              <Col xs={6} md={4} lg={3} xxl={2}>
                <Table size="sm" className="information-table">
                  <tbody>
                    <tr>
                      <td>{t("imageList.label.faceScore")}</td>
                      <td>{image.faceScore}</td>
                    </tr>
                    <tr>
                      <td>{t("imageList.label.faceHappinessLevel")}</td>
                      <td>{image.faceHappinessLevel}</td>
                    </tr>
                    <tr>
                      <td>{t("imageList.label.facePhotoBeauty")}</td>
                      <td>{image.facePhotoBeauty}</td>
                    </tr>
                    <tr>
                      <td>{t("imageList.label.faceCount")}</td>
                      <td>{image.faceCount}</td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
          ))}
        </Col>
      </Row>
    );
  } else {
    return (
      <Row className="pswp-gallery ps-1 pt-2" id={galleryId}>
        {images.map((image, idx) => (
          <Col key={galleryId + '-' + idx} xs={4} sm={3} md={2} xl={1} className="ps-0 pe-1 pb-1">
            {image.uploaded ? (
              <a
                href={image.contentUrl}
                data-pswp-width={image.width}
                data-pswp-height={image.height}
                data-cropped="true"
                target="_blank"
                rel="noreferrer"
              >
                <Image className="square" rounded src={image.thumbnailUrl} alt={image.id} />
              </a>
            ) : (
              <ProcessingImage />
            )}
          </Col>
        ))}
      </Row>
    );
  }
}

interface IProps {
  gallery: Gallery;
  showAsRanking?: boolean;
  isLoading?: boolean;
  showDeleteBtn?: boolean;
  showInformation?: boolean;
}

export default PhotoswipeWrapper;