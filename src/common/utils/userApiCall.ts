import liff from "@line/liff/dist/lib";
import { User } from "../dto/user";

export function saveUser(
  user: User,
  onSuccess: (user: User) => void,
  onError: (err: any) => void,
  ): void {
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
  let code: number;
  fetch(url, requestOptions)
    .then(res => {
      code = res.status;
      return res.json();
    })
    .then(res => {
      if (code === 200) {
        onSuccess(res.user);
      } else {
        throw new Error(res.error);
      }
    })
    .catch(onError);
}