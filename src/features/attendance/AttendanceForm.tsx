import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import Loading from "../../common/components/loading/Loading";
import { GuestType, User } from "../../common/dto/user";
import { initValidation } from "../../common/dto/validation";
import './Attendance.scss';

function AttendanceForm(props: IProps) {
  const { t } = useTranslation();
  const fetched = useAppSelector((state: RootState) => state.user.fetched);
  const [user, setUser] = useState(props.user);
  const [showErr, setShowErr] = useState(false);
  const [nameValidation, setNameValidation] = useState(initValidation());
  const [nameKanaValidation, setNameKanaValidation] = useState(initValidation());
  const [postalCodeValidation, setPostalCodeValidation] = useState(initValidation());
  const [addressValidation, setAddressValidation] = useState(initValidation());
  const [mailValidation, setMailValidation] = useState(initValidation());

  useEffect(() => {
    const option: any = {
      top: 0,
      left: 0,
      behavior: "instant"
    };
    window.scrollTo(option);
    setUser(props.user);
  }, [props.user]);

  /**
   * 郵便番号検索
   * @param event 
   */
  const fetchAddress = (event: React.MouseEvent<HTMLButtonElement>) => {
    fetch("https://zipcloud.ibsnet.co.jp/api/search?zipcode=" + user.postalCode)
      .then(res => res.json())
      .then((res) => {
        if (res.results) {
          const address = res.results[0].address1 + res.results[0].address2 + res.results[0].address3;
          setUser({ ...user, address: address });
          setAddressValidation(validateStr(address));
        }
      }, (error) => console.log(error))
  };

  const validateStr = (val: string) => {
    const isValid = val.length > 0;
    return { isValid: isValid, isInvalid: !isValid };
  }

  const validateKana = (val: string) => {
    const isValid = val.length > 0 && /^[ぁ-んー　]*$/.test(val);
    const validation = { isValid: isValid, isInvalid: !isValid };
    setNameKanaValidation(validation);
    return validation;
  }

  const validateMail = (val: string) => {
    const isValid = val.length > 0 && /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/.test(val);
    const validation = { isValid: isValid, isInvalid: !isValid };
    setMailValidation(validation);
    return validation;
  }

  const validatePostalCode = (val: string) => {
    const isValid = /^\d{7}$/.test(val);
    const validation = { isValid: isValid, isInvalid: !isValid };
    setPostalCodeValidation(validation);
    return validation;
  }

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log(user);
    const itemNameValidation = validateStr(user.name);
    setNameValidation(itemNameValidation);
    const itemNameKanaValidation = validateKana(user.nameKana);
    const itemPostalCodeValidation = validatePostalCode(user.postalCode);
    const itemAddressValidation = validateStr(user.address);
    setAddressValidation(itemAddressValidation);
    const itemMailValidation = validateMail(user.email);

    if (itemNameValidation.isValid
       && itemNameKanaValidation.isValid
       && itemPostalCodeValidation.isValid
       && itemAddressValidation.isValid
       && itemMailValidation.isValid) {
      props.onConfirm(user);
     } else {
      setShowErr(true);
      window.scrollTo(0,0);
    }
  }


  const attendanceRadioes = [
    {
      key: 0,
      id: "attendance_yes",
      label: "ご出席",
      checked: user.attendance,
      onChange: () => setUser({ ...user, attendance: true }),
    },
    {
      key: 1,
      id: "attendance_no",
      label: "ご欠席",
      checked: !user.attendance,
      onChange: () => setUser({ ...user, attendance: false }),
    }
  ];

  const guestTypeRadioes = [
    {
      key: 0,
      id: "relation_groom",
      label: "新郎側",
      value: GuestType.GROOM,
    },
    {
      key: 1,
      id: "relation_bride",
      label: "新婦側",
      value: GuestType.BRIDE,
    },
    {
      key: 2,
      id: "relation_common",
      label: "共通",
      value: GuestType.COMMON,
    },
  ];

  return (
    <>
      {!fetched ? (
        <Loading />
      ) : (
        <form className="form-wrap">
          <div className="form-wrap__inner">
            <div className="form-image"><img src="https://firebasestorage.googleapis.com/v0/b/wedding-dev-9342b.appspot.com/o/app-img%2Fform_head01.jpg?alt=media&token=73b1f0e3-e5d4-48fe-bfff-e5e8eb2f3a72" alt="" /></div>
            <div className="form-indicator">
              <div className="form-indicator__item is-current">入力</div>
              <div className="form-indicator__item">確認</div>
              <div className="form-indicator__item">完了</div>
            </div>
            <h1 className="form-heading">回答フォーム</h1>
            <p className="form-text">各項目への入力をお願いいたします</p>
            <div className="form-wrap__error" style={{visibility : showErr ? "visible" : "hidden"}}>エラー</div>
            <div className="form-input-field">
              <section>
                <h2>お名前 <i>必須</i></h2>
                <div className="form-input-textfield">
                  <input
                    type="text"
                    maxLength={100}
                    name="name"
                    placeholder="山田花子"
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                    onBlur={(e) => setNameValidation(validateStr(e.target.value))} />
                </div>
                <div style={{visibility : nameValidation.isInvalid ? "visible" : "hidden"}} className="error-item">{t("attendance.name.feedback")}</div>
              </section>
              <section>
                <h2>ふりがな<i>必須</i></h2>
                <div className="form-input-textfield">
                  <input
                    type="text"
                    maxLength={100}
                    name="hurigana"
                    placeholder="やまだはなこ"
                    value={user.nameKana}
                    onChange={(e) => setUser({ ...user, nameKana: e.target.value })}
                    onBlur={(e) => validateKana(e.target.value)}  />
                </div>
                <div style={{visibility : nameKanaValidation.isInvalid ? "visible" : "hidden"}} className="error-item">{t("attendance.nameKana.feedback")}</div>
              </section>
              <section>
                <h2>出欠<i>必須</i></h2>
                <div className="form-input-attendancefield">
                  {attendanceRadioes.map(radio => (
                    <div className="form-input-attendancefield__item" key={radio.key}>
                      <input
                        type="radio"
                        name="attendance"
                        id={radio.id}
                        checked={radio.checked}
                        onChange={radio.onChange} />
                      <label htmlFor={radio.id}>{radio.label}</label>
                    </div>
                  ))}
                </div>
              </section>
              <section>
                <h2>新郎新婦との関係性<i>必須</i></h2>
                <div className="form-input-radiofield">
                  {guestTypeRadioes.map(radio => (
                    <div className="form-input-radiofield__item" key={radio.key}>
                      <input
                        type="radio"
                        name="relation"
                        id={radio.id}
                        value={radio.value}
                        checked={radio.value === user.guestType}
                        onChange={() => setUser({ ...user, guestType: radio.value })} />
                      <label htmlFor={radio.id}>{radio.label}</label>
                    </div>
                  ))}
                </div>
              </section>
              <section>
                <h2>郵便番号<i>必須</i></h2>
                <div className="form-input-postfield">
                  <div className="form-input-postfield__text">
                    <input
                      type="text"
                      maxLength={100}
                      name="post-code"
                      placeholder="1234567"
                      className="js-adress-set__post-code"
                      value={user.postalCode}
                      onChange={(e) => setUser({ ...user, postalCode: e.target.value })}
                      onBlur={(e) => validatePostalCode(e.target.value)}  />
                  </div>
                  <div className="form-input-postfield__button">
                    <button type="button" className="js-adress-set" onClick={fetchAddress}>住所検索</button>
                  </div>
                </div>
                <div style={{visibility : postalCodeValidation.isInvalid ? "visible" : "hidden"}} className="error-item">{t("attendance.postalCode.feedback")}</div>
              </section>
              <section>
                <h2>住所<i>必須</i></h2>
                <div className="form-input-textfield">
                  <input
                    type="text"
                    className="js-adress-set__target"
                    maxLength={100}
                    name="address"
                    placeholder="東京都渋谷区0-1-23"
                    value={user.address}
                    onChange={(e) => setUser({ ...user, address: e.target.value })}
                    onBlur={(e) => setAddressValidation(validateStr(e.target.value))} />
                </div>
                <div style={{visibility : addressValidation.isInvalid ? "visible" : "hidden"}} className="error-item">{t("attendance.address.feedback")}</div>
              </section>
              <section>
                <h2>メールアドレス<i>必須</i></h2>
                <div className="form-input-textfield">
                  <input
                    type="text"
                    maxLength={100}
                    name="mail"
                    placeholder="sample@sample.com"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    onBlur={(e) => validateMail(e.target.value)}  />
                </div>
                <div style={{visibility : mailValidation.isInvalid ? "visible" : "hidden"}} className="error-item">{t("attendance.mail.feedback")}</div>
              </section>
              <section>
                <h2>アレルギーや苦手な食材</h2>
                <div className="form-input-textfield">
                  <input
                    type="text"
                    maxLength={100}
                    name="food"
                    placeholder="食材名、食材名"
                    value={user.allergy}
                    onChange={(e) => setUser({ ...user, allergy: e.target.value })} />
                </div>
              </section>
              <section>
                <h2>お連れ様追加</h2>
                <section className="form-add">
                  <h3>１人目</h3>
                  <div className="form-input-textfield">
                    <input
                      type="text"
                      maxLength={100}
                      name="add01-name"
                      placeholder="お連れ様氏名"
                      value={user.companions[0].name}
                      onChange={(e) => {
                        const companions = [{
                          name: e.target.value,
                          allergy: user.companions[0].allergy,
                        }, {
                          name: user.companions[1].name,
                          allergy: user.companions[1].allergy,
                        }];
                        setUser({ ...user, companions: companions })
                      }} />
                  </div>
                  <div className="form-input-textfield">
                    <input
                      type="text"
                      maxLength={100}
                      name="add01-food"
                      placeholder="お連れ様のアレルギーや苦手な食材"
                      value={user.companions[0].allergy}
                      onChange={(e) => {
                        const companions = [{
                          name: user.companions[0].name,
                          allergy: e.target.value,
                        }, {
                          name: user.companions[1].name,
                          allergy: user.companions[1].allergy,
                        }];
                        setUser({ ...user, companions: companions })
                      }} />
                  </div>
                </section>
                <section className="form-add">
                  <h3>２人目</h3>
                  <div className="form-input-textfield">
                    <input
                      type="text"
                      maxLength={100}
                      name="add02-name"
                      placeholder="お連れ様氏名"
                      value={user.companions[1].name}
                      onChange={(e) => {
                        const companions = [{
                          name: user.companions[0].name,
                          allergy: user.companions[0].allergy,
                        }, {
                          name: e.target.value,
                          allergy: user.companions[1].allergy,
                        }];
                        setUser({ ...user, companions: companions })
                      }} />
                  </div>
                  <div className="form-input-textfield">
                    <input
                      type="text"
                      maxLength={100}
                      name="add02-food"
                      placeholder="お連れ様のアレルギーや苦手な食材"
                      value={user.companions[1].allergy}
                      onChange={(e) => {
                        const companions = [{
                          name: user.companions[0].name,
                          allergy: user.companions[0].allergy,
                        }, {
                          name: user.companions[1].name,
                          allergy: e.target.value,
                        }];
                        setUser({ ...user, companions: companions })
                      }} />
                  </div>
                </section>
              </section>
              <section>
                <h2>メッセージ</h2>
                <div className="form-input-textfield">
                  <textarea
                    maxLength={100}
                    name="メッセージ"
                    value={user.message}
                    onChange={(e) => setUser({ ...user, message: e.target.value })}></textarea>
                </div>
              </section>
            </div>
            <div className="form-input-button">
              <button
                type="button"
                onClick={handleSubmit}
              >{t("attendance.submit")}
              </button>
            </div>
          </div>
        </form>
      )}
    </>
  );
}

interface IProps {
  user: User;
  onConfirm: (user: User) => void;
}

export default AttendanceForm;