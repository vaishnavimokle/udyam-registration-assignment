import useUdyamSessionStore from "@/stores/useUdyamSessionStore";
import { axios } from "@/lib/axios";

import { DecentroResponse } from "../types"
import { UdyamRegistrationDetailRequest, InitiateSessionData } from "../types/udyamRegistration"

export const udyamInitiate = async () => {
  return axios.get<DecentroResponse<InitiateSessionData>>(
    '/v2/kyc/register/udyam/initiate',
  );
};

export const udyamVerifySession = async (otp: string) => {
  const txnId = useUdyamSessionStore.getState().sessionTxnId
  return axios.post<DecentroResponse<null>>(
    `/v2/kyc/register/udyam/verify/${txnId}`,
    {
      otp: otp,
    }
  );
};

export const udyamAddDetails = async (data: UdyamRegistrationDetailRequest) => {
  const txnId = useUdyamSessionStore.getState().sessionTxnId
  return axios.post<DecentroResponse<null>>(
    `/v2/kyc/register/udyam/details/${txnId}`,
    {
      ...data
    }
  );
};

export const udyamConfirmOTP = async (otp: string) => {
  const txnId = useUdyamSessionStore.getState().sessionTxnId
  return axios.post<DecentroResponse<null>>(
    `/v2/kyc/register/udyam/confirm/${txnId}`, {
    otp: otp,
  }
  );
};

export const udyamResendOTP = async (otp: string) => {
  const txnId = useUdyamSessionStore.getState().sessionTxnId
  return axios.post<DecentroResponse<null>>(
    `/v2/kyc/register/udyam/resend/${txnId}`,
    {
      otp: otp,
    }
  );
};