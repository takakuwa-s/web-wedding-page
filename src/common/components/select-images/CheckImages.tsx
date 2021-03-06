import Col from "react-bootstrap/esm/Col";
import { File } from "../../dto/file";
import Image from 'react-bootstrap/Image'
import Row from "react-bootstrap/esm/Row";
import Form from "react-bootstrap/esm/Form";
import './CheckImages.scss';
import { useState } from "react";
import ProcessingImage from "../processing-image/ProcessingImage";
import { useAppSelector } from "../../../app/hooks";
import { RootState } from "../../../app/store";

interface CheckImage {
	id: string;
	thumbnailUrl: string;
  uploaded: boolean;
  checked?: boolean;
}

function CheckImages(props: IProps) {
  const images = useAppSelector((state: RootState) => state.files.files);
  const fileToImage = (files: File[]) => {
    return files.map(f => {
      return {
        id: f.id,
        thumbnailUrl: f.thumbnailUrl,
        uploaded: f.uploaded,
        checked: false
      };
    });
  };
  const [checkImages, setCheckImages] = useState<CheckImage[]>(fileToImage(images));
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
            {image.uploaded ? (
              <Image className="square" thumbnail={image.checked} rounded src={image.thumbnailUrl} alt={image.id} />
            ) : (
              <ProcessingImage />
            )}
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
  onCheck: (ids: string[]) => void;
}

export default CheckImages;