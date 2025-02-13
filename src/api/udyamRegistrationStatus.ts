import { axios } from "@/lib/axios";
import useUdyamSessionStore from "@/stores/useUdyamSessionStore";

import {DecentroUdyamResponse, UdyamStatusResponse } from "../types/udyamRegistration"


export const udyamRegistrationStatus = async (): Promise<DecentroUdyamResponse<UdyamStatusResponse>> => {
  const txnId = useUdyamSessionStore.getState().sessionTxnId
  return axios.get(
    `/v2/kyc/register/udyam/status/${txnId}`
  );
};