import liff from "@line/liff/dist/lib";
import { File } from "../dto/file";

export function fetchImageList(
  limit: number,
  startId: string,
  doFilterUser: boolean,
  onSuccess: (files: File[]) => void,
  onComplete: () => void
  ): void {
  const token = liff.getAccessToken();
  const requestOptions: RequestInit = {
    method: 'GET',
    headers: { "Authorization": token! }
  };
  let param = "?limit=" + limit;
  if (startId) {
    param += "&startId=" + startId;
  }
  if (doFilterUser) {
    param += "&userId=" + liff.getDecodedIDToken()?.sub;
  }
  const url: string = process.env.REACT_APP_BACKEND_BASE_URL! + "/api/file/list" + param;
  let code: number;
  fetch(url, requestOptions)
    .then(res => {
      code = res.status;
      return res.json();
    })
    .then(res => {
      if (code === 200) {
        onSuccess(res.files);
      } else {
        throw new Error(res.error);
      }
    })
    .catch(e => console.error(e))
    .finally(onComplete);
}

export function deleteImage(
  id: string,
  onSuccess: () => void,
  onComplete: () => void
  ): void {
  const token = liff.getAccessToken();
  const requestOptions: RequestInit = {
    method: 'DELETE',
    headers: {
      "Authorization": token!
    }
  };
  const url: string = process.env.REACT_APP_BACKEND_BASE_URL! + "/api/file/" + id;
  let code: number;
  fetch(url, requestOptions)
    .then(res => {
      code = res.status;
      if (code !== 204) {
        return res.json();
      }
      return null;
    })
    .then(res => {
      if (code === 204) {
        onSuccess();
      } else {
        throw new Error(res.error);
      }
    })
    .catch(e => console.error(e))
    .finally(onComplete);
}