import React from "react";
import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/esm/Form";
import Row from "react-bootstrap/esm/Row";
import { WithTranslation, withTranslation } from "react-i18next";
import { User, GuestType } from "../../../dto/user";
import { initValidation, Validation } from "../../../dto/validation";
import './AttendanceForm.scss';

class AttendanceForm extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.state = {
      user: this.props.user,
      validation: {
        familyName: initValidation(),
        firstName: initValidation(),
        familyNameKana: initValidation(),
        firstNameKana: initValidation(),
        phoneNumber: initValidation(),
        postalCode: initValidation(),
        address: initValidation(),
      },
      allowSubmmit: false,
    };

    this.fetchAddress = this.fetchAddress.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  private fetchAddress(postalCode: string): void {
    fetch("https://zipcloud.ibsnet.co.jp/api/search?zipcode=" + postalCode)
      .then(res => res.json())
      .then((res) => {
        const user = this.state.user;
        user.address = res.results[0].address1 + res.results[0].address2 + res.results[0].address3;
        this.setState({ user: user });
      }, (error) => {
        console.log(error);
      })
  }

  private handleBlur(event: React.FocusEvent<HTMLInputElement>): void {
    const validation = this.state.validation;
    const val = event.target.value;;
    switch (event.target.id) {
      case "formFamilyName":
        validation.familyName.isValid = val.length > 0;
        validation.familyName.isInvalid = !validation.familyName.isValid;
        break;
      case "formFirstName":
        validation.firstName.isValid = val.length > 0;
        validation.firstName.isInvalid = !validation.firstName.isValid;
        break;
      case "formFamilyNameKana":
        validation.familyNameKana.isValid = val.length > 0 && /^[ぁ-んー　]*$/.test(val);
        validation.familyNameKana.isInvalid = !validation.familyNameKana.isValid;
        break;
      case "formFirstNameKana":
        validation.firstNameKana.isValid = val.length > 0 && /^[ぁ-んー　]*$/.test(val);
        validation.firstNameKana.isInvalid = !validation.firstNameKana.isValid;
        break;
      case "formPhoneNumber":
        validation.phoneNumber.isValid = /^[0-9]*$/.test(val);
        validation.phoneNumber.isInvalid = !validation.phoneNumber.isValid;
        break;
      case "formPostalCode":
        validation.postalCode.isValid = /^\d{7}$/.test(val);
        validation.postalCode.isInvalid = !validation.postalCode.isValid;
        if (validation.postalCode.isValid) {
          this.fetchAddress(val);
        }
        break;
      case "formAddress":
        validation.address.isValid = val.length > 0;
        validation.address.isInvalid = !validation.address.isValid;
        break;
    }
    const allowSubmmit = this.state.validation.familyName.isValid
                      && this.state.validation.firstName.isValid
                      && this.state.validation.familyNameKana.isValid
                      && this.state.validation.firstNameKana.isValid
                      && this.state.validation.phoneNumber.isValid
                      && this.state.validation.postalCode.isValid
                      && this.state.validation.address.isValid;
    this.setState({ validation: validation, allowSubmmit: allowSubmmit });
  }

  private handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const user = this.state.user;
    const val = event.target.value;;
    switch (event.target.id) {
      case "formAttendanceAttend":
      case "formAttendanceDecline":
        user.attendance = val === "true";
        break;
      case "formGuestTypeGroom":
      case "formGuestTypeBride":
        user.guestType = val as GuestType;
        break;
      case "formFamilyName":
        user.familyName = val;
        break;
      case "formFirstName":
        user.firstName = val;
        break;
      case "formFamilyNameKana":
        user.familyNameKana = val;
        break;
      case "formFirstNameKana":
        user.firstNameKana = val;
        break;
      case "formPhoneNumber":
        user.phoneNumber = val;
        break;
      case "formPostalCode":
        user.postalCode = val;
        break;
      case "formAddress":
        user.address = val;
        break;
      case "formAllergy":
        user.allergy = val;
        break;
      case "formMessage":
        user.message = val;
        break;
    }
    this.setState({ user: user });
  }

  private handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    console.log(this.state.user);
    event.preventDefault();
  }

  public render() {
    const { t } = this.props;
    return (
      <Container fluid className="form-back-ground">
        <Row>
          <Col>
            <h2 className="pt-5 text-center">{t("form.title")}</h2>
          </Col>
        </Row>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group as={Row} className="my-3" controlId="formAttendance">
            <Form.Label column sm={3} xl={{ span: 2, offset: 1 }} className="d-inline-flex justify-content-sm-center">
              {t("form.attendance.label")}<span className="required">*</span>
            </Form.Label>
            <Col sm={8} className="d-inline-flex justify-content-start align-items-center">
              <Form.Check
                type="radio"
                inline
                label={t("form.attendance.attend")}
                id="formAttendanceAttend"
                name="attendance"
                value="true"
                checked={true === this.state.user.attendance}
                onChange={this.handleChange} />
              <Form.Check
                type="radio"
                inline
                label={t("form.attendance.decline")}
                id="formAttendanceDecline"
                name="attendance"
                value="false"
                checked={false === this.state.user.attendance}
                onChange={this.handleChange} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="my-3" controlId="formGuestType">
            <Form.Label column sm={3} xl={{ span: 2, offset: 1 }} className="d-inline-flex justify-content-sm-center">
              {t("form.guestType.label")}<span className="required">*</span>
            </Form.Label>
            <Col sm={8} className="d-inline-flex justify-content-start align-items-center">
              <Form.Check
                type="radio"
                inline
                label={t("form.guestType.groomLabel")}
                id="formGuestTypeGroom"
                name="guestType"
                value={GuestType.GROOM}
                checked={GuestType.GROOM === this.state.user.guestType}
                onChange={this.handleChange} />
              <Form.Check
                type="radio"
                inline
                label={t("form.guestType.brideLabel")}
                id="formGuestTypeBride"
                name="guestType"
                value={GuestType.BRIDE}
                checked={GuestType.BRIDE === this.state.user.guestType}
                onChange={this.handleChange} />
            </Col>
          </Form.Group>
          <Row className="my-3">
            <Col sm={3} xl={{ span: 2, offset: 1 }} className="d-inline-flex justify-content-sm-center align-items-center">
              {t("form.name.label")}<span className="required">*</span>
            </Col>
            <Col sm={8}>
              <Row>
                <Form.Group as={Col} xs={12} sm={6} controlId="formFamilyName">
                  <Form.Control
                    type="text"
                    value={this.state.user.familyName}
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                    placeholder={t("form.name.familyName.placeholder")}
                    isInvalid={this.state.validation.familyName.isInvalid}
                    isValid={this.state.validation.familyName.isValid}
                    required />
                  <Form.Control.Feedback type="invalid">{t("form.name.familyName.feedback")}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} xs={12} sm={6} controlId="formFirstName">
                  <Form.Control
                    type="text"
                    value={this.state.user.firstName}
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                    placeholder={t("form.name.firstName.placeholder")}
                    isInvalid={this.state.validation.firstName.isInvalid}
                    isValid={this.state.validation.firstName.isValid}
                    required />
                  <Form.Control.Feedback type="invalid">{t("form.name.firstName.feedback")}</Form.Control.Feedback>
                </Form.Group>
              </Row>
            </Col>
          </Row>
          <Form.Group as={Row} className="my-3" controlId="formNameKana">
            <Col sm={3} xl={{ span: 2, offset: 1 }} className="d-inline-flex justify-content-sm-center align-items-center">
              {t("form.nameKana.label")}<span className="required">*</span>
            </Col>
            <Col sm={8}>
              <Row>
                <Form.Group as={Col} xs={12} sm={6} controlId="formFamilyNameKana">
                  <Form.Control
                    type="text"
                    value={this.state.user.familyNameKana}
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                    placeholder={t("form.nameKana.familyName.placeholder")}
                    isInvalid={this.state.validation.familyNameKana.isInvalid}
                    isValid={this.state.validation.familyNameKana.isValid}
                    required />
                  <Form.Control.Feedback type="invalid">{t("form.nameKana.familyName.feedback")}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} xs={12} sm={6} controlId="formFirstNameKana">
                  <Form.Control
                    type="text"
                    value={this.state.user.firstNameKana}
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                    placeholder={t("form.nameKana.firstName.placeholder")}
                    isInvalid={this.state.validation.firstNameKana.isInvalid}
                    isValid={this.state.validation.firstNameKana.isValid}
                    required />
                  <Form.Control.Feedback type="invalid">{t("form.nameKana.firstName.feedback")}</Form.Control.Feedback>
                </Form.Group>
              </Row>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="my-3" controlId="formPhoneNumber">
            <Form.Label column sm={3} xl={{ span: 2, offset: 1 }} className="d-inline-flex justify-content-sm-center">
              {t("form.phone.label")}<span className="required">*</span>
            </Form.Label>
            <Col sm={8}>
              <Form.Control
                type="tel"
                value={this.state.user.phoneNumber}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                placeholder={t("form.phone.placeholder")}
                isInvalid={this.state.validation.phoneNumber.isInvalid}
                isValid={this.state.validation.phoneNumber.isValid}
                required />
              <Form.Control.Feedback type="invalid">{t("form.phone.feedback")}</Form.Control.Feedback>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="my-3" controlId="formPostalCode">
            <Form.Label column sm={3} xl={{ span: 2, offset: 1 }} className="d-inline-flex justify-content-sm-center">
              {t("form.postalCode.label")}<span className="required">*</span>
            </Form.Label>
            <Col sm={8}>
              <Form.Control
                type="tel"
                value={this.state.user.postalCode}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                placeholder={t("form.postalCode.placeholder")}
                isInvalid={this.state.validation.postalCode.isInvalid}
                isValid={this.state.validation.postalCode.isValid}
                required />
              <Form.Control.Feedback type="invalid">{t("form.postalCode.feedback")}</Form.Control.Feedback>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="my-3" controlId="formAddress">
            <Form.Label column sm={3} xl={{ span: 2, offset: 1 }} className="d-inline-flex justify-content-sm-center">
              {t("form.address.label")}<span className="required">*</span>
            </Form.Label>
            <Col sm={8}>
              <Form.Control
                type="text"
                value={this.state.user.address}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                placeholder={t("form.address.placeholder")}
                isInvalid={this.state.validation.address.isInvalid}
                isValid={this.state.validation.address.isValid}
                required />
              <Form.Control.Feedback type="invalid">{t("form.address.feedback")}</Form.Control.Feedback>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="my-3" controlId="formAllergy">
            <Form.Label column sm={3} xl={{ span: 2, offset: 1 }} className="d-inline-flex justify-content-sm-center">
              {t("form.allergy.label")}
            </Form.Label>
            <Col sm={8}>
              <Form.Control
                type="text"
                value={this.state.user.allergy}
                onChange={this.handleChange}
                placeholder={t("form.allergy.placeholder")} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="my-3" controlId="formMessage">
            <Form.Label column sm={3} xl={{ span: 2, offset: 1 }} className="d-inline-flex justify-content-sm-center">
              {t("form.message.label")}
            </Form.Label>
            <Col sm={8}>
              <Form.Control
                type="text"
                as="textarea"
                rows={4}
                value={this.state.user.message}
                onChange={this.handleChange}
                placeholder={t("form.message.placeholder")} />
            </Col>
          </Form.Group>
          <Row className="py-5">
            <Col sm={4} xl={3} xxl={2} className="d-grid gap-2 mx-auto">
              <Button
                type="submit"
                size="lg"
                disabled={!this.state.allowSubmmit}>
                {t("form.submit")}
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    );
  }
}

interface IProps extends WithTranslation {
  user: User;
}

interface IState {
  user: User;
  validation: {
    familyName: Validation;
    firstName: Validation;
    familyNameKana: Validation;
    firstNameKana: Validation;
    phoneNumber: Validation;
    postalCode: Validation;
    address: Validation;
  };
  allowSubmmit: boolean;
}

export default withTranslation()(AttendanceForm);