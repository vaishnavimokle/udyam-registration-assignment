import { udyamInitiate } from "@/api/udyamRegistration";
import ScreenLayout from "@/components/layouts/screenLayout";
import { OTPVerificationType, UdyamRegistrationStage } from "@/constants/udyam";
import pollForStatus from "@/services/udyam/statusPoller";
import useUdyamSessionStore from "@/stores/useUdyamSessionStore";
import { Button, Checkbox } from "@mantine/core";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [loading, setBtnLoading] = useState(false);
  const [udyamWindow, setUdyamWindow] = useState<Window | null>(null);
  const [udyamUrl, setUdyamUrl] = useState<string>();
  const [isSimulation, setIsSimulation] = useState(true);

  const setSessionTxnId = useUdyamSessionStore(
    (state) => state.setSessionTxnId
  );

  const router = useRouter();

  useEffect(() => {
    if (udyamWindow && udyamUrl) {
      const udyamPopupMessageListener = async (event: MessageEvent) => {
        const data = event.data;

        if (event.origin !== new URL(udyamUrl).origin) return;

        console.log("Response recieved: ", data);

        udyamWindow.close();

        if (JSON.parse(data)["status"] == "SUCCESS") {
          const status = await pollForStatus([
            UdyamRegistrationStage.SESSION_INITIATION_SUCCESSFUL,
            UdyamRegistrationStage.SESSION_INITIATION_FAILED,
          ]);
          setBtnLoading(false);
          if (status) {
            if (
              status?.data.status ==
              UdyamRegistrationStage.SESSION_INITIATION_SUCCESSFUL
            ) {
              router.push({
                pathname: "/udyam/otp",
                query: {
                  type: OTPVerificationType.VERIFY_SESSION,
                  redirectUrl: "/udyam/addDetails",
                },
              });
            } else {
              router.push({
                pathname: "/udyam/failure",
                query: {
                  message: status.data.error
                    ? status.data.error.message
                    : status.data.description,
                },
              });
            }
          } else {
            console.log("Poller timed out");
          }
        }
      };
      window.addEventListener("message", udyamPopupMessageListener);

      return () => {
        window.removeEventListener("message", udyamPopupMessageListener);
      };
    }
  }, [udyamWindow, udyamUrl, router]);

  const onInitiate = async () => {
    setBtnLoading(true);
    try {
      const sessionResp = await udyamInitiate(isSimulation);
      setSessionTxnId(sessionResp.decentroTxnId);
      console.log("Session transaction id: ", sessionResp.decentroTxnId);
      setUdyamUrl(sessionResp.data.sessionUrl);
      const udyamWindow = window.open(sessionResp.data.sessionUrl);
      setUdyamWindow(udyamWindow);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ScreenLayout title="Udyam Registration Initiate Session">
      <div className="w-full flex flex-col justify-around pt-10 md:pt-20">
        <div className="flex flex-col gap-6 items-center">
          <div className="max-w-sm flex flex-col gap-4">
            <Checkbox
              label="I want to use simulation."
              checked={isSimulation}
              onChange={(event) => setIsSimulation(event.currentTarget.checked)}
            />
            <Button onClick={onInitiate} loading={loading}>
              Initiate Udyam Registration
            </Button>
          </div>
        </div>
      </div>
    </ScreenLayout>
  );
};

export default HomePage;
