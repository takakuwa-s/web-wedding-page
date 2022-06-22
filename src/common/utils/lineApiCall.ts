import liff from "@line/liff/dist/lib";

export function sendMessageToLineBot(
  messageKey: string,
  onSuccess: () => void,
  onError: (e: any) => void,
  onComplete: () => void
  ): void {
  const token = liff.getAccessToken();
  const requestOptions: RequestInit = {
    method: 'POST',
    headers: {
      "Authorization": `Bearer ${token!}`
    },
  };
  const url: string = `${process.env.REACT_APP_BACKEND_BASE_URL!}/api/line/message?messageKey=${messageKey}`;
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