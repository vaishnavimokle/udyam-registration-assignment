import {
  Gender,
  SocialCategory,
  TypeOfOrganisation,
} from "@/constants/addDetails";
import { Button, TextInput, Select, Checkbox } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { isEmail, isNotEmpty, useForm } from "@mantine/form";

type BasicDetailField = {
  pan: string;
  nameOnPan: string | undefined;
  typeOfOrganisation: TypeOfOrganisation;
  dob: string;
  email: string;
  mobile: string;
  socialCategory: SocialCategory;
  gender: Gender;
  speciallyAbled: boolean;
};

type BasicDetailFormProps = BasicDetailField & {
  onSubmit: (values: BasicDetailField) => void;
};

const BasicDetailForm = ({
  pan,
  nameOnPan,
  typeOfOrganisation,
  dob,
  email,
  mobile,
  socialCategory,
  gender,
  speciallyAbled,
  onSubmit,
}: BasicDetailFormProps) => {
  const form = useForm({
    initialValues: {
      pan: pan,
      nameOnPan: nameOnPan,
      typeOfOrganisation: typeOfOrganisation,
      dob: dob,
      email: email,
      mobile: mobile,
      socialCategory: socialCategory,
      gender: gender,
      speciallyAbled: speciallyAbled,
    },
    validate: {
      pan: (value) => {
        if (
          !/^[A-Za-z]{3}[ABCFGHJLPTabcfghjlpt]{1}[A-Za-z]{1}[0-9]{4}[A-Za-z]{1}$/.test(
            value
          )
        ) {
          return "Invalid PAN number.";
        }
        return null;
      },
      nameOnPan: isNotEmpty("Required."),
      dob: isNotEmpty("Required."),
      email: isEmail("Invalid Email."),
      mobile: (value) => {
        if (!/^\d{10}$/.test(value)) {
          return "Invalid Mobile.";
        }
        return null;
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
      <TextInput
        required
        className="w-full"
        label="PAN Number"
        placeholder="PAN Number"
        {...form.getInputProps("pan")}
        mb={16}
      />

      <TextInput
        required
        className="w-full"
        label="Name on PAN"
        placeholder="Name on PAN"
        {...form.getInputProps("nameOnPan")}
        mb={16}
      />

      <Select
        required
        className="w-full"
        label="Type of organisation"
        placeholder="Type of organisation"
        {...form.getInputProps("typeOfOrganisation")}
        mb={16}
        data={Object.values(TypeOfOrganisation)}
      />

      <DateInput
        required
        className="w-full"
        label="Date of birth"
        placeholder="Date of birth"
        valueFormat="YYYY-MM-DD"
        value={form.values.dob ? new Date(form.values.dob) : undefined}
        onChange={(date) =>
          form.setFieldValue(
            "dob",
            date ? date.toISOString().split("T")[0] : ""
          )
        }
        mb={16}
      />

      <TextInput
        required
        className="w-full"
        label="Email"
        placeholder="Email"
        {...form.getInputProps("email")}
        mb={16}
      />

      <TextInput
        required
        className="w-full"
        label="Mobile"
        placeholder="Mobile"
        {...form.getInputProps("mobile")}
        mb={16}
      />

      <Select
        required
        className="w-full"
        label="Social Category"
        placeholder="Social Category"
        {...form.getInputProps("socialCategory")}
        mb={16}
        mr={16}
        data={Object.values(SocialCategory)}
      />

      <Select
        required
        className="w-full"
        label="Gender"
        placeholder="Gender"
        {...form.getInputProps("gender")}
        mb={16}
        mr={16}
        data={Object.values(Gender)}
      />

      <Checkbox
        required
        className="w-full"
        label="Specially Abled"
        {...form.getInputProps("speciallyAbled", {
          type: "checkbox",
        })}
        mb={16}
      />

      <Button type="button" onClick={handleSubmit} fullWidth>
        Submit
      </Button>
    </form>
  );
};

export default BasicDetailForm;
