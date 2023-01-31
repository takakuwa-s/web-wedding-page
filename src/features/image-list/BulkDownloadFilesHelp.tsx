import './ImageList.scss';
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { useTranslation } from "react-i18next";
import Container from 'react-bootstrap/esm/Container';
import Button from 'react-bootstrap/esm/Button';
import { useNavigate } from 'react-router-dom';

function BulkDownloadFilesHelp() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Container fluid>
      <Row>
        <Col>
          <h2 className="pt-3 my-0 text-center">{t('imageList.title.all')}</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button
            type="button"
            variant="outline-info"
            size="sm"
            onClick={() => navigate("/image/list/all")}
          >{t("common.button.back")}
          </Button>
        </Col>
      </Row>
      <Row className='mt-2 mb-3'>
        <Col xs={{span: 10, offset: 1}} lg={{span: 8, offset: 2}} xxl={{span: 6, offset: 3}} className="photo-explain-container px-1">
          {t('imageList.bulkDownloadHelpDescription')}
        </Col>
      </Row>
      <Row>
        <Col className='text-center'>
          <video
            controls
            muted
            width="80%"
            poster="https://firebasestorage.googleapis.com/v0/b/wedding-dev-1df62.appspot.com/o/resource%2Fbulk%20download%20thumbnail.jpg?alt=media&token=884c6747-5da3-47ed-9172-04af9741cae4"
            src="https://firebasestorage.googleapis.com/v0/b/wedding-dev-1df62.appspot.com/o/resource%2Fbulk%20download%20screen%20movie.mp4?alt=media&token=49a902e7-4aaf-48e1-a6e8-5f8d38860f91"
          />
        </Col>
      </Row>
    </Container>
  );
}

export default BulkDownloadFilesHelp;