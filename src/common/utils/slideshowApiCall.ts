import liff from "@line/liff/dist/lib";
import { SlideShow } from "../dto/slideshow";

export function fetchSlideShowList(
  onSuccess: (slideshows: SlideShow[]) => void,
  onError: (e: any) => void,
  onComplete: () => void
  ): void {
  const token = liff.getAccessToken();
  const requestOptions: RequestInit = {
    method: 'GET',
    headers: { "Authorization": `Bearer ${token!}` }
  };
  const url: string = `${process.env.REACT_APP_BACKEND_BASE_URL!}/api/slideshow`;
  let code: number;
  fetch(url, requestOptions)
    .then(res => {
      code = res.status;
      return res.json();
    })
    .then(res => {
      if (code === 200) {
        const s = res.slideshow ? res.slideshow : [];
        onSuccess(s);
      } else {
        throw new Error(res.error);
      }
    })
    .catch(onError)
    .finally(onComplete);
}

export function createSlideShow(
  onSuccess: (res: any) => void,
  onError: (e: any) => void,
  onComplete: () => void
  ): void {
  const token = liff.getAccessToken();
  const requestOptions: RequestInit = {
    method: 'POST',
    headers: {
      "Authorization": `Bearer ${token!}`
    }
  };
  const url: string = `${process.env.REACT_APP_BACKEND_BASE_URL!}/api/slideshow`;
  let code: number;
  fetch(url, requestOptions)
    .then(res => {
      code = res.status;
      return res.json();
    })
    .then(res => {
      if (code === 200) {
        onSuccess(res);
      } else {
        throw new Error(res.error);
      }
    })
    .catch(onError)
    .finally(onComplete);
}