import './InformationPanel.scss';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import { RootState } from '../../../app/store';
import { useAppSelector } from '../../../app/hooks';
import { File } from "../../../common/dto/file";
import Table from 'react-bootstrap/esm/Table';
import { useTranslation } from 'react-i18next';
import { formatDatetime } from '../../utils/dateUtils';

function InformationPanel(props: IProps) {
  const { t } = useTranslation();
  const user = useAppSelector((state: RootState) => state.user.val);
  const show = useAppSelector((state: RootState) => state.informationPanel.show);
  const id = useAppSelector((state: RootState) => state.informationPanel.id);
  const image = props.imageMap.get(id);
  if (show && image) {
    return (
      <Row className="fixed-bottom information-panel">
        <Col className='bg-white px-4 py-3' xs={12} sm={{offset: 1, span: 10}} lg={{offset: 2, span: 8}}>
          <Table size="sm" className="information-table mb-0">
            <tbody>
              {user.isAdmin && image.createrName && (
                <tr>
                  <td>{t("imageList.label.creater")}</td>
                  <td>{image.createrName}</td>
                </tr>
              )}
              <tr>
                <td>{t("imageList.label.createdAt")}</td>
                <td>{formatDatetime("yyyy/MM/dd HH:mm:ss", image.createdAt)}</td>
              </tr>
              <tr>
                <td>{t("imageList.label.faceScore")}</td>
                <td>{image.faceScore}</td>
              </tr>
              <tr>
                <td>{t("imageList.label.faceHappinessLevel")}</td>
                <td>{image.faceHappinessLevel}</td>
              </tr>
              <tr>
                <td>{t("imageList.label.facePhotoBeauty")}</td>
                <td>{image.facePhotoBeauty}</td>
              </tr>
              <tr>
                <td>{t("imageList.label.faceCount")}</td>
                <td>{image.faceCount}</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    )
  } else {
    return <></>
  }
}

interface IProps {
  imageMap: Map<string, File>
}

export default InformationPanel;