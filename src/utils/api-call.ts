import liff from "@line/liff/dist/lib";
import { User } from "../dto/user";

export function saveUser(user: User): Promise<Response> {
  const token = liff.getAccessToken();
  const requestOptions: RequestInit = {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
      "Authorization": token!
    },
    body: JSON.stringify(user)
  };
  const url: string = process.env.REACT_APP_BACKEND_BASE_URL! + "/api/user";
  return fetch(url, requestOptions);
}

export function fetchImageList(limit: number, startId?: string): Promise<Response> {
  const token = liff.getAccessToken();
  const requestOptions: RequestInit = {
    method: 'GET',
    headers: {
      "Authorization": token!
    }
  };
  let param = "?limit=" + limit;
  if (startId) {
    param += "&startId=" + startId;
  }
  const url: string = process.env.REACT_APP_BACKEND_BASE_URL! + "/api/file/list" + param;
  return fetch(url, requestOptions);
}

export function deleteImage(id: string): Promise<Response> {
  const token = liff.getAccessToken();
  const requestOptions: RequestInit = {
    method: 'DELETE',
    headers: {
      "Authorization": token!
    }
  };
  const url: string = process.env.REACT_APP_BACKEND_BASE_URL! + "/api/file/" + id;
  return fetch(url, requestOptions);
}