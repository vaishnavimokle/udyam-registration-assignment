import ScreenLayout from "@/components/layouts/screenLayout";
import OTPForm from "@/components/udyam/OTPForm";

export default function OTPPage() {
    const onSubmit = () => {
        alert("OTP submitted");
    }
  return (
    <ScreenLayout title="Enter OTP" headerTitle="OTP Verification">
      <div className="flex flex-col items-center justify-center h-full">
        <OTPForm onSubmit={onSubmit}  />
      </div>
    </ScreenLayout>
  );
}