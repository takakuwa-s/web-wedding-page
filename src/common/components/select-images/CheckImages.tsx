import Col from "react-bootstrap/esm/Col";
import { File } from "../../dto/file";
import Image from 'react-bootstrap/Image'
import Row from "react-bootstrap/esm/Row";
import Form from "react-bootstrap/esm/Form";
import './CheckImages.scss';
import { useState } from "react";

interface CheckImage {
	id: string;
	thumbnailUrl: string;
  checked?: boolean;
}

function CheckImages(props: IProps) {
  const fileToImage = (files: File[]) => {
    return files.map(f => {
      return {
        id: f.id,
        thumbnailUrl: f.thumbnailUrl,
        checked: false
      };
    });
  };
  const [checkImages, setCheckImages] = useState<CheckImage[]>(fileToImage(props.images));
  const onClickImage = (image: CheckImage) => {
    const list = checkImages.map(i => {
      if (i.id === image.id) {
        i.checked = !i.checked;
      }
      return i;
    });
    setCheckImages(list);

    const ids: string[] = checkImages
      .filter(i => i.checked)
      .map(i => i.id);
    props.onCheck(ids);
  }

  return (
    <Row className="ps-1 pt-2 pb-4">
      {checkImages.map((image, idx) => (
        <Col key={idx} xs={4} sm={3} md={2} xl={1} className="ps-0 pe-1 pb-1">
          <div className="position-relative" onClick={() => onClickImage(image)}>
            <Image className="square" thumbnail={image.checked} rounded src={image.thumbnailUrl} alt={image.id} />
            <Form.Check 
              type='checkbox'
              id={image.id}
              className="image-checkbox"
              checked={image.checked}
              readOnly
            />
          </div>
        </Col>
      ))}
    </Row>
  );
}

interface IProps {
  images: File[];
  onCheck: (ids: string[]) => void;
}

export default CheckImages;