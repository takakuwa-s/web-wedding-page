interface StringKeyObject {
  [key: string]: any;
}

export interface User extends StringKeyObject {
  id: string;
  attendance: boolean;
  guestType: GuestType;
  lineName: string;
  familyName: string;
  firstName: string;
  familyNameKana: string;
  firstNameKana: string;
  phoneNumber: string;
  postalCode: string;
  address: string;
  taxiUse: boolean;
  allergy: string;
  message: string;
  follow: boolean;
  registered: boolean;
  isAdmin: boolean;
  note: string;
}

export enum GuestType {
  GROOM = "GROOM",
  BRIDE = "BRIDE",
  COMMON = "COMMON",
}

export function initUser(): User {
  return {
    id: "",
    attendance: true,
    guestType: GuestType.GROOM,
    lineName: '',
    familyName: '',
    firstName: '',
    familyNameKana: '',
    firstNameKana: '',
    phoneNumber: '',
    postalCode: '',
    address: '',
    taxiUse: false,
    allergy: '',
    message: '',
    follow: false,
    registered: false,
    isAdmin: false,
    note: '',
  };
}