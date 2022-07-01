import { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/esm/Form";
import Row from "react-bootstrap/esm/Row";
import { useTranslation } from "react-i18next";
import ErrorAlert from "../../common/components/error-alert/ErrorAlert";
import Loading from "../../common/components/loading/Loading";
import SubmitButton from "../../common/components/submit-button/SubmitButton";
import { SlideShow } from "../../common/dto/slideshow";
import { createSlideShow, deleteSlideShow, fetchSlideShowList, updateSlideShow } from "../../common/utils/slideshowApiCall";


function AdminSlideShow() {
  const { t } = useTranslation();
  const [slideshows, setSlideshows] = useState<SlideShow[]>([]);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [isCreateLoading, setIsCreateLoading] = useState(false);
  const [disableCreate, setDisableCreate] = useState(false);
  const [alert, setAlert] = useState({
    msg: "",
    variant: "danger",
  });

  useEffect(() => {
    fetchSlideShowList(
      s => {
        if (s.length > 0) {
          setSlideshows(s);
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
    setAlert({ ...alert, msg: "" });
    setIsCreateLoading(true);
    createSlideShow(
      res => {
        console.log(res);
        setDisableCreate(true);
        setAlert({msg: t('adminSlideShow.alert.createSuccess'), variant: "success"})
      },
      e => {
        console.error(e);
        setAlert({msg: t('adminSlideShow.alert.createErr'), variant: "danger"});
      },
      () => setIsCreateLoading(false)
    )
  };

  const onClickDelete = (id: string) => {
    setAlert({ ...alert, msg: "" });
    const list = slideshows;
    const deletedList = slideshows.filter(i => i.id !== id);
    setSlideshows(deletedList);
    deleteSlideShow(
      id,
      () => {},
      e => {
        console.error(e);
        setSlideshows(list);
        setAlert({msg: t('adminSlideShow.alert.deleteErr'), variant: "danger"});
      },
      () => {}
    )
  };

  const onClickUpdate = (id: string, selected: boolean) => {
    setAlert({ ...alert, msg: "" });
    const list = slideshows;
    setSlideshows(
      slideshows.map((s, i) => {
        if (s.id === id) {
          s.selected = selected;
        }
        return s;
      })
    );
    updateSlideShow(
      id,
      selected,
      () => {},
      e => {
        console.error(e);
        setSlideshows(list);
        setAlert({msg: t('adminSlideShow.alert.updateErr'), variant: "danger"});
      },
      () => {}
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
          <Col>
            {slideshows.map((s, i) => (
              <Row className="py-1" key={i}>
                <Col xs={8} sm={9} md={{offset: 1, span: 8}} xl={{offset: 2, span: 8}}>
                  <video
                    controls
                    width="100%"
                    src={s.contentUrl}
                    poster={s.thumbnailUrl}
                  />
                </Col>
                <Col>
                  <Row className="pb-2">
                    <Col>
                      <Form.Check 
                        type="switch"
                        id="msg-checl"
                        label={t("adminSlideShow.label.selected")}
                        checked={s.selected}
                        onChange={e => onClickUpdate(s.id, e.target.checked)}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => onClickDelete(s.id)}>
                        {t("common.button.delete")}
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
          ))}
          </Col>
        </Row>
      )}
      <Row className="py-5">
        <Col md={6} xl={4} className="d-grid gap-2 mx-auto">
          <SubmitButton
            buttonSize="lg"
            disabled={disableCreate}
            isLoading={isCreateLoading}
            buttonText={t("adminSlideShow.button.create")}
            onClick={onClickCreate}/>
        </Col>
      </Row>
    </Container>
  );
}

export default AdminSlideShow;
