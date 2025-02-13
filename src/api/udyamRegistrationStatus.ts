import { axios } from "@/lib/axios";
import useUdyamSessionStore from "@/stores/useUdyamSessionStore";

import {
  UdyamStatusResponse,
  UdyamStatusData,
} from "../types/udyamRegistration";

export const udyamRegistrationStatus = async (): Promise<
  UdyamStatusResponse<UdyamStatusData>
> => {
  const txnId = useUdyamSessionStore.getState().sessionTxnId;
  return axios.get(`/v2/kyc/register/udyam/status/${txnId}`);
};
