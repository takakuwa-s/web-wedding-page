import { useTranslation } from "react-i18next";
import './Countdown.scss';
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { useEffect, useState } from "react";
import { formatDate, formatDatetime } from "../../../utils/dateUtils";

function Countdown() {
  const { t } = useTranslation();
  const targetDate = new Date(process.env.REACT_APP_WEDDING_DATE as string);
  const targetDateStr = formatDate(t("cowntdown.targetDate"), targetDate);
  const calculateCountdown = () => {
    const diffMiliSec = targetDate.getTime() - Date.now();
    const diffDay = Math.floor(diffMiliSec / (1000 * 60 * 60 * 24));
    const diffHour = Math.floor(diffMiliSec / (1000 * 60 * 60) % 24);
    const diffMin = Math.floor(diffMiliSec / (1000 * 60) % 60);
    const diffSec = Math.floor(diffMiliSec / 1000 % 60);
    return formatDatetime(t("cowntdown.daysLeft"), diffDay, diffHour, diffMin, diffSec);
  };

  const [cowntdown, setCountdown] = useState(calculateCountdown());
  useEffect(() => {
    const timerID = setInterval(
      () => setCountdown(calculateCountdown()),
      1000
    );
    return () => clearInterval(timerID);
  });

  return (
    <div className="cowntdown-back-ground">
      <Container>
        <Row>
            <Col>
              <h2 className="py-5 cowntdown-title">{t("cowntdown.title")}</h2>
            </Col>
          </Row>
        <Row>
          <Col className="cowntdown-text">
            <p>{targetDateStr}</p>
            <p>{cowntdown}</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Countdown;