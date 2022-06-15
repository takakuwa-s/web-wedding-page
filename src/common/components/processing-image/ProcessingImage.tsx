import { useTranslation } from 'react-i18next';
import Loading from '../loading/Loading';
import './ProcessingImage.scss';
import '../photoswipe-wrapper/PhotoswipeWrapper.scss';

function ProcessingImage() {
  console.log("ProcessingImage");
  const { t } = useTranslation();
  return (
    <div className="square rounded align-items-center d-flex justify-content-center flex-column not-uploaded-image">
      <Loading rowClass=''/>
      <span>{t('imageList.uploading')}</span>
    </div>
  )
}

export default ProcessingImage;