import { ActivityCategory } from "@/constants/addDetails";
import { stateDistMapping } from "@/constants/stateDistMapping";
import {
  UdyamAddressDetail,
  UdyamEnterpriseStatus,
} from "@/types/udyamRegistration";
import { Button, TextInput, Select, Checkbox } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { isNotEmpty, useForm } from "@mantine/form";
import { useState } from "react";

type EnterpriseDetailField = {
  enterpriseName: string;
  activityCategory: ActivityCategory;
  tradingServices: boolean;
  officialAddress: UdyamAddressDetail;
  enterpriseStatus: UdyamEnterpriseStatus;
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
  const form = useForm<EnterpriseDetailField>({
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

  const [selctedState, setSelectedState] = useState<string>("MAHARASHTRA");

  const handleSubmit = () => {
    if (!form.validate().hasErrors) {
      onSubmit(form.values);
      form.reset();
    }
  };

  return (
    <form className="w-full flex flex-col gap-4">
      <div className="flex flex-col justify-stretch mb-4 gap-4">
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
          className="w-full"
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
          valueFormat="YYYY-MM-DD"
          value={
            form.values.enterpriseStatus.dateOfIncorporation
              ? new Date(form.values.enterpriseStatus.dateOfIncorporation)
              : undefined
          }
          onChange={(date) =>
            form.setFieldValue(
              "enterpriseStatus.dateOfIncorporation",
              date ? date.toISOString().split("T")[0] : ""
            )
          }
          mr={16}
        />

        <DateInput
          className="w-full"
          label="Date Of Commencement"
          placeholder="Date Of Commencement"
          key={form.key("enterpriseStatus.dateOfCommencement")}
          valueFormat="YYYY-MM-DD"
          value={
            form.values.enterpriseStatus.dateOfCommencement
              ? new Date(form.values.enterpriseStatus.dateOfCommencement)
              : undefined
          }
          onChange={(date) =>
            form.setFieldValue(
              "enterpriseStatus.dateOfCommencement",
              date ? date.toISOString().split("T")[0] : ""
            )
          }
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
          label="State"
          placeholder="State"
          key={form.key("officialAddress.state")}
          mr={16}
          value={selctedState}
          searchable
          data={Object.keys(stateDistMap)}
          onChange={(state) => {
            state && setSelectedState(state);
          }}
        />
        <Select
          required
          className="w-full"
          label="District"
          placeholder="District"
          key={form.key("officialAddress.district")}
          mr={16}
          defaultValue="KOLHAPUR"
          searchable
          data={stateDistMap[selctedState].map((obj: any) => ({
            ...obj,
            value: obj.district,
          }))}
          value={form.values.officialAddress.district}
          onChange={(dist) => {
            const stateDist =
              stateDistMapping.find((map) => map.district == dist) ||
              stateDistMapping[0];
            form.setFieldValue("officialAddress.district", stateDist.district);
            form.setFieldValue("officialAddress.state", stateDist.state);
          }}
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

const stateDistMap = stateDistMapping.reduce((acc: any, curr) => {
  if (!acc[curr.state]) {
    acc[curr.state] = [];
  }
  acc[curr.state].push(curr);
  return acc;
}, {});
