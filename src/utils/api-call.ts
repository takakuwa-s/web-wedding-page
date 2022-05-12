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

export function fetchImageList(limit: number, startAtId?: string): Promise<Response> {
  const token = liff.getAccessToken();
  const requestOptions: RequestInit = {
    method: 'GET',
    headers: {
      "Authorization": token!
    }
  };
  let param = "?limit=" + limit;
  if (startAtId) {
    param += "&startAtId=" + startAtId;
  }
  const url: string = process.env.REACT_APP_BACKEND_BASE_URL! + "/api/file/list" + param;
  return fetch(url, requestOptions);
}