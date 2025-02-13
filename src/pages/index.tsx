import ScreenLayout from "@/components/layouts/screenLayout";
import { Button, PasswordInput, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import useAuthStore from "@/stores/useAuthStore";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { APIUrl } from "@/constants/apiUrl";

export default function Home() {
  const setAuthState = useAuthStore((state) => state.setAuthState);
  const { apiUrl, clientId, clientSecret } = useAuthStore();
  const router = useRouter();

  const form = useForm({
    initialValues: {
      apiUrl: apiUrl,
      clientId: clientId,
      clientSecret: clientSecret,
    },
    validate: {
      clientId: (value) => {
        if (value.length <= 0) {
          return "Client ID is required.";
        }
        return null;
      },
      clientSecret: (value) => {
        if (value.length <= 0) {
          return "Client Secret is required.";
        }
        return null;
      },
    },
    validateInputOnBlur: true,
  });

  useEffect(() => {
    if (clientId && clientSecret) {
      router.push("/udyam/home");
    }
  }, [clientId, clientSecret]);

  const handleCredentialConfiguration = () => {
    if (!form.validate().hasErrors) {
      setAuthState(form.values.clientId, form.values.clientSecret);
      form.reset();
    }
  };

  return (
    <ScreenLayout title="Decentro Fabric Udyam Registration Demo">
      <div className="w-full flex flex-col justify-around pt-10 md:pt-20">
        <div className="flex flex-col gap-6 items-center">
          <div className="w-full max-w-sm">
            <form className="w-full max-w-sm">
              <Select
                label="Select your environment"
                defaultValue={APIUrl.QA}
                data={Object.values(APIUrl)}
                {...form.getInputProps("apiUrl")}
                mb={16}
              />
              <TextInput
                required
                label="Client ID"
                placeholder="Client ID"
                {...form.getInputProps("clientId")}
                mb={16}
              />
              <PasswordInput
                required
                label="Client Secret"
                placeholder="Client Secret"
                {...form.getInputProps("clientSecret")}
                mb={16}
              />

              <Button
                onClick={handleCredentialConfiguration}
                type="button"
                fullWidth
              >
                Configure
              </Button>
            </form>
          </div>
        </div>
      </div>
    </ScreenLayout>
  );
}
