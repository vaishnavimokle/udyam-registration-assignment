import { udyamRegistrationStatus } from "@/api/udyamRegistrationStatus";
import { UdyamRegistrationStage } from "@/constants/udyam";

const pollForStatus = async (
  expectedStages: UdyamRegistrationStage[],
  interval: number = 5,
  timeout: number = 300
): Promise<UdyamRegistrationStage | null> => {
  const endTime = Date.now() + timeout * 1000;
  while (Date.now() < endTime) {
    const currentStage = (await udyamRegistrationStatus()).data.status;
    console.log(`Current stage: ${currentStage}`);
    if (expectedStages.includes(currentStage)) {
      return currentStage;
    }
    await new Promise((resolve) => setTimeout(resolve, interval * 1000));
  }
  return null;
};

export default pollForStatus
