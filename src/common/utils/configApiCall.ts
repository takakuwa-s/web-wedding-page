import liff from "@line/liff/dist/lib";
import { Config } from "../dto/config";

export function getConfig(
  onSuccess: (config: Config) => void,
  onError: (err: any) => void = e => console.error(e),
  onComplete: () => void = () => {},
  ): void {
  const token = liff.getAccessToken();
  const requestOptions: RequestInit = {
    method: 'GET',
    headers: {
      "Authorization": `Bearer ${token!}`
    },
  };
  const url: string = `${process.env.REACT_APP_BACKEND_BASE_URL!}/api/config`;
  let code: number;
  fetch(url, requestOptions)
    .then(res => {
      code = res.status;
      return res.json();
    })
    .then(res => {
      if (code === 200) {
        onSuccess(res.config);
      } else {
        throw new Error(res.error);
      }
    })
    .catch(onError)
    .finally(onComplete);
}