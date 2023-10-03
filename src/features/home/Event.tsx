//import { useTranslation } from "react-i18next";
import './Home.scss';

function Event() {
  //const { t } = useTranslation();
  return (
    <section className="home-event">
      <div className="home-event__inner">
        <div className="home-event__head">
          <h2>Events</h2>
        </div>
        <section>
          <div className="home-event__heading">
            <h3>Wedding ceremony</h3>
            <p className="home-event__subtitle">挙式</p>
          </div>
          <p className="home-event__date">2023.12.10<br/>11:30</p>
          <p>来館時間　11:15</p>
        </section>
        <section>
          <div className="home-event__heading">
            <h3>Wedding reception</h3>
            <p className="home-event__subtitle">披露宴</p>
          </div>
          <p className="home-event__date">2023.12.10<br/>12:15</p>
          <p>受付時間　11:50</p>
        </section>
        <dl className="home-event__place">
          <dt>場所:</dt>
          <dd>TRUNK(HOTEL)<br/>3F SORANIWA<br/>東京都渋谷区神宮前5-31</dd>
        </dl>
        <dl className="home-event__tel">
          <dt>電話番号:</dt>
          <dd><a href="tel:0357663200">03-5766-3200</a></dd>
        </dl>
      </div>
    </section>
  );
}

export default Event;