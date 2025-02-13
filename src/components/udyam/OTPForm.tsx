
import { useState } from "react";
import { PinInput, Button, Stack, Text } from "@mantine/core"; 

type OTPFormProps = {
  onSubmit: (otp: string) => void;
  errorText?: string;
};

const OTPForm = ({ onSubmit, errorText }: OTPFormProps) => {
  const [otp, setOtp] = useState<string>("");
  const [errorString, setErrorString] = useState<string | undefined>(errorText);

  const handleChange = (value: string) => {
    setOtp(value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (otp.length !== 6) {
      setErrorString("OTP should be of length 6")
    }
    else if(!(/^[0-9]+$/.test(otp))){
      setErrorString("OTP should only contain numbers")
    } else {
      setErrorString(undefined);
      onSubmit(otp);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xs mx-auto">
      <div className="flex flex-col items-center justify-center content-center  space-y-4">
        <PinInput
          type={"number"}
          length={6}
          value={otp}
          onChange={handleChange}
          error={errorString != null}
          className=""
        />

        {errorString && (
          <Text size="sm" className="text-red-500">
            {errorString}
          </Text>
        )}

        <Button
          type="submit"
          variant="filled"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Submit OTP
        </Button>
      </div>
    </form>
  );
};

export default OTPForm;
