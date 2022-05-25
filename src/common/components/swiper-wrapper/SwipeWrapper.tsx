import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper";
import './SwipeWrapper.scss';
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

function SwipeWrapper(props: IProps) {
  return (
    <Row className="py-3 swipe-wrapper-background">
      <Col>
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={1.6}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          loop={true}
          pagination={true}
          modules={[EffectCoverflow, Pagination]}
        >
        {props.images.map((image, index) => (
          <SwiperSlide key={index}>
            <img src={image.src} alt={image.alt} />
          </SwiperSlide>
        ))}
        </Swiper>
      </Col>
    </Row>
  );
}

interface IProps {
  images: {
    src: string;
    alt: string;
  }[]
}

export default SwipeWrapper;