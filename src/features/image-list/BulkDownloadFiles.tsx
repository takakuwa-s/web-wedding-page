import './ImageList.scss';
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { useTranslation } from "react-i18next";
import Container from 'react-bootstrap/esm/Container';
import ErrorAlert from '../../common/components/error-alert/ErrorAlert';
import { fetchFileListByIds } from '../../common/utils/fileApiCall';
import { File } from "../../common/dto/file";
import { SetStateAction, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { downloadFile, generateZipDownloadUrl } from '../../common/utils/fileDownloadUtils';
import Loading from '../../common/components/loading/Loading';

function BulkDownloadFiles() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const ids = searchParams.getAll("id");
  const expire = Number(searchParams.get("expire"));
  const token = searchParams.get("token");
  const [fetched, setFetched] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [alertMsg, setAlertMsg] = useState("");

  useEffect(() => {
    const downloadMultipleImages = async (files: File[]) => {
      const folderName = t("imageList.bulkDownloadFolderName");
      generateZipDownloadUrl(files, folderName)
      .then((url: string) => {
        downloadFile(url, folderName + '.zip');
        URL.revokeObjectURL(url);
        setAlertMsg("");
      }).catch(e => {
        console.error(e);
        setAlertMsg(t("imageList.alert.bulkDownloadErr") as SetStateAction<string>);
      }).finally(() => setIsLoading(false));
    };

    if (!fetched) {
      if (expire && (new Date().getTime() < expire)) {
        if (ids.length > 0 && token) {
          fetchFileListByIds(
            ids,
            token,
            f => {
              setFetched(true);
              downloadMultipleImages(f);
            },
            e => {
              console.error(e);
              setIsLoading(false);
              setAlertMsg(t("imageList.alert.loadErr") as SetStateAction<string>);
            }
          );
        } else {
          setIsLoading(false);
          setAlertMsg(t("imageList.alert.bulkDownloadBadRequest") as SetStateAction<string>);
        }
      } else {
        setIsLoading(false);
        setAlertMsg(t("imageList.alert.bulkDownloadExpired") as SetStateAction<string>);
      }
    }
  }, [t, fetched, ids, expire, token]);

  return (
    <Container fluid>
      <Row>
        <Col>
          <h2 className="pt-3 text-center">{t('imageList.title.bulkDownload')}</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <ErrorAlert msg={alertMsg} variant='danger'/>
          {isLoading && <Loading />}
        </Col>
      </Row>
    </Container>
  );
}

export default BulkDownloadFiles;