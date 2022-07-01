import { useEffect, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { useTranslation } from "react-i18next";
import ErrorAlert from "../../common/components/error-alert/ErrorAlert";
import Loading from "../../common/components/loading/Loading";
import SubmitButton from "../../common/components/submit-button/SubmitButton";
import { SlideShow } from "../../common/dto/slideshow";
import { createSlideShow, fetchSlideShowList } from "../../common/utils/slideshowApiCall";


function AdminSlideShow() {
  const { t } = useTranslation();
  const [slideshow, setSlideshow] = useState<SlideShow | null>(null);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [alert, setAlert] = useState({
    msg: "",
    variant: "danger",
  });

  useEffect(() => {
    fetchSlideShowList(
      s => {
        if (s.length > 0) {
          setSlideshow(s[0]);
        }
      },
      e => {
        console.error(e);
        setAlert({msg: t('adminSlideShow.alert.loadErr'), variant: "danger"});
      },
      () => setIsVideoLoading(false)
    );
  }, [t]);

  const onClickCreate = () => {
    setIsSubmitLoading(true);
    createSlideShow(
      res => {
        console.log(res);
        setDisableSubmit(true);
        setAlert({msg: t('adminSlideShow.alert.createSuccess'), variant: "success"})
      },
      e => {
        console.error(e);
        setAlert({msg: t('adminSlideShow.alert.createErr'), variant: "danger"});
      },
      () => setIsSubmitLoading(false)
    )
  };

  return (
    <Container fluid className="pb-5">
      <Row>
        <Col>
          <h2 className="pt-5 text-center">{t('adminSlideShow.title')}</h2>
        </Col>
      </Row>
      <ErrorAlert {...alert}/>
      {isVideoLoading ? (
        <Loading />
      ) : (
        <Row className="pt-5">
          <Col md={{span: 10, offset: 1}} lg={{span: 8, offset: 2}} xxl={{span: 6, offset: 3}}>
            {slideshow ? (
              <video
                controls
                width="100%"
                src={slideshow.contentUrl}
                poster={slideshow.thumbnailUrl}
              />
            ) : (
              <p >{t('adminSlideShow.not_created')}</p>
            )}
          </Col>
        </Row>
      )}
      <Row className="py-5">
        <Col md={6} xl={4} className="d-grid gap-2 mx-auto">
          <SubmitButton
            buttonSize="lg"
            disabled={disableSubmit}
            isLoading={isSubmitLoading}
            buttonText={t("adminSlideShow.button.create")}
            onClick={onClickCreate}/>
        </Col>
      </Row>
    </Container>
  );
}

export default AdminSlideShow;
