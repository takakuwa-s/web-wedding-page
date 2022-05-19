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
  isRegistered: boolean;
}

export enum GuestType {
  GROOM = "GROOM",
  BRIDE = "BRIDE",
}

export function initUser(): User {
  return {
    id: "",
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
    isRegistered: false,
  };
}