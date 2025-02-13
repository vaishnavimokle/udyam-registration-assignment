import { udyamInitiate } from "@/api/udyamRegistration"
import ScreenLayout from "@/components/layouts/screenLayout"
import { OTPVerificationType, UdyamRegistrationStage } from "@/constants/udyam"
import pollForStatus from "@/services/udyam/statusPoller"
import { Button } from "@mantine/core"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const HomePage = () => {

    const [loading, setBtnLoading] = useState(false)
    const [udyamWindow, setUdyamWindow] = useState<Window | null>(null);

    const router = useRouter()

    useEffect(() => {
      if (udyamWindow) {
        const udyamPopupMessageListener = async (event: MessageEvent) => {
          const data = event.data
          console.log(data);

          const stage = await pollForStatus([
            UdyamRegistrationStage.SESSION_INITIATION_SUCCESSFUL,
            UdyamRegistrationStage.SESSION_INITIATION_FAILED
          ]);
          if (stage == UdyamRegistrationStage.SESSION_INITIATION_SUCCESSFUL) {
            router.push({
              pathname: "/udyam/otp",
              query: { type: OTPVerificationType.VERIFY_SESSION },
            });
          }
        }
        window.addEventListener("message", udyamPopupMessageListener)

        return () => {
          window.removeEventListener("message", udyamPopupMessageListener);
        }
      }
    }, [udyamWindow, router]);

    const onInitiate = async () => {
        setBtnLoading(true)
        try {
            const udyamUrl = (await udyamInitiate(true)).data.sessionUrl;
            const udyamWindow = window.open(udyamUrl);
            setUdyamWindow(udyamWindow);
        } catch {

        } finally {
            setBtnLoading(false)
        }
    }

    return (
      <ScreenLayout title="Udyam Registration Initiate Session">
        <div className="w-full flex flex-col justify-around pt-10 md:pt-20">
          <div className="flex flex-col gap-6 items-center">
            <div className="w-full max-w-sm">
              <Button onClick={onInitiate} loading={loading}>Initiate Udyam Registration</Button>
            </div>
          </div>
        </div>
      </ScreenLayout>
    );
}

export default HomePage