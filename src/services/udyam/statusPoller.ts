import { udyamRegistrationStatus } from "@/api/udyamRegistrationStatus";
import { UdyamRegistrationStage } from "@/constants/udyam";
import { UdyamStatusResponse } from "@/types/udyamRegistration";

const pollForStatus = async (
  expectedStages: UdyamRegistrationStage[],
  interval: number = 5,
  timeout: number = 300
): Promise<UdyamStatusResponse | null> => {
  const endTime = Date.now() + timeout * 1000;
  while (Date.now() < endTime) {
    const statusResponse = (await udyamRegistrationStatus());
    console.log("Current status:", statusResponse.data);
    if (expectedStages.includes(statusResponse.data.status)) {
      return statusResponse;
    }
    await new Promise((resolve) => setTimeout(resolve, interval * 1000));
  }
  return null;
};

export default pollForStatus
