import { useTranslation } from "react-i18next";
import './Home.scss';

function Profile() {
  const { t } = useTranslation();

  return (
    <section className="home-profile">
      <h2>Profile</h2>
      <div className="home-profile__inner">
        <div className="home-profile__item--groom">
          <div className="home-profile__head"><img src="https://firebasestorage.googleapis.com/v0/b/wedding-dev-9342b.appspot.com/o/app-img%2Fhome_im01.png?alt=media&token=c626d0bb-65a8-406b-a8d8-d9deaf3d2c0c" alt=""/></div>
          <div className="home-profile__body">
            <dl className="home-profile__name">
              <dt>新郎</dt>
              <dd>嶋　佑祥</dd>
            </dl>
            <dl className="home-profile__detail">
              <dt>誕生日</dt>
              <dd>1995年4月19日</dd>
            </dl>
            <dl className="home-profile__detail">
              <dt>血液型</dt>
              <dd>O型</dd>
            </dl>
            <dl className="home-profile__detail">
              <dt>出身地</dt>
              <dd>東京都練馬区</dd>
            </dl>
            <dl className="home-profile__detail">
              <dt>趣味</dt>
              <dd>ゲーム</dd>
            </dl>
          </div>
        </div>
        <div className="home-profile__item--bride">
          <div className="home-profile__head"><img src="https://firebasestorage.googleapis.com/v0/b/wedding-dev-9342b.appspot.com/o/app-img%2Fhome_im02.png?alt=media&token=faa77aaa-0a6a-40b1-b90c-1dc994dee695" alt=""/></div>
          <div className="home-profile__body">
            <dl className="home-profile__name">
              <dt>新婦</dt>
              <dd>久原　彩華</dd>
            </dl>
            <dl className="home-profile__detail">
              <dt>誕生日</dt>
              <dd>1998年8月31日</dd>
            </dl>
            <dl className="home-profile__detail">
              <dt>血液型</dt>
              <dd>AB型</dd>
            </dl>
            <dl className="home-profile__detail">
              <dt>出身地</dt>
              <dd>山口県萩市</dd>
            </dl>
            <dl className="home-profile__detail">
              <dt>趣味</dt>
              <dd>KAT-TUN</dd>
            </dl>
          </div>
        </div>
      </div>
      <table className="home-profile__table">
        <colgroup>
          <col span={2} className="home-profile__table__col" />
        </colgroup>
        <tbody>
          <tr>
            <th colSpan={2}>相手の第一印象は？</th>
          </tr>
          <tr>
            <td>かわいい</td>
            <td>かっこいい</td>
          </tr>
          <tr>
            <th colSpan={2}>相手の好きなところは？</th>
          </tr>
          <tr>
            <td>かわいい</td>
            <td>かっこいい</td>
          </tr>
          <tr>
            <th colSpan={2}>楽しかったデートは？</th>
          </tr>
          <tr>
            <td>かわいい</td>
            <td>かっこいい</td>
          </tr>
          <tr>
            <th colSpan={2}>どんな家庭にしたい？</th>
          </tr>
          <tr>
            <td>かわいい</td>
            <td>かっこいい</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}

export default Profile;