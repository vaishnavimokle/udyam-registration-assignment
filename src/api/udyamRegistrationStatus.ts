import { axios } from "@/lib/axios";
import useUdyamSessionStore from "@/stores/useUdyamSessionStore";

import { DecentroResponse } from "../types"
import { UdyamStatusResponse } from "../types/udyamRegistration"


export const udyamRegistrationStatus = async () => {
  const txnId = useUdyamSessionStore.getState().sessionTxnId
  return axios.get<DecentroResponse<UdyamStatusResponse>>(
    `/v2/kyc/register/udyam/status/${txnId}`
  );
};