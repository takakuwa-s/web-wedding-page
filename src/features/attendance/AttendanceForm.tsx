import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import ErrorAlert from "../../common/components/error-alert/ErrorAlert";
import Loading from "../../common/components/loading/Loading";
import { GuestType, User } from "../../common/dto/user";
import { initValidation } from "../../common/dto/validation";
import './Attendance.scss';

function AttendanceForm(props: IProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const fetched = useAppSelector((state: RootState) => state.user.fetched);
  const [alertMsg, setAlertMsg] = useState("");
  const [user, setUser] = useState(props.user);
  const [companions, setCompanions] = useState(props.user.companions);
  const [nameValidation, setNameValidation] = useState(initValidation());
  const [nameKanaValidation, setNameKanaValidation] = useState(initValidation());
  const [postalCodeValidation, setPostalCodeValidation] = useState(initValidation());
  const [addressValidation, setAddressValidation] = useState(initValidation());

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
    return { isValid: isValid, isInvalid: !isValid };
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
    const nameValidation = validateStr(user.name);
    const nameKanaValidation = validateKana(user.nameKana);
    const postalCodeValidation = validatePostalCode(user.postalCode);
    const addressValidation = validateStr(user.address);

    if (nameValidation.isValid
       && nameKanaValidation.isValid
       && postalCodeValidation.isValid
       && addressValidation.isValid) {
    props.onConfirm(user);
     } else {
       setNameValidation(nameValidation);
       setNameKanaValidation(nameKanaValidation);
       setAddressValidation(addressValidation);
    //   setAlertMsg(t("attendance.inputAlert") as SetStateAction<string>);
    //   window.scrollTo(0,0);
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
        <form className="form-wrap" action="./confirm.html">
          <div className="form-wrap__inner">
            <div className="form-image"><img src="../app-files/img/form_head01.jpg" alt="" /></div>
            <div className="form-indicator">
              <div className="form-indicator__item is-current">入力</div>
              <div className="form-indicator__item">確認</div>
              <div className="form-indicator__item">完了</div>
            </div>
            <h1 className="form-heading">回答フォーム</h1>
            <p className="form-text">各項目への入力をお願いいたします</p>
            <div className="form-input-field">
              <section>
                <h2>お名前</h2>
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
              </section>
              <section>
                <h2>ふりがな</h2>
                <div className="form-input-textfield">
                  <input
                    type="text"
                    maxLength={100}
                    name="hurigana"
                    placeholder="やまだはなこ"
                    value={user.nameKana}
                    onChange={(e) => setUser({ ...user, nameKana: e.target.value })}
                    onBlur={(e) => setNameKanaValidation(validateStr(e.target.value))}  />
                </div>
              </section>
              <section>
                <h2>出欠</h2>
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
                <h2>新郎新婦との関係性</h2>
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
                <h2>郵便番号</h2>
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
              </section>
              <section>
                <h2>住所</h2>
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
              </section>
              <section>
                <h2>メールアドレス</h2>
                <div className="form-input-textfield">
                  <input
                    type="text"
                    maxLength={100}
                    name="mail"
                    placeholder="sample@sample.com"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })} />
                </div>
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
    //   <Container fluid className="form-back-ground">
    //     <Row>
    //       <Col>
    //         <h2 className="pt-5 text-center form-title">{t("attendance.title")}</h2>
    //       </Col>
    //     </Row>
    //     <ErrorAlert msg={alertMsg} variant="danger" />
    //     {!fetched ? (
    //       <Loading />
    //     ) : (
    //       <Form className="pt-2 pb-5">
    //         <Form.Group as={Row} className="my-3" controlId="formAttendance">
    //           <Form.Label column sm={3} xl={{ span: 2, offset: 1 }} className="form-label-white d-inline-flex justify-content-sm-center">
    //             {t("attendance.attendance.label")}<span className="required">*</span>
    //           </Form.Label>
    //           {
    //             user.registered
    //               ? (
    //                 <Col xs={12} sm={8} className="d-inline-flex justify-content-start align-items-center">
    //                   <span className="span-alert-label">{t("attendance.attendance.alert")}</span>
    //                 </Col>
    //               ) : (
    //                 <Col sm={8} className="py-2">
    //                   <FormCheckRadio 
    //                     name="attendance"
    //                     labelClassName="radio-label"
    //                     checks={attendanceRadioes}
    //                   />
    //                 </Col>
    //               )
    //           }
    //         </Form.Group>
    //         <Form.Group as={Row} className="my-3" controlId="formGuestType">
    //           <Form.Label column sm={3} xl={{ span: 2, offset: 1 }} className="form-label-white d-inline-flex justify-content-sm-center">
    //             {t("attendance.guestType.label")}<span className="required">*</span>
    //           </Form.Label>
    //           <Col sm={8} className="py-2">
    //             <FormCheckRadio 
    //               name="guestType"
    //               labelClassName="radio-label"
    //               checks={guestTypeRadioes}
    //             />
    //           </Col>
    //         </Form.Group>
    //         <Row className="my-3">
    //           <Col sm={3} xl={{ span: 2, offset: 1 }} className="form-label-white d-inline-flex justify-content-sm-center align-items-center">
    //             {t("attendance.name.label")}<span className="required">*</span>
    //           </Col>
    //           <Col sm={8}>
    //             <Row>
    //               <Form.Group as={Col} xs={12} sm={6} controlId="formFamilyName">
    //                 <Form.Control
    //                   type="text"
    //                   value={user.familyName}
    //                   onChange={(e) => setUser({ ...user, familyName: e.target.value })}
    //                   onBlur={(e) => setFamilyNameValidation(validateStr(e.target.value))}
    //                   placeholder={t("attendance.name.familyName.placeholder")}
    //                   isInvalid={familyNameValidation.isInvalid}
    //                   isValid={familyNameValidation.isValid}
    //                   required />
    //                 <Form.Control.Feedback type="invalid">{t("attendance.name.familyName.feedback")}</Form.Control.Feedback>
    //               </Form.Group>
    //               <Form.Group as={Col} xs={12} sm={6} controlId="formFirstName">
    //                 <Form.Control
    //                   type="text"
    //                   value={user.firstName}
    //                   onChange={(e) => setUser({ ...user, firstName: e.target.value })}
    //                   onBlur={(e) => setFirstNameValidation(validateStr(e.target.value))}
    //                   placeholder={t("attendance.name.firstName.placeholder")}
    //                   isInvalid={firstNameValidation.isInvalid}
    //                   isValid={firstNameValidation.isValid}
    //                   required />
    //                 <Form.Control.Feedback type="invalid">{t("attendance.name.firstName.feedback")}</Form.Control.Feedback>
    //               </Form.Group>
    //             </Row>
    //           </Col>
    //         </Row>
    //         <Form.Group as={Row} className="my-3" controlId="formNameKana">
    //           <Col sm={3} xl={{ span: 2, offset: 1 }} className="form-label-white d-inline-flex justify-content-sm-center align-items-center">
    //             {t("attendance.nameKana.label")}<span className="required">*</span>
    //           </Col>
    //           <Col sm={8}>
    //             <Row>
    //               <Form.Group as={Col} xs={12} sm={6} controlId="formFamilyNameKana">
    //                 <Form.Control
    //                   type="text"
    //                   value={user.familyNameKana}
    //                   onChange={(e) => setUser({ ...user, familyNameKana: e.target.value })}
    //                   onBlur={(e) => setFamilyNameKanaValidation(validateKana(e.target.value))}
    //                   placeholder={t("attendance.nameKana.familyName.placeholder")}
    //                   isInvalid={familyNameKanaValidation.isInvalid}
    //                   isValid={familyNameKanaValidation.isValid}
    //                   required />
    //                 <Form.Control.Feedback type="invalid">{t("attendance.nameKana.familyName.feedback")}</Form.Control.Feedback>
    //               </Form.Group>
    //               <Form.Group as={Col} xs={12} sm={6} controlId="formFirstNameKana">
    //                 <Form.Control
    //                   type="text"
    //                   value={user.firstNameKana}
    //                   onChange={(e) => setUser({ ...user, firstNameKana: e.target.value })}
    //                   onBlur={(e) => setFirstNameKanaValidation(validateKana(e.target.value))}
    //                   placeholder={t("attendance.nameKana.firstName.placeholder")}
    //                   isInvalid={firstNameKanaValidation.isInvalid}
    //                   isValid={firstNameKanaValidation.isValid}
    //                   required />
    //                 <Form.Control.Feedback type="invalid">{t("attendance.nameKana.firstName.feedback")}</Form.Control.Feedback>
    //               </Form.Group>
    //             </Row>
    //           </Col>
    //         </Form.Group>
    //         <Form.Group as={Row} className="my-3" controlId="formPhoneNumber">
    //           <Form.Label column sm={3} xl={{ span: 2, offset: 1 }} className="form-label-white d-inline-flex justify-content-sm-center">
    //             {t("attendance.phone.label")}<span className="required">*</span>
    //           </Form.Label>
    //           <Col sm={8}>
    //             <Form.Control
    //               type="tel"
    //               value={user.phoneNumber}
    //               onChange={(e) => setUser({ ...user, phoneNumber: e.target.value })}
    //               onBlur={(e) => validatePhoneNumber(e.target.value)}
    //               placeholder={t("attendance.phone.placeholder")}
    //               isInvalid={phoneNumberValidation.isInvalid}
    //               isValid={phoneNumberValidation.isValid}
    //               required />
    //             <Form.Control.Feedback type="invalid">{t("attendance.phone.feedback")}</Form.Control.Feedback>
    //           </Col>
    //         </Form.Group>
    //         <Form.Group as={Row} className="my-3" controlId="formPostalCode">
    //           <Form.Label column sm={3} xl={{ span: 2, offset: 1 }} className="form-label-white d-inline-flex justify-content-sm-center">
    //             {t("attendance.postalCode.label")}<span className="required">*</span>
    //           </Form.Label>
    //           <Col sm={8}>
    //             <Form.Control
    //               type="tel"
    //               value={user.postalCode}
    //               onChange={(e) => setUser({ ...user, postalCode: e.target.value })}
    //               onBlur={(e) => validatePostalCode(e.target.value)}
    //               placeholder={t("attendance.postalCode.placeholder")}
    //               isInvalid={postalCodeValidation.isInvalid}
    //               isValid={postalCodeValidation.isValid}
    //               required />
    //             <Form.Control.Feedback type="invalid">{t("attendance.postalCode.feedback")}</Form.Control.Feedback>
    //           </Col>
    //         </Form.Group>
    //         <Form.Group as={Row} className="my-3" controlId="formAddress">
    //           <Form.Label column sm={3} xl={{ span: 2, offset: 1 }} className="form-label-white d-inline-flex justify-content-sm-center">
    //             {t("attendance.address.label")}<span className="required">*</span>
    //           </Form.Label>
    //           <Col sm={8}>
    //             <Form.Control
    //               type="text"
    //               value={user.address}
    //               disabled={!user.postalCode || postalCodeValidation.isInvalid}
    //               onChange={(e) => setUser({ ...user, address: e.target.value })}
    //               onBlur={(e) => setAddressValidation(validateStr(e.target.value))}
    //               placeholder={t("attendance.address.placeholder")}
    //               isInvalid={addressValidation.isInvalid}
    //               isValid={addressValidation.isValid}
    //               required />
    //             <Form.Control.Feedback type="invalid">{t("attendance.address.feedback")}</Form.Control.Feedback>
    //           </Col>
    //         </Form.Group>
    //         <Form.Group as={Row} className="my-3" controlId="formTaxiUse">
    //           <Form.Label column sm={3} xl={{ span: 2, offset: 1 }} className="form-label-white d-inline-flex justify-content-sm-center">
    //             {t("attendance.taxiUse.label")}<span className="required">*</span>
    //           </Form.Label>
    //           <Col sm={8} className="py-2">
    //             <FormCheckRadio 
    //               name="taxiUse"
    //               labelClassName="radio-label"
    //               checks={taxiUseRadioes}
    //             />
    //           </Col>
    //         </Form.Group>
    //         <Form.Group as={Row} className="my-3" controlId="formAllergy">
    //           <Form.Label column sm={3} xl={{ span: 2, offset: 1 }} className="form-label-white d-inline-flex justify-content-sm-center">
    //             {t("attendance.allergy.label")}
    //           </Form.Label>
    //           <Col sm={8}>
    //             <Form.Control
    //               type="text"
    //               value={user.allergy}
    //               onChange={(e) => setUser({ ...user, allergy: e.target.value })}
    //               placeholder={t("attendance.allergy.placeholder")} />
    //           </Col>
    //         </Form.Group>
    //         <Form.Group as={Row} className="my-3" controlId="formMessage">
    //           <Form.Label column sm={3} xl={{ span: 2, offset: 1 }} className="form-label-white d-inline-flex justify-content-sm-center">
    //             {t("attendance.message.label")}
    //           </Form.Label>
    //           <Col sm={8}>
    //             <Form.Control
    //               type="text"
    //               as="textarea"
    //               rows={6}
    //               value={user.message}
    //               onChange={(e) => setUser({ ...user, message: e.target.value })}
    //               placeholder={t("attendance.message.placeholder")} />
    //           </Col>
    //         </Form.Group>
    //         <Row className="pt-5">
    //           <Col sm={4} xl={3} xxl={2} className="d-grid gap-2 mx-auto">
    //             <Button
    //               type="button"
    //               size="lg"
    //               variant="primary"
    //               onClick={handleSubmit}
    //             >{t("attendance.submit")}
    //             </Button>
    //           </Col>
    //         </Row>
    //         <Row className="pt-3 pb-5">
    //           <Col sm={4} xl={3} xxl={2} className="d-grid gap-2 mx-auto">
    //             <Button
    //               type="button"
    //               size="lg"
    //               variant="primary"
    //               onClick={() => navigate("/")}
    //             >{t("attendance.back")}
    //             </Button>
    //           </Col>
    //         </Row>
    //       </Form>
    //     )}
    //   </Container>
  );
}

interface IProps {
  user: User;
  onConfirm: (user: User) => void;
}

export default AttendanceForm;