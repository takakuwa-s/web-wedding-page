import React, { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/esm/Form";
import Row from "react-bootstrap/esm/Row";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import FormCheckRadio from "../../common/components/form-check-radio/FormCheckRadio";
import { GuestType, User } from "../../common/dto/user";
import { initValidation } from "../../common/dto/validation";
import './AttendanceForm.scss';

function AttendanceForm(props: IProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [user, setUser] = useState(props.user);
  const [familyNameValidation, setFamilyNameValidation] = useState(initValidation());
  const [firstNameValidation, setFirstNameValidation] = useState(initValidation());
  const [familyNameKanaValidation, setFamilyNameKanaValidation] = useState(initValidation());
  const [firstNameKanaValidation, setFirstNameKanaValidation] = useState(initValidation());
  const [phoneNumberValidation, setPhoneNumberValidation] = useState(initValidation());
  const [postalCodeValidation, setPostalCodeValidation] = useState(initValidation());
  const [addressValidation, setAddressValidation] = useState(initValidation());

  const fetchAddress = (postalCode: string) => {
    fetch("https://zipcloud.ibsnet.co.jp/api/search?zipcode=" + postalCode)
      .then(res => res.json())
      .then((res) => {
        const address = res.results[0].address1 + res.results[0].address2 + res.results[0].address3;
        setUser({ ...user, address: address });
        setAddressValidation(validateStr(address));
      }, (error) => console.log(error))
  };

  const validateStr = (val: string) => {
    const isValid = val.length > 0;
    return {isValid: isValid, isInvalid: !isValid};
  }

  const validateKana = (val: string) => {
    const isValid = val.length > 0 && /^[ぁ-んー　]*$/.test(val);
    return {isValid: isValid, isInvalid: !isValid};
  }

  const validatePhoneNumber = (val: string) => {
    const isValid = /^[0-9]+$/.test(val);
    const validation = {isValid: isValid, isInvalid: !isValid};
    setPhoneNumberValidation(validation);
    return validation;
  }

  const validatePostalCode = (val: string, doSearchAddress = true) => {
    const isValid = /^\d{7}$/.test(val);
    if (isValid && doSearchAddress) {
      fetchAddress(val);
    }
    const validation = {isValid: isValid, isInvalid: !isValid};
    setPostalCodeValidation(validation);
    return validation;
  }

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const familyNameValidation = validateStr(user.familyName);
    const firstNameValidation = validateStr(user.firstName);
    const familyNameKanaValidation = validateKana(user.familyNameKana);
    const firstNameKanaValidation = validateKana(user.firstNameKana);
    const phoneNumberValidation = validatePhoneNumber(user.phoneNumber);
    const postalCodeValidation = validatePostalCode(user.postalCode, false);
    const addressValidation = validateStr(user.address);

    if (familyNameValidation.isValid
      && firstNameValidation.isValid
      && familyNameKanaValidation.isValid
      && firstNameKanaValidation.isValid
      && phoneNumberValidation.isValid
      && postalCodeValidation.isValid
      && addressValidation.isValid) {
        props.onConfirm(user);
    } else {
      setFamilyNameValidation(familyNameValidation);
      setFirstNameValidation(firstNameValidation);
      setFamilyNameKanaValidation(familyNameKanaValidation);
      setFirstNameKanaValidation(firstNameKanaValidation);
      setAddressValidation(addressValidation);
    }
  }

  const attendanceChecks = [
    {
      label: t("attendance.attendance.attend"),
      checked: user.attendance,
      onChange: () => setUser({ ...user, attendance: true }),
    },
    {
      label: t("attendance.attendance.decline"),
      checked: !user.attendance,
      onChange: () => setUser({ ...user, attendance: false }),
    },
  ];

  const guestTypeChecks = [
    {
      label: t("attendance.guestType.groom"),
      checked: GuestType.GROOM === user.guestType,
      onChange: () => setUser({ ...user, guestType: GuestType.GROOM }),
    },
    {
      label: t("attendance.guestType.bride"),
      checked: GuestType.BRIDE === user.guestType,
      onChange: () => setUser({ ...user, guestType: GuestType.BRIDE }),
    },
  ];

  return (
    <Container fluid className="form-back-ground">
      <Row>
        <Col>
          <h2 className="pt-5 text-center">{t("attendance.title")}</h2>
        </Col>
      </Row>
      <Form className="pt-2 pb-5">
        <Form.Group as={Row} className="my-3" controlId="formAttendance">
          <Form.Label column sm={3} xl={{ span: 2, offset: 1 }} className="form-label-white d-inline-flex justify-content-sm-center">
            {t("attendance.attendance.label")}<span className="required">*</span>
          </Form.Label>
          {
            user.registered
              ? (
                <Col xs={12} sm={8} className="d-inline-flex justify-content-start align-items-center">
                  <span className="span-alert-label">{t("attendance.attendance.alert")}</span>
                </Col>
              ) : (
                <Col sm={8} className="py-2">
                  <FormCheckRadio 
                    name="attendance"
                    labelClassName="radio-label"
                    checks={attendanceChecks}
                  />
                </Col>
              )
          }
        </Form.Group>
        <Form.Group as={Row} className="my-3" controlId="formGuestType">
          <Form.Label column sm={3} xl={{ span: 2, offset: 1 }} className="form-label-white d-inline-flex justify-content-sm-center">
            {t("attendance.guestType.label")}<span className="required">*</span>
          </Form.Label>
          <Col sm={8} className="py-2">
            <FormCheckRadio 
              name="guestType"
              labelClassName="radio-label"
              checks={guestTypeChecks}
            />
          </Col>
        </Form.Group>
        <Row className="my-3">
          <Col sm={3} xl={{ span: 2, offset: 1 }} className="form-label-white d-inline-flex justify-content-sm-center align-items-center">
            {t("attendance.name.label")}<span className="required">*</span>
          </Col>
          <Col sm={8}>
            <Row>
              <Form.Group as={Col} xs={12} sm={6} controlId="formFamilyName">
                <Form.Control
                  type="text"
                  value={user.familyName}
                  onChange={(e) => setUser({ ...user, familyName: e.target.value })}
                  onBlur={(e) => setFamilyNameValidation(validateStr(e.target.value))}
                  placeholder={t("attendance.name.familyName.placeholder")}
                  isInvalid={familyNameValidation.isInvalid}
                  isValid={familyNameValidation.isValid}
                  required />
                <Form.Control.Feedback type="invalid">{t("attendance.name.familyName.feedback")}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} xs={12} sm={6} controlId="formFirstName">
                <Form.Control
                  type="text"
                  value={user.firstName}
                  onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                  onBlur={(e) => setFirstNameValidation(validateStr(e.target.value))}
                  placeholder={t("attendance.name.firstName.placeholder")}
                  isInvalid={firstNameValidation.isInvalid}
                  isValid={firstNameValidation.isValid}
                  required />
                <Form.Control.Feedback type="invalid">{t("attendance.name.firstName.feedback")}</Form.Control.Feedback>
              </Form.Group>
            </Row>
          </Col>
        </Row>
        <Form.Group as={Row} className="my-3" controlId="formNameKana">
          <Col sm={3} xl={{ span: 2, offset: 1 }} className="form-label-white d-inline-flex justify-content-sm-center align-items-center">
            {t("attendance.nameKana.label")}<span className="required">*</span>
          </Col>
          <Col sm={8}>
            <Row>
              <Form.Group as={Col} xs={12} sm={6} controlId="formFamilyNameKana">
                <Form.Control
                  type="text"
                  value={user.familyNameKana}
                  onChange={(e) => setUser({ ...user, familyNameKana: e.target.value })}
                  onBlur={(e) => setFamilyNameKanaValidation(validateKana(e.target.value))}
                  placeholder={t("attendance.nameKana.familyName.placeholder")}
                  isInvalid={familyNameKanaValidation.isInvalid}
                  isValid={familyNameKanaValidation.isValid}
                  required />
                <Form.Control.Feedback type="invalid">{t("attendance.nameKana.familyName.feedback")}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} xs={12} sm={6} controlId="formFirstNameKana">
                <Form.Control
                  type="text"
                  value={user.firstNameKana}
                  onChange={(e) => setUser({ ...user, firstNameKana: e.target.value })}
                  onBlur={(e) => setFirstNameKanaValidation(validateKana(e.target.value))}
                  placeholder={t("attendance.nameKana.firstName.placeholder")}
                  isInvalid={firstNameKanaValidation.isInvalid}
                  isValid={firstNameKanaValidation.isValid}
                  required />
                <Form.Control.Feedback type="invalid">{t("attendance.nameKana.firstName.feedback")}</Form.Control.Feedback>
              </Form.Group>
            </Row>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="my-3" controlId="formPhoneNumber">
          <Form.Label column sm={3} xl={{ span: 2, offset: 1 }} className="form-label-white d-inline-flex justify-content-sm-center">
            {t("attendance.phone.label")}<span className="required">*</span>
          </Form.Label>
          <Col sm={8}>
            <Form.Control
              type="tel"
              value={user.phoneNumber}
              onChange={(e) => setUser({ ...user, phoneNumber: e.target.value })}
              onBlur={(e) => validatePhoneNumber(e.target.value)}
              placeholder={t("attendance.phone.placeholder")}
              isInvalid={phoneNumberValidation.isInvalid}
              isValid={phoneNumberValidation.isValid}
              required />
            <Form.Control.Feedback type="invalid">{t("attendance.phone.feedback")}</Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="my-3" controlId="formPostalCode">
          <Form.Label column sm={3} xl={{ span: 2, offset: 1 }} className="form-label-white d-inline-flex justify-content-sm-center">
            {t("attendance.postalCode.label")}<span className="required">*</span>
          </Form.Label>
          <Col sm={8}>
            <Form.Control
              type="tel"
              value={user.postalCode}
              onChange={(e) => setUser({ ...user, postalCode: e.target.value })}
              onBlur={(e) => validatePostalCode(e.target.value)}
              placeholder={t("attendance.postalCode.placeholder")}
              isInvalid={postalCodeValidation.isInvalid}
              isValid={postalCodeValidation.isValid}
              required />
            <Form.Control.Feedback type="invalid">{t("attendance.postalCode.feedback")}</Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="my-3" controlId="formAddress">
          <Form.Label column sm={3} xl={{ span: 2, offset: 1 }} className="form-label-white d-inline-flex justify-content-sm-center">
            {t("attendance.address.label")}<span className="required">*</span>
          </Form.Label>
          <Col sm={8}>
            <Form.Control
              type="text"
              value={user.address}
              onChange={(e) => setUser({ ...user, address: e.target.value })}
              onBlur={(e) => setAddressValidation(validateStr(e.target.value))}
              placeholder={t("attendance.address.placeholder")}
              isInvalid={addressValidation.isInvalid}
              isValid={addressValidation.isValid}
              required />
            <Form.Control.Feedback type="invalid">{t("attendance.address.feedback")}</Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="my-3" controlId="formAllergy">
          <Form.Label column sm={3} xl={{ span: 2, offset: 1 }} className="form-label-white d-inline-flex justify-content-sm-center">
            {t("attendance.allergy.label")}
          </Form.Label>
          <Col sm={8}>
            <Form.Control
              type="text"
              value={user.allergy}
              onChange={(e) => setUser({ ...user, allergy: e.target.value })}
              placeholder={t("attendance.allergy.placeholder")} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="my-3" controlId="formMessage">
          <Form.Label column sm={3} xl={{ span: 2, offset: 1 }} className="form-label-white d-inline-flex justify-content-sm-center">
            {t("attendance.message.label")}
          </Form.Label>
          <Col sm={8}>
            <Form.Control
              type="text"
              as="textarea"
              rows={4}
              value={user.message}
              onChange={(e) => setUser({ ...user, message: e.target.value })}
              placeholder={t("attendance.message.placeholder")} />
          </Col>
        </Form.Group>
        <Row className="pt-5">
          <Col sm={4} xl={3} xxl={2} className="d-grid gap-2 mx-auto">
            <Button
              type="button"
              size="lg"
              variant="primary"
              onClick={handleSubmit}
            >{t("attendance.submit")}
            </Button>
          </Col>
        </Row>
        <Row className="pt-3 pb-5">
          <Col sm={4} xl={3} xxl={2} className="d-grid gap-2 mx-auto">
            <Button
              type="button"
              size="lg"
              variant="primary"
              onClick={() => navigate("/")}
            >{t("attendance.back")}
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

interface IProps {
  user: User;
  onConfirm: (user: User) => void;
}

export default AttendanceForm;