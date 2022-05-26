import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { useTranslation } from "react-i18next";
import SendMessageButton from "../../common/components/send-message-button/SendMessageButton";

function AdminReminder() {
  const { t } = useTranslation();

  return (
    <Container fluid className="pb-5">
      <Row>
        <Col>
          <h2 className="pt-5 text-center">{t('adminReminder.title')}</h2>
        </Col>
      </Row>
      <SendMessageButton msgText={t('adminReminder.sendMessageContent')}/>
    </Container>
  );
}

export default AdminReminder;
