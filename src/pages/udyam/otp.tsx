import { udyamConfirmOTP, udyamVerifySession } from "@/api/udyamRegistration";
import ScreenLayout from "@/components/layouts/screenLayout";
import OTPForm from "@/components/udyam/OTPForm";
import { OTPVerificationType, UdyamRegistrationStage } from "@/constants/udyam";
import pollForStatus from "@/services/udyam/statusPoller";
import { UdyamStatusResponse } from "@/types/udyamRegistration";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function OTPPage() {
  const router = useRouter();

  const [errorText, setErrorText] = useState<string>();
  const [loading, setLoading] = useState(false);

  const { type, redirectUrl } = router.query;

  useEffect(() => {
    if (router.isReady && !(type || redirectUrl)) {
      router.push({
        pathname: "/udyam/failure",
        query: {
          message: "Missing params: type or redirectUrl",
        },
      });
    }
  }, [router, type, redirectUrl]);

  const getAcceptableStages = (otyType: OTPVerificationType) => {
    switch (otyType) {
      case OTPVerificationType.VERIFY_SESSION:
        return [
          UdyamRegistrationStage.SESSION_VERIFICATION_OTP_SUCCESSFUL,
          UdyamRegistrationStage.SESSION_VERIFICATION_OTP_FAILED_ACTIVE_SESSION,
          UdyamRegistrationStage.SESSION_VERIFICATION_OTP_FAILED,
        ];
      case OTPVerificationType.CONFIRM_REGISTRATION:
        return [
          UdyamRegistrationStage.SESSION_CONFIRMATION_OTP_SUCCESSFUL,
          UdyamRegistrationStage.SESSION_CONFIRMATION_OTP_FAILED_ACTIVE_SESSION,
          UdyamRegistrationStage.SESSION_CONFIRMATION_OTP_FAILED,
        ];
    }
  };

  const handleVerifySessionStatus = (status: UdyamStatusResponse) => {
    setLoading(true);
    if (
      status.data.status ==
      UdyamRegistrationStage.SESSION_VERIFICATION_OTP_SUCCESSFUL
    ) {
      router.push("/udyam/addDetails");
    } else if (
      status.data.status ==
      UdyamRegistrationStage.SESSION_VERIFICATION_OTP_FAILED_ACTIVE_SESSION
    ) {
      setErrorText(
        status.data.error ? status.data.error.message : status.data.description
      );
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
    setLoading(false);
  };

  const handleConfirmRegistrationStatus = (status: UdyamStatusResponse) => {
    setLoading(true);
    if (
      status.data.status ==
      UdyamRegistrationStage.SESSION_CONFIRMATION_OTP_SUCCESSFUL
    ) {
      router.push({
        pathname: "/udyam/success",
        query: {
          message: status.data.description,
          udyamNumber: status.data.udyamNumber,
        },
      });
    } else if (
      status.data.status ==
      UdyamRegistrationStage.SESSION_CONFIRMATION_OTP_FAILED_ACTIVE_SESSION
    ) {
      setErrorText(
        status.data.error ? status.data.error.message : status.data.description
      );
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

    setLoading(false);
  };

  const onSubmit = async (otp: string) => {
    const otpType = type as OTPVerificationType;
    var addDetailsResp;
    var status;
    switch (otpType) {
      case OTPVerificationType.VERIFY_SESSION:
        addDetailsResp = await udyamVerifySession(otp);
        status = await pollForStatus(getAcceptableStages(otpType));
        if (status) handleVerifySessionStatus(status);
        else console.log("Poller timed out");
        break;
      case OTPVerificationType.CONFIRM_REGISTRATION:
        addDetailsResp = await udyamConfirmOTP(otp);
        status = await pollForStatus(getAcceptableStages(otpType));
        if (status) handleConfirmRegistrationStatus(status);
        else console.log("Poller timed out");
        break;
    }
  };

  return (
    <ScreenLayout title="Enter OTP" headerTitle="OTP Verification">
      <div className="flex flex-col items-center justify-center h-full">
        <OTPForm loading={loading} onSubmit={onSubmit} errorText={errorText} />
      </div>
    </ScreenLayout>
  );
}
