import { useTranslation } from "react-i18next";
import './GreetingMessage.scss';
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import SwipeWrapper from "../../components/swiper-wrapper/SwipeWrapper";
import swiperPhoto1 from "./../../../resource/swiper-photo-1.jpg"
import swiperPhoto2 from "./../../../resource/swiper-photo-2.jpg"
import swiperPhoto3 from "./../../../resource/swiper-photo-3.jpg"
import swiperPhoto4 from "./../../../resource/swiper-photo-4.jpg"
import swiperPhoto5 from "./../../../resource/swiper-photo-5.jpg"
import swiperPhoto6 from "./../../../resource/swiper-photo-6.jpg"
import swiperPhoto7 from "./../../../resource/swiper-photo-7.jpg"
import swiperPhoto8 from "./../../../resource/swiper-photo-8.png"


function GreetingMessage() {
  const { t } = useTranslation();
  const images = [
    {
      src: swiperPhoto1,
      alt: "swiper photo 1"
    },
    {
      src: swiperPhoto2,
      alt: "swiper photo 2"
    },
    {
      src: swiperPhoto3,
      alt: "swiper photo 3"
    },
    {
      src: swiperPhoto4,
      alt: "swiper photo 4"
    },
    {
      src: swiperPhoto5,
      alt: "swiper photo 5"
    },
    {
      src: swiperPhoto6,
      alt: "swiper photo 6"
    },
    {
      src: swiperPhoto7,
      alt: "swiper photo 7"
    },
    {
      src: swiperPhoto8,
      alt: "swiper photo 8"
    },
  ]

  return (
    <div className="message-back-ground">
      <Container>
        <SwipeWrapper images={images}/>
        <Row className="pt-4">
          <Col xs={{span: 10, offset: 1}} lg={{span: 8, offset: 2}}>
            <pre className="message-content">{t("greetingMessage.content")}</pre>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default GreetingMessage;