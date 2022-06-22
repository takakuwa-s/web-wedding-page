import liff from "@line/liff/dist/lib";
import { File } from "../dto/file";

export function fetchFileList(
  limit: number,
  startId: string,
  doFilterUser: boolean,
  orderByFaceScore: boolean,
  uploaded: boolean | null,
  needCreaterName: boolean,
  onSuccess: (files: File[]) => void,
  onError: (e: any) => void,
  onComplete: () => void
  ): void {
  const token = liff.getAccessToken();
  const requestOptions: RequestInit = {
    method: 'GET',
    headers: { "Authorization": `Bearer ${token!}` }
  };
  let param = `?limit=${limit}&needCreaterName=${needCreaterName}`;
  if (uploaded !== null) {
    param += `&uploaded=${uploaded}`;
  }
  if (startId) {
    param += `&startId=${startId}`;
  }
  if (doFilterUser) {
    param += `&userId=${liff.getDecodedIDToken()?.sub}`;
  }
  if (orderByFaceScore) {
    param += "&orderBy=FaceScore";
  }
  const url: string = `${process.env.REACT_APP_BACKEND_BASE_URL!}/api/file/list${param}`;
  let code: number;
  fetch(url, requestOptions)
    .then(res => {
      code = res.status;
      return res.json();
    })
    .then(res => {
      if (code === 200) {
        const f = res.files ? res.files : [];
        onSuccess(f);
      } else {
        throw new Error(res.error);
      }
    })
    .catch(onError)
    .finally(onComplete);
}

export function deleteFile(
  id: string,
  onSuccess: () => void,
  onError: (e: any) => void,
  onComplete: () => void
  ): void {
  const token = liff.getAccessToken();
  const requestOptions: RequestInit = {
    method: 'DELETE',
    headers: {
      "Authorization": `Bearer ${token!}`
    }
  };
  const url: string = `${process.env.REACT_APP_BACKEND_BASE_URL!}/api/file/${id}`;
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
    .catch(onError)
    .finally(onComplete);
}

export function deleteFileList(
  ids: string[],
  onSuccess: () => void,
  onError: (e: any) => void,
  onComplete: () => void
  ): void {
  const token = liff.getAccessToken();
  const requestOptions: RequestInit = {
    method: 'DELETE',
    headers: {
      "Authorization": `Bearer ${token!}`
    }
  };
  let param: string = `id=${ids[0]}`;
  for (let i=1; i<ids.length; i++) {
    param += `&id=${ids[i]}`;
  }
  const url: string = `${process.env.REACT_APP_BACKEND_BASE_URL!}/api/file/list?${param}`;
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
    .catch(onError)
    .finally(onComplete);
}