import 'photoswipe/style.css';
import './PhotoswipeWrapper.scss';
import PhotoSwipeLightbox, { PhotoSwipeOptions } from "photoswipe/lightbox";
import { useEffect } from "react";
import { File } from "../../../dto/file";
import Image from 'react-bootstrap/Image'
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Button from 'react-bootstrap/esm/Button';
import { useTranslation } from 'react-i18next';
import Loading from '../loading/Loading';

function PhotoswipeWrapper(props: IProps) {
  const { t } = useTranslation();
  useEffect(() => {
    const options: PhotoSwipeOptions = {
      gallery: '#' + props.galleryID,
      children: 'a',
      showHideAnimationType: 'zoom',
      pswpModule: () => import('photoswipe'),
    };
    let lightbox: any = new PhotoSwipeLightbox(options);
    lightbox.on('uiRegister', () => {
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
      if (props.showDeleteBtn) {
        lightbox.pswp.ui.registerElement({
          name: 'delete-button',
          order: 19,
          isButton: true,
          html: `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 172 172" style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#ffffff"><path d="M71.66667,14.33333l-7.16667,7.16667h-43v14.33333h7.95052l12.77962,109.33366v0.05599c0.939,7.07108 7.07882,12.44368 14.20736,12.44368h59.111c7.12853,0 13.26835,-5.37269 14.20736,-12.44368l0.014,-0.05599l12.77962,-109.33366h7.95052v-14.33333h-43l-7.16667,-7.16667zM43.89583,35.83333h84.20833l-12.55566,107.5h-59.111z"></path></g></g></svg>`,
          onClick: (event: any, el: any, pswp: any) => props.onClickDeleteBtn(pswp.currSlide.data.alt, pswp)
          });
      }
    });
    lightbox.init();
    return () => {
      lightbox.destroy();
      lightbox = null;
    };
  }, [props]);

  if (props.isLoading) {
    return <Loading />;
  }
  let reloadEl: JSX.Element | null = null;
  if (props.isAll) {
    reloadEl = (
      <Row className="pt-5">
        <Col className="d-grid gap-2 mx-auto">
          <Button
            type="button"
            size="sm"
            variant="outline-dark"
            onClick={props.onClickReloadBtn}
            disabled
          >{t("common.button.allLoaded")}
          </Button>
        </Col>
      </Row>
    );
  } else if (props.isReloading) {
    reloadEl = <Loading />;
  } else {
    reloadEl = (
      <Row className="pt-5">
        <Col className="d-grid gap-2 mx-auto">
          <Button
            type="button"
            size="sm"
            variant="outline-info"
            onClick={props.onClickReloadBtn}
          >{t("common.button.reload")}
          </Button>
        </Col>
      </Row>
    );
  }

  return (
    <div>
      <Row className="pswp-gallery ps-1 pt-2" id={props.galleryID}>
        {props.images.map((image, index) => (
          <Col key={props.galleryID + '-' + index} xs={4} sm={3} md={2} xl={1} className="ps-0 pe-1 pb-1">
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
        ))}
      </Row>
      {reloadEl}
    </div>
  );
}

interface IProps {
  isLoading: boolean;
  isReloading: boolean;
  isAll: boolean;
  images: File[];
  galleryID: string;
  showDeleteBtn: boolean;
  onClickDeleteBtn: (id: string, pswp: any) => void
  onClickReloadBtn: () => void;
}

export default PhotoswipeWrapper;