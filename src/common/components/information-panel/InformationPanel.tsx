import './InformationPanel.scss';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import { RootState } from '../../../app/store';
import { useAppSelector } from '../../../app/hooks';
import Table from 'react-bootstrap/esm/Table';
import { useTranslation } from 'react-i18next';
import { formatDatetime, formatMilisec } from '../../utils/dateUtils';

function InformationPanel() {
  const { t } = useTranslation();
  const user = useAppSelector((state: RootState) => state.user.val);
  const show = useAppSelector((state: RootState) => state.informationPanel.show);
  const files = useAppSelector((state: RootState) => state.files.files);
  const id = useAppSelector((state: RootState) => state.informationPanel.id);
  const file = files.filter(f => f.id === id)[0];
  if (show && file) {
    return (
      <Row className="fixed-bottom information-panel">
        <Col className='bg-white px-4 py-3' xs={12} sm={{offset: 1, span: 10}} lg={{offset: 2, span: 8}}>
          <Table size="sm" className="information-table mb-0">
            <tbody>
              {user.isAdmin && file.createrName && (
                <tr>
                  <td>{t("imageList.label.creater")}</td>
                  <td>{file.createrName}</td>
                </tr>
              )}
              <tr>
                <td>{t("imageList.label.createdAt")}</td>
                <td>{formatDatetime("yyyy/MM/dd HH:mm:ss", file.createdAt)}</td>
              </tr>
              {file.fileType === 'image' ? (
                <>
                  <tr>
                    <td>{t("imageList.label.faceScore")}</td>
                    <td>{file.calculated ? file.faceScore : t("imageList.calculating")}</td>
                  </tr>
                  <tr>
                    <td>{t("imageList.label.faceHappinessLevel")}</td>
                    <td>{file.calculated ? file.faceHappinessLevel : t("imageList.calculating")}</td>
                  </tr>
                  <tr>
                    <td>{t("imageList.label.facePhotoBeauty")}</td>
                    <td>{file.calculated ? file.facePhotoBeauty : t("imageList.calculating")}</td>
                  </tr>
                  <tr>
                    <td>{t("imageList.label.faceCount")}</td>
                    <td>{file.calculated ? file.faceCount : t("imageList.calculating")}</td>
                  </tr>
                </>
              ) : (
                <tr>
                  <td>{t("imageList.label.duration")}</td>
                  <td>{formatMilisec(file.duration)}</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
    )
  } else {
    return <></>
  }
}

export default InformationPanel;