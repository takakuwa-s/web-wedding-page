import liff from "@line/liff/dist/lib";

export interface User {
  id?: string;
  attendance: boolean;
  guestType: GuestType;
  familyName: string;
  firstName: string;
  familyNameKana: string;
  firstNameKana: string;
  phoneNumber: string;
  postalCode: string;
  address: string;
  allergy: string;
  message: string;
}

export enum GuestType {
  GROOM = "GROOM",
  BRIDE = "BRIDE",
}

export function initUser(): User {
  const idToken = liff.getDecodedIDToken();
  return {
    id: idToken?.sub,
    attendance: true,
    guestType: GuestType.GROOM,
    familyName: '',
    firstName: '',
    familyNameKana: '',
    firstNameKana: '',
    phoneNumber: '',
    postalCode: '',
    address: '',
    allergy: '',
    message: '',
  };
}