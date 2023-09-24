import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper";
import './SwipeWrapper.scss';
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

function SwipeWrapper(props: IProps) {
  const width = window.innerWidth;
  let slidesPerView = 1;
  return (
    <Row>
      <Col>
        <Swiper
          effect={"fade"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={slidesPerView}
          loop={true}
          pagination={false}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          speed={3000} 
          modules={[Autoplay, EffectFade, Pagination]}
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