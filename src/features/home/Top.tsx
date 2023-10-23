//import { useTranslation } from "react-i18next";
import SwipeWrapper from "../../common/components/swiper-wrapper/SwipeWrapper";
import './Home.scss';

const images = [
  {
    src: "https://firebasestorage.googleapis.com/v0/b/wedding-dev-9342b.appspot.com/o/app-img%2Fhome-hero01.JPG?alt=media&token=1c4dd64e-ffc8-46fa-9948-e174f3b87664",
    alt: "swiper photo 1"
  },
  {
    src: "https://firebasestorage.googleapis.com/v0/b/wedding-dev-9342b.appspot.com/o/app-img%2Fhome-hero02.JPG?alt=media&token=a19a794c-bdba-4afb-8352-57c8dfd621c0",
    alt: "swiper photo 2"
  },
  {
    src: "https://firebasestorage.googleapis.com/v0/b/wedding-dev-9342b.appspot.com/o/app-img%2Fhome-hero03.JPG?alt=media&token=b84eb6c0-b716-4315-adfc-c79232434ca0",
    alt: "swiper photo 3"
  },
  {
    src: "https://firebasestorage.googleapis.com/v0/b/wedding-dev-9342b.appspot.com/o/app-img%2Fhome-hero04.JPG?alt=media&token=0c4aa253-394d-46af-a069-b8af8803684f",
    alt: "swiper photo 4"
  },
];

function Top() {
  //const { t } = useTranslation();
  return (
    <div className="home-hero">
      <div className="home-hero__body">
        <div className="home-hero__item">
          <SwipeWrapper images={images}/>
        </div>
        <p className="home-hero__name">Yusho <span className="home-hero__name__label">&</span> Ayaka</p>
        <div className="home-hero__day">
          <div className="home-hero__day__month">December</div>
          <div className="home-hero__day__date">10</div>
          <div className="home-hero__day__year">2023</div>
        </div>
      </div><h1 className="home-hero__heading"><img src="https://firebasestorage.googleapis.com/v0/b/wedding-dev-9342b.appspot.com/o/app-img%2Fhome_title01.PNG?alt=media&token=0d91bde1-d157-4e2f-8920-fc57a638e7d7" alt="Wedding Invitation"/></h1>
      
    </div>
  );
}

export default Top;