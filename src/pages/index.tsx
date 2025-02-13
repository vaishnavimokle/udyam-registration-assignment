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
      <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md bg-white p-6 rounded-3xl shadow-lg">
          <form className="space-y-8">
            <h2 className="text-center text-gray-700 mb-2 font-inter">
              Configure Credentials
            </h2>
            <div className="space-y-4">
              <TextInput
                required
                label="Client ID"
                placeholder="Enter Client ID"
                {...form.getInputProps("clientId")}
                className="w-full font-inter text-base"
              />
              <div>
                <label className="block text-sm text-gray-700 font-semibold mb-1 font-inter"></label>
                <PasswordInput
                  required
                  label="Client Secret"
                  placeholder="Enter Client Secret"
                  {...form.getInputProps("clientSecret")}
                  className="w-full font-inter text-base"
                />
              </div>
            </div>

            <Button
              onClick={handleCredentialConfiguration}
              type="button"
              className="w-full"
            >
              Configure
            </Button>
          </form>
        </div>
      </div>
    </ScreenLayout>
  );
}
