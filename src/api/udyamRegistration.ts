import useUdyamSessionStore from "@/stores/useUdyamSessionStore";
import { axios } from "@/lib/axios";

import {
  UdyamRegistrationDetailRequest,
  InitiateSessionData,
} from "../types/udyamRegistration";
import { DecentroResponse } from "@/types";

export const udyamInitiate = async (
  isSimulated: boolean = false
): Promise<DecentroResponse<InitiateSessionData>> => {
  if (isSimulated) {
    return axios.get("/v2/kyc/register/udyam/initiate", {
      headers: {
        "x-simulation-request": "true",
      },
    });
  } else {
    return axios.get("/v2/kyc/register/udyam/initiate");
  }
};

export const udyamVerifySession = async (
  otp: string
): Promise<DecentroResponse<null>> => {
  const txnId = useUdyamSessionStore.getState().sessionTxnId;
  return axios.post(`/v2/kyc/register/udyam/verify/${txnId}`, {
    otp: otp,
  });
};
function toSnakeCase(str: string): string {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

function convertKeysToSnakeCase(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map((v) => convertKeysToSnakeCase(v));
  } else if (obj !== null && obj.constructor === Object) {
    return Object.keys(obj).reduce((acc, key) => {
      const snakeCaseKey = toSnakeCase(key);
      acc[snakeCaseKey] = convertKeysToSnakeCase(obj[key]);
      return acc;
    }, {} as any);
  }
  return obj;
}
export const udyamAddDetails = async (
  data: UdyamRegistrationDetailRequest
): Promise<DecentroResponse<null>> => {
  const camelCaseObj = convertKeysToSnakeCase(data);
  delete camelCaseObj.trading_services
  camelCaseObj["enterpise_name"] = camelCaseObj.enterprise_name
  delete camelCaseObj.enterprise_name;
  // delete camelCaseObj.name_on_pan;
  console.log("addind", camelCaseObj)
  const txnId = useUdyamSessionStore.getState().sessionTxnId;
  return axios.post(`/v2/kyc/register/udyam/details/${txnId}`, {
    ...camelCaseObj,
  });
};

export const udyamConfirmOTP = async (
  otp: string
): Promise<DecentroResponse<null>> => {
  const txnId = useUdyamSessionStore.getState().sessionTxnId;
  return axios.post(`/v2/kyc/register/udyam/confirm/${txnId}`, {
    otp: otp,
  });
};

export const udyamResendOTP = async (otp: string): Promise<DecentroResponse<null>> => {
  const txnId = useUdyamSessionStore.getState().sessionTxnId;
  return axios.post(`/v2/kyc/register/udyam/resend/${txnId}`, {
    otp: otp,
  });
};
