import liff from "@line/liff/dist/lib";

export function callInitApi(): Promise<Response> {
  const token = liff.getAccessToken();
  const requestOptions: RequestInit = {
    method: 'GET',
    headers: {
      "Authorization": token!
    },
  };
  // TODO: use userId
  // const userId = liff.getDecodedIDToken()?.sub;
  const userId = "U544c7c84c496d89b3f56b034b75f8dae";
  const url: string = `${process.env.REACT_APP_BACKEND_BASE_URL!}/api/init/${userId}`;
  return fetch(url, requestOptions);
}