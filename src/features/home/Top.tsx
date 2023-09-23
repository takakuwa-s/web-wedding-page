//import { useTranslation } from "react-i18next";
import './Home.scss';

function Top() {
  //const { t } = useTranslation();
  return (
    <div className="home-hero">
      <h1 className="home-hero__heading"><img src="https://firebasestorage.googleapis.com/v0/b/wedding-dev-9342b.appspot.com/o/app-img%2Fhome_title01.PNG?alt=media&token=0d91bde1-d157-4e2f-8920-fc57a638e7d7" alt="Wedding Invitation"/></h1>
      <div className="home-hero__body">
        <div className="home-hero__item">
          <div className="home-hero__image">
            <picture>
              <source srcSet="https://firebasestorage.googleapis.com/v0/b/wedding-dev-9342b.appspot.com/o/app-img%2Fhome_hero01_pc.PNG?alt=media&token=aa202356-9ef8-47b8-b54e-b2654c22cba5" media="(min-width: 768px)" type="image/png"/>
              <img src="https://firebasestorage.googleapis.com/v0/b/wedding-dev-9342b.appspot.com/o/app-img%2Fhome_hero01_sp.PNG?alt=media&token=b93a6e16-8e8c-4bd0-91d5-e70bcbf36d90" alt=""/>
            </picture>
          </div>
        </div>
        <p className="home-hero__name">Yusho <span className="home-hero__name__label">&</span> Ayaka</p>
        <div className="home-hero__day">
          <div className="home-hero__day__month">December</div>
          <div className="home-hero__day__date">10</div>
          <div className="home-hero__day__year">2023</div>
        </div>
      </div>
    </div>
  );
}

export default Top;