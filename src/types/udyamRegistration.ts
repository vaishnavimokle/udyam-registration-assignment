export interface DecentroUdyamResponse<T> {
  decentroTxnId: string;
  initialDecentroTxnId: string;
  status: string;
  message: string;
  data: T;
  responseKey: string;
}

export interface UdyamStatusResponse {
  status: string;
  terminal: boolean;
  udyamNumber?: string;
  description: string;
  error?: ErrorStatus;
}

export interface ErrorStatus {
  message?: string;
  responseKey?: string;
}

export interface InitiateSessionData {
  sessionUrl: string;
}

interface UdyamAddressDetail {
  door: string;
  premises: string;
  town: string;
  block: string;
  road: string;
  city: string;
  district: string;
  state: string;
  pincode: string;
  stateValue?: string;
  districtValue?: string;
}

interface UdyamUnitDetail {
  unitName: string;
  door: string;
  premises: string;
  town: string;
  block: string;
  road: string;
  city: string;
  district: string;
  state: string;
  pincode: string;
  stateValue?: string;
  districtValue?: string;
}

interface UdyamEnterpriseStatus {
  dateOfIncorporation: string;
  dateOfCommencement?: string;
}

interface UdyamBankDetail {
  accountNumber: string;
  ifscCode: string;
}

interface UdyamEmployeeDetail {
  male: number;
  female: number;
  others: number;
}

export interface UdyamRegistrationDetailRequest {
  typeOfOrganisation: TypeOfOrganisation;
  pan: string;
  dob: string;
  email: string;
  mobile: string;
  socialCategory: SocialCategory;
  gender: Gender;
  speciallyAbled: boolean;
  enterpiseName: string;
  units?: UdyamUnitDetail[];
  officialAddress: UdyamAddressDetail;
  enterpriseStatus: UdyamEnterpriseStatus;
  bankDetails?: UdyamBankDetail;
  activityCategory: ActivityCategory;
  tradingServices: boolean;
  nicCodes: string[];
  numberOfEmployees?: UdyamEmployeeDetail;
  nameOnPan?: string;
}
