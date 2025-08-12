import { UdyamRegistrationStage } from "@/constants/udyam";
import { ActivityCategory, Gender, SocialCategory, TypeOfOrganisation } from "@/constants/addDetails";

export interface UdyamStatusResponse {
  dTxnId: string;
  initialTxnId: string;
  status: string;
  message: string;
  data: UdyamStatusData;
  responseKey: string;
}

export interface UdyamStatusData {
  status: UdyamRegistrationStage;
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

export interface UdyamAddressDetail {
  door: string;
  premises: string;
  town: string;
  block: string;
  road: string;
  city: string;
  district: string;
  state: string;
  pincode: string;
}

export interface UdyamUnitDetail {
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
}

export interface UdyamEnterpriseStatus {
  dateOfIncorporation: string;
  dateOfCommencement?: string;
}

export interface UdyamBankDetail {
  accountNumber: string;
  ifscCode: string;
}

export interface UdyamEmployeeDetail {
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
  enterpriseName: string;
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
