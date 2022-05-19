import liff from "@line/liff/dist/lib";
import { GuestType, User } from "../dto/user";

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

export function fetchUser(
  onSuccess: (user: User) => void,
  onComplete: () => void,
  ): void {
  const token = liff.getAccessToken();
  const requestOptions: RequestInit = {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": token!
    },
  };
  // const userId = liff.getDecodedIDToken()?.sub;
  const userId = "U544c7c84c496d89b3f56b034b75f8dae";
  const url: string = process.env.REACT_APP_BACKEND_BASE_URL! + "/api/user/" + userId;
  let code: number;
  fetch(url, requestOptions)
    .then(res => {
      code = res.status;
      return res.json();
    })
    .then(res => {
      if (code === 200) {
        if (!res.user.guestType) {
          res.user.guestType = GuestType.GROOM;
        }
        onSuccess(res.user);
      } else {
        throw new Error(res.error);
      }
    })
    .catch(e => console.error(e))
    .finally(onComplete);
}