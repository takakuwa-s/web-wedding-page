//import { useTranslation } from "react-i18next";
import './Profile.scss';

function Profile2() {
  //const { t } = useTranslation();

  return (
    <section className="profile">
      <h2>Profile</h2>
      <div className="profile__inner">
        <div className="profile__item--groom">
          <div className="profile__head"><img src="https://firebasestorage.googleapis.com/v0/b/wedding-dev-9342b.appspot.com/o/app-img%2Fhome_im01.png?alt=media&token=c626d0bb-65a8-406b-a8d8-d9deaf3d2c0c" alt=""/></div>
          <div className="profile__body">
            <dl className="profile__name">
              <dt>新郎</dt>
              <dd>嶋　佑祥</dd>
            </dl>
            <dl className="profile__detail">
              <dt>誕生日</dt>
              <dd>1995年4月19日</dd>
            </dl>
            <dl className="profile__detail">
              <dt>血液型</dt>
              <dd>O型</dd>
            </dl>
            <dl className="profile__detail">
              <dt>出身地</dt>
              <dd>東京都練馬区</dd>
            </dl>
            <dl className="profile__detail">
              <dt>趣味</dt>
              <dd>ゲーム</dd>
            </dl>
          </div>
        </div>
        <div className="profile__item--bride">
          <div className="profile__head"><img src="https://firebasestorage.googleapis.com/v0/b/wedding-dev-9342b.appspot.com/o/app-img%2Fhome_im02.png?alt=media&token=faa77aaa-0a6a-40b1-b90c-1dc994dee695" alt=""/></div>
          <div className="profile__body">
            <dl className="profile__name">
              <dt>新婦</dt>
              <dd>久原　彩華</dd>
            </dl>
            <dl className="profile__detail">
              <dt>誕生日</dt>
              <dd>1998年8月31日</dd>
            </dl>
            <dl className="profile__detail">
              <dt>血液型</dt>
              <dd>AB型</dd>
            </dl>
            <dl className="profile__detail">
              <dt>出身地</dt>
              <dd>山口県萩市</dd>
            </dl>
            <dl className="profile__detail">
              <dt>趣味</dt>
              <dd>KAT-TUN</dd>
            </dl>
          </div>
        </div>
      </div>
      <section>
        <h3>Q & A</h3>
        <div className='faq'>
          <div className='faq__head'>
            <p className='faq__label'>Question 1</p>
            <p className='faq__title'>相手の好きなところは？</p>
          </div>
          <div className='faq__body'>
            <div className='faq__answer--groom'>
              <div className='faq__image'><img src="https://firebasestorage.googleapis.com/v0/b/wedding-dev-9342b.appspot.com/o/app-img%2Fhome_im01.png?alt=media&token=c626d0bb-65a8-406b-a8d8-d9deaf3d2c0c" alt=""/></div>
              <div className='faq__text'>笑い上戸なところ</div>
            </div>
            <div className='faq__answer--bride'>
              <div className='faq__image'><img src="https://firebasestorage.googleapis.com/v0/b/wedding-dev-9342b.appspot.com/o/app-img%2Fhome_im02.png?alt=media&token=faa77aaa-0a6a-40b1-b90c-1dc994dee695" alt=""/></div>
              <div className='faq__text'>愛情表現をよくしてくれるところ</div>
            </div>
          </div>
        </div>
        <div className='faq'>
          <div className='faq__head'>
            <p className='faq__label'>Question 2</p>
            <p className='faq__title'>相手のなおして欲しいところは？</p>
          </div>
          <div className='faq__body'>
            <div className='faq__answer--groom'>
              <div className='faq__image'><img src="https://firebasestorage.googleapis.com/v0/b/wedding-dev-9342b.appspot.com/o/app-img%2Fhome_im01.png?alt=media&token=c626d0bb-65a8-406b-a8d8-d9deaf3d2c0c" alt=""/></div>
              <div className='faq__text'>何故か自転車に乗るのを頑なにイヤがるところ</div>
            </div>
            <div className='faq__answer--bride'>
              <div className='faq__image'><img src="https://firebasestorage.googleapis.com/v0/b/wedding-dev-9342b.appspot.com/o/app-img%2Fhome_im02.png?alt=media&token=faa77aaa-0a6a-40b1-b90c-1dc994dee695" alt=""/></div>
              <div className='faq__text'>タバコは吸わなくてもいいと思う笑</div>
            </div>
          </div>
        </div>
        <div className='faq'>
          <div className='faq__head'>
            <p className='faq__label'>Question 3</p>
            <p className='faq__title'>一番楽しかったデート・旅行は？</p>
          </div>
          <div className='faq__body'>
            <div className='faq__answer--groom'>
              <div className='faq__image'><img src="https://firebasestorage.googleapis.com/v0/b/wedding-dev-9342b.appspot.com/o/app-img%2Fhome_im01.png?alt=media&token=c626d0bb-65a8-406b-a8d8-d9deaf3d2c0c" alt=""/></div>
              <div className='faq__text'>彼女の地元・山口に一緒に行ったこと</div>
            </div>
            <div className='faq__answer--bride'>
              <div className='faq__image'><img src="https://firebasestorage.googleapis.com/v0/b/wedding-dev-9342b.appspot.com/o/app-img%2Fhome_im02.png?alt=media&token=faa77aaa-0a6a-40b1-b90c-1dc994dee695" alt=""/></div>
              <div className='faq__text'>熱海旅行！花火綺麗だった！</div>
            </div>
          </div>
        </div>
        <div className='faq'>
          <div className='faq__head'>
            <p className='faq__label'>Question 4</p>
            <p className='faq__title'>相手の第一印象は？</p>
          </div>
          <div className='faq__body'>
            <div className='faq__answer--groom'>
              <div className='faq__image'><img src="https://firebasestorage.googleapis.com/v0/b/wedding-dev-9342b.appspot.com/o/app-img%2Fhome_im01.png?alt=media&token=c626d0bb-65a8-406b-a8d8-d9deaf3d2c0c" alt=""/></div>
              <div className='faq__text'>明るい元気な子</div>
            </div>
            <div className='faq__answer--bride'>
              <div className='faq__image'><img src="https://firebasestorage.googleapis.com/v0/b/wedding-dev-9342b.appspot.com/o/app-img%2Fhome_im02.png?alt=media&token=faa77aaa-0a6a-40b1-b90c-1dc994dee695" alt=""/></div>
              <div className='faq__text'>ちょっとかっこいい人、しっかりしてる</div>
            </div>
          </div>
        </div>
        <div className='faq'>
          <div className='faq__head'>
            <p className='faq__label'>Question 5</p>
            <p className='faq__title'>今の印象は？</p>
          </div>
          <div className='faq__body'>
            <div className='faq__answer--groom'>
              <div className='faq__image'><img src="https://firebasestorage.googleapis.com/v0/b/wedding-dev-9342b.appspot.com/o/app-img%2Fhome_im01.png?alt=media&token=c626d0bb-65a8-406b-a8d8-d9deaf3d2c0c" alt=""/></div>
              <div className='faq__text'>意外とシャイ</div>
            </div>
            <div className='faq__answer--bride'>
              <div className='faq__image'><img src="https://firebasestorage.googleapis.com/v0/b/wedding-dev-9342b.appspot.com/o/app-img%2Fhome_im02.png?alt=media&token=faa77aaa-0a6a-40b1-b90c-1dc994dee695" alt=""/></div>
              <div className='faq__text'>ぐでたま</div>
            </div>
          </div>
        </div>
        <div className='faq'>
          <div className='faq__head'>
            <p className='faq__label'>Question 6</p>
            <p className='faq__title'>好きな食べ物は？</p>
          </div>
          <div className='faq__body'>
            <div className='faq__answer--groom'>
              <div className='faq__image'><img src="https://firebasestorage.googleapis.com/v0/b/wedding-dev-9342b.appspot.com/o/app-img%2Fhome_im01.png?alt=media&token=c626d0bb-65a8-406b-a8d8-d9deaf3d2c0c" alt=""/></div>
              <div className='faq__text'>野菜系かお米に合うおかず（回鍋肉とか納豆とか）</div>
            </div>
            <div className='faq__answer--bride'>
              <div className='faq__image'><img src="https://firebasestorage.googleapis.com/v0/b/wedding-dev-9342b.appspot.com/o/app-img%2Fhome_im02.png?alt=media&token=faa77aaa-0a6a-40b1-b90c-1dc994dee695" alt=""/></div>
              <div className='faq__text'>焼肉と佑祥くん特製ハンバーグ！</div>
            </div>
          </div>
        </div>
        <div className='faq'>
          <div className='faq__head'>
            <p className='faq__label'>Question 7</p>
            <p className='faq__title'>好きなお酒は？</p>
          </div>
          <div className='faq__body'>
            <div className='faq__answer--groom'>
              <div className='faq__image'><img src="https://firebasestorage.googleapis.com/v0/b/wedding-dev-9342b.appspot.com/o/app-img%2Fhome_im01.png?alt=media&token=c626d0bb-65a8-406b-a8d8-d9deaf3d2c0c" alt=""/></div>
              <div className='faq__text'>ビール、ウイスキー</div>
            </div>
            <div className='faq__answer--bride'>
              <div className='faq__image'><img src="https://firebasestorage.googleapis.com/v0/b/wedding-dev-9342b.appspot.com/o/app-img%2Fhome_im02.png?alt=media&token=faa77aaa-0a6a-40b1-b90c-1dc994dee695" alt=""/></div>
              <div className='faq__text'>日本酒（新政 No.6 S-typeの4合瓶を独り占めするのが夢）</div>
            </div>
          </div>
        </div>
        <div className='faq'>
          <div className='faq__head'>
            <p className='faq__label'>Question 8</p>
            <p className='faq__title'>相手を動物に例えると？</p>
          </div>
          <div className='faq__body'>
            <div className='faq__answer--groom'>
              <div className='faq__image'><img src="https://firebasestorage.googleapis.com/v0/b/wedding-dev-9342b.appspot.com/o/app-img%2Fhome_im01.png?alt=media&token=c626d0bb-65a8-406b-a8d8-d9deaf3d2c0c" alt=""/></div>
              <div className='faq__text'>うさぎ</div>
            </div>
            <div className='faq__answer--bride'>
              <div className='faq__image'><img src="https://firebasestorage.googleapis.com/v0/b/wedding-dev-9342b.appspot.com/o/app-img%2Fhome_im02.png?alt=media&token=faa77aaa-0a6a-40b1-b90c-1dc994dee695" alt=""/></div>
              <div className='faq__text'>コアラ</div>
            </div>
          </div>
        </div>
        <div className='faq'>
          <div className='faq__head'>
            <p className='faq__label'>Question 9</p>
            <p className='faq__title'>無人島に3つまで好きなもの持っていけるとしたら何を持っていく？</p>
          </div>
          <div className='faq__body'>
            <div className='faq__answer--groom'>
              <div className='faq__image'><img src="https://firebasestorage.googleapis.com/v0/b/wedding-dev-9342b.appspot.com/o/app-img%2Fhome_im01.png?alt=media&token=c626d0bb-65a8-406b-a8d8-d9deaf3d2c0c" alt=""/></div>
              <div className='faq__text'>ナイフ、火打石、布団</div>
            </div>
            <div className='faq__answer--bride'>
              <div className='faq__image'><img src="https://firebasestorage.googleapis.com/v0/b/wedding-dev-9342b.appspot.com/o/app-img%2Fhome_im02.png?alt=media&token=faa77aaa-0a6a-40b1-b90c-1dc994dee695" alt=""/></div>
              <div className='faq__text'>TOKIOの三人</div>
            </div>
          </div>
        </div>
        <div className='faq'>
          <div className='faq__head'>
            <p className='faq__label'>Question 10</p>
            <p className='faq__title'>お互いに一言ずつどうぞ</p>
          </div>
          <div className='faq__body'>
            <div className='faq__answer--groom'>
              <div className='faq__image'><img src="https://firebasestorage.googleapis.com/v0/b/wedding-dev-9342b.appspot.com/o/app-img%2Fhome_im01.png?alt=media&token=c626d0bb-65a8-406b-a8d8-d9deaf3d2c0c" alt=""/></div>
              <div className='faq__text'>自転車は怖くない</div>
            </div>
            <div className='faq__answer--bride'>
              <div className='faq__image'><img src="https://firebasestorage.googleapis.com/v0/b/wedding-dev-9342b.appspot.com/o/app-img%2Fhome_im02.png?alt=media&token=faa77aaa-0a6a-40b1-b90c-1dc994dee695" alt=""/></div>
              <div className='faq__text'>クリスマスプレゼントは新政でいいよ❤️</div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}

export default Profile2;