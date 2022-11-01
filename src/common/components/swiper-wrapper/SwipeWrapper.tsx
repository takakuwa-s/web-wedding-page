import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper";
import './SwipeWrapper.scss';
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

function SwipeWrapper(props: IProps) {
  const width = window.innerWidth;
  let slidesPerView = 2.5;
  if (width < 576) {
    slidesPerView = 1.1;
  } else if (width < 768) {
    slidesPerView = 1.3;
  } else if (width < 992) {
    slidesPerView = 1.6;
  } else if (width < 1200) {
    slidesPerView = 1.9;
  } else if (width < 1400) {
    slidesPerView = 2.2;
  }

  console.log(slidesPerView);
  return (
    <Row className="py-3 mx-0">
      <Col>
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={slidesPerView}
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