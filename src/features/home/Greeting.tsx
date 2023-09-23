//import { useTranslation } from "react-i18next";
import './Home.scss';

function Greeting() {
  //const { t } = useTranslation();

  return (
    <section className="home-box">
      <div className="home-box__inner">
        <div className="home-box__head">
          <h2><img src="https://firebasestorage.googleapis.com/v0/b/wedding-dev-9342b.appspot.com/o/app-img%2Fhome_title02.png?alt=media&token=bca09557-37b3-4929-89c1-413ec8a5f19c" alt="Message"/></h2>
        </div>
        <div className="home-box__body">
          <p className="home-box__text">謹啓　清秋の候　皆様にはますますご清祥のこととお慶び申し上げます</p>
          <p className="home-box__text">このたび　私たちは結婚式を挙げることになりました<br/>つきましては　日ごろお世話になっている皆様にお集まりいただき<br/>ささやかな披露宴を催したいと存じます</p>
          <p className="home-box__text">ご多用中　誠に恐縮ではございますがご来臨の栄を賜りたく<br/>謹んでご案内申し上げます</p>
          <p className="home-box__text--right">謹白</p>
          <p className="home-box__text--right">2023年10月吉日</p>
          <p className="home-box__name">佑祥・彩華</p>
        </div>
      </div>
    </section>
  );
}

export default Greeting;