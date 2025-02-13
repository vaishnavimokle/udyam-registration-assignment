import { ActivityCategory } from "@/constants/addDetails";
import { Button, TextInput, Select, Checkbox } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { isNotEmpty, useForm } from "@mantine/form";

type EnterpriseDetailField = {
  enterpriseName: string;
  activityCategory: string;
  tradingServices: boolean;
  officialAddress: {
    door: string;
    premises: string;
    town: string;
    block: string;
    road: string;
    city: string;
    district: string;
    state: string;
    pincode: string;
  };
  enterpriseStatus: {
    dateOfIncorporation: string;
    dateOfCommencement: string | undefined;
  };
};

type EnterpriseDetailFormProps = EnterpriseDetailField & {
  onSubmit: (values: EnterpriseDetailField) => void;
};

const EnterpriseDetailForm = ({
  enterpriseName,
  activityCategory,
  tradingServices,
  officialAddress,
  enterpriseStatus,
  onSubmit,
}: EnterpriseDetailFormProps) => {
  const form = useForm({
    initialValues: {
      enterpriseName: enterpriseName,
      activityCategory: activityCategory,
      tradingServices: tradingServices,
      officialAddress: officialAddress,
      enterpriseStatus: enterpriseStatus,
    },
    validate: {
      enterpriseName: isNotEmpty("Required"),
      officialAddress: {
        door: isNotEmpty("Required"),
        premises: isNotEmpty("Required"),
        town: isNotEmpty("Required"),
        block: isNotEmpty("Required"),
        road: isNotEmpty("Required"),
        city: isNotEmpty("Required"),
        pincode: (value) => {
          if (!/^[1-9][0-9]{5}$/.test(value)) {
            return "Invalid Pincode.";
          }
          return null;
        },
      },
      enterpriseStatus: {
        dateOfIncorporation: isNotEmpty("Required"),
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
          label="Enterprise Name"
          placeholder="Enterprise Name"
          {...form.getInputProps("enterpriseName")}
          mr={16}
        />

        <Select
          required
          className="w-full"
          label="Activity Category"
          placeholder="Activity Category"
          {...form.getInputProps("activityCategory")}
          mr={16}
          data={Object.values(ActivityCategory)}
        />

        <Checkbox
          required
          className="w-full pt-8"
          label="Trading Services"
          {...form.getInputProps("tradingServices", {
            type: "checkbox",
          })}
        />
      </div>

      <div className="flex justify-stretch mb-4">
        <DateInput
          required
          className="w-full"
          label="Date Of Incorporation"
          placeholder="Date Of Incorporation"
          key={form.key("enterpriseStatus.dateOfIncorporation")}
          {...form.getInputProps("enterpriseStatus.dateOfIncorporation")}
          mr={16}
        />

        <DateInput
          className="w-full"
          label="Date Of Commencement"
          placeholder="Date Of Commencement"
          key={form.key("enterpriseStatus.dateOfCommencement")}
          {...form.getInputProps("enterpriseStatus.dateOfCommencement")}
          mr={16}
        />
      </div>

      <div className="flex justify-stretch mb-4">
        <TextInput
          required
          className="w-full"
          label="Door"
          placeholder="Door"
          key={form.key("officialAddress.door")}
          {...form.getInputProps("officialAddress.door")}
          mr={16}
        />

        <TextInput
          required
          className="w-full"
          label="Premises"
          placeholder="Premises"
          key={form.key("officialAddress.premises")}
          {...form.getInputProps("officialAddress.premises")}
          mr={16}
        />

        <TextInput
          required
          className="w-full"
          label="Town"
          placeholder="Town"
          key={form.key("officialAddress.town")}
          {...form.getInputProps("officialAddress.town")}
        />
      </div>

      <div className="flex justify-stretch mb-4">
        <TextInput
          required
          className="w-full"
          label="Block"
          placeholder="Block"
          key={form.key("officialAddress.block")}
          {...form.getInputProps("officialAddress.block")}
          mr={16}
        />
        <TextInput
          required
          className="w-full"
          label="Road"
          placeholder="Road"
          key={form.key("officialAddress.road")}
          {...form.getInputProps("officialAddress.road")}
          mr={16}
        />
        <TextInput
          required
          className="w-full"
          label="City"
          placeholder="City"
          key={form.key("officialAddress.city")}
          {...form.getInputProps("officialAddress.city")}
        />
      </div>

      <div className="flex justify-stretch mb-4">
        <Select
          required
          className="w-full"
          label="District"
          placeholder="District"
          key={form.key("officialAddress.district")}
          {...form.getInputProps("officialAddress.district")}
          mr={16}
          data={["KOLHAPUR"]}
        />

        <Select
          required
          className="w-full"
          label="State"
          placeholder="State"
          key={form.key("officialAddress.state")}
          mr={16}
          data={["MAHARASHTRA"]}
          {...form.getInputProps("officialAddress.state")}
        />

        <TextInput
          required
          className="w-full"
          label="Pincode"
          placeholder="Pincode"
          key={form.key("officialAddress.pincode")}
          {...form.getInputProps("officialAddress.pincode")}
        />
      </div>

      <Button type="button" onClick={handleSubmit} fullWidth>
        Submit
      </Button>
    </form>
  );
};

export default EnterpriseDetailForm;
