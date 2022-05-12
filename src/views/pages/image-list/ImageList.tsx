import { useEffect, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { useTranslation } from "react-i18next";
import { fetchImageList } from "../../../utils/api-call";

function ImageList() {
  const [url, setUri] = useState("");
  const getImageList = (startAtId?: string) => {
    let code: number
    fetchImageList(10, startAtId)
      .then(res => {
        code = res.status;
        return res.json();
      })
      .then(res => {
        if (code === 200) {
          console.log(res);
          console.log(res.files[0].Uri);
          setUri(res.files[0].Uri);
        } else {
          throw new Error(res.error);
        }
      })
      .catch(e => console.error(e));
  };
  useEffect(() => {
    getImageList();
  });
  
  const { t } = useTranslation();
  return (
    <div className="host-back-ground">
      <Container>
        <Row>
          <Col>
            <img src={url} alt="test" width={100}/>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ImageList;