interface StringKeyObject {
  [key: string]: any;
}

export interface User extends StringKeyObject {
  id: string;
  attendance: boolean;
  guestType: GuestType;
  lineName: string;
  name: string;
  nameKana: string;
  postalCode: string;
  address: string;
  email: string;
  allergy: string;
  message: string;
  companions : Companion[];
  follow: boolean;
  registered: boolean;
  isAdmin: boolean;
  note: string;
}

export interface Companion {
  name: string;
  allergy: string;
}

export function initCompanions(): Companion[] {
  return [
    {
      name: '',
      allergy: '',
    },
    {
      name: '',
      allergy: '',
    }
  ];
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
    name: '',
    nameKana: '',
    postalCode: '',
    address: '',
    email: '',
    allergy: '',
    message: '',
    companions : initCompanions(),
    follow: false,
    registered: false,
    isAdmin: false,
    note: '',
  };
}