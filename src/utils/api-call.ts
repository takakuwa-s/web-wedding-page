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