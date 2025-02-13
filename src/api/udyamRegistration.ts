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

export const udyamAddDetails = async (
  data: UdyamRegistrationDetailRequest
): Promise<DecentroResponse<null>> => {
  const txnId = useUdyamSessionStore.getState().sessionTxnId;
  return axios.post(`/v2/kyc/register/udyam/details/${txnId}`, {
    ...data,
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
