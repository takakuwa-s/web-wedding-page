import liff from "@line/liff/dist/lib";
import { User } from "../dto/user";

export function saveUser(
  user: User,
  onSuccess: (user: User) => void,
  onError: (err: any) => void,
  onComplete: () => void,
  ): void {
  const token = liff.getAccessToken();
  const requestOptions: RequestInit = {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token!}`
    },
    body: JSON.stringify(user)
  };
  const url: string = `${process.env.REACT_APP_BACKEND_BASE_URL!}/api/user/${user.id}`;
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
    .catch(onError)
    .finally(onComplete);
}

export function patchUser(
  userId: String,
  filed: String,
  value: any,
  onSuccess: () => void,
  onError: (err: any) => void,
  onComplete: () => void,
  ): void {
  const token = liff.getAccessToken();
  const requestOptions: RequestInit = {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token!}`
    },
    body: `{"${filed}":"${value}"}`
  };
  const url: string = `${process.env.REACT_APP_BACKEND_BASE_URL!}/api/user/${userId}`;
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

export function getUserList(
  limit: number,
  startId: string,
  flag: string,
  val: boolean,
  csvDownload: boolean,
  onSuccess: (users: any) => void,
  onError: (err: any) => void,
  onComplete: () => void,
  ): void {
  const token = liff.getAccessToken();
  const requestOptions: RequestInit = {
    method: 'GET',
    headers: {
      "Authorization": `Bearer ${token!}`
    },
  };
  let param = `?limit=${limit}`;
  if (startId) {
    param += `&startId=${startId}`;
  }
  if (flag) {
    param += `&flag=${flag}&val=${val}`;
  }
  if (csvDownload) {
    param += `&csvDownload=${csvDownload}`;
  }
  const url: string = `${process.env.REACT_APP_BACKEND_BASE_URL!}/api/user/list${param}`;
  let code: number;

  fetch(url, requestOptions)
    .then(res => {
      code = res.status;
      if (csvDownload) {
        return res.blob();
      } else {
        return res.json(); 
      }
    })
    .then(res => {
      if (code === 200) {
        if (csvDownload) {
          onSuccess(res);
        } else {
          onSuccess(res.users);
        }
      } else {
        throw new Error(res.error);
      }
    })
    .catch(onError)
    .finally(onComplete);
}

export function getUser(
  id: string,
  onSuccess: (users: User) => void,
  onError: (err: any) => void,
  onComplete: () => void,
  ): void {
  const token = liff.getAccessToken();
  const requestOptions: RequestInit = {
    method: 'GET',
    headers: {
      "Authorization": `Bearer ${token!}`
    },
  };
  const url: string = `${process.env.REACT_APP_BACKEND_BASE_URL!}/api/user/${id}`;
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
    .catch(onError)
    .finally(onComplete);
}