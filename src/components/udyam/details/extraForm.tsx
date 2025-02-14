import { UdyamBankDetail, UdyamEmployeeDetail } from "@/types/udyamRegistration";
import { Button, TextInput, NumberInput } from "@mantine/core";
import { useForm } from "@mantine/form";

type ExtraDetailField = {
  bankDetails?: UdyamBankDetail;
  numberOfEmployees?: UdyamEmployeeDetail;
};

type ExtraDetailFormProps = ExtraDetailField & {
  onSubmit: (values: ExtraDetailField) => void;
};

const ExtraDetailForm = ({
  bankDetails,
  numberOfEmployees,
  onSubmit,
}: ExtraDetailFormProps) => {
  const form = useForm({
    initialValues: {
      bankDetails: bankDetails,
      numberOfEmployees: numberOfEmployees,
    },
    validate: {
      bankDetails: {
        accountNumber: (value) => {
          if (value && !/^\d{9,18}$/.test(value)) {
            return "Invalid Account number.";
          }
          return null;
        },
        ifscCode: (value) => {
          if (value && value.length !== 11) {
            return "Invalid IFSC";
          }
          return null;
        },
      },
      numberOfEmployees: {
        male: (value) => {
          if (value && value < 0) {
            return "Count cannot be less than zero.";
          }
          return null;
        },
        female: (value) => {
          if (value && value < 0) {
            return "Count cannot be less than zero.";
          }
          return null;
        },
        others: (value) => {
          if (value && value < 0) {
            return "Count cannot be less than zero.";
          }
          return null;
        },
      },
    },
    validateInputOnBlur: true,
  });

  const handleSubmit = () => {
    if (!form.validate().hasErrors) {
      onSubmit(form.values);
      form.reset();
    }
  };

  return (
    <form>
      <div className="flex justify-stretch mb-4">
        <TextInput
          required
          className="w-full"
          label="Account Number"
          placeholder="Account Number"
          key={form.key("bankDetails.accountNumber")}
          {...form.getInputProps("bankDetails.accountNumber")}
          mr={16}
        />

        <TextInput
          required
          className="w-full"
          label="IFSC"
          placeholder="IFSC"
          key={form.key("bankDetails.ifscCode")}
          {...form.getInputProps("bankDetails.ifscCode")}
        />
      </div>

      <div className="flex justify-stretch mb-4">
        <NumberInput
          required
          className="w-full"
          label="Employee count (male)"
          placeholder="Employee count (Male)"
          key={form.key("numberOfEmployees.male")}
          {...form.getInputProps("numberOfEmployees.male")}
          mr={16}
        />

        <NumberInput
          required
          className="w-full"
          label="Employee count (female)"
          placeholder="Employee count (female)"
          key={form.key("numberOfEmployees.female")}
          {...form.getInputProps("numberOfEmployees.female")}
          mr={16}
        />

        <NumberInput
          required
          className="w-full"
          label="Employee count (others)"
          placeholder="Employee count (others)"
          key={form.key("numberOfEmployees.others")}
          {...form.getInputProps("numberOfEmployees.others")}
        />
      </div>

      <Button type="button" onClick={handleSubmit} fullWidth>
        Submit
      </Button>
    </form>
  );
};

export default ExtraDetailForm;
