import {
  ActionIcon,
  Button,
  Text,
  TextInput,
  Select,
  Table,
  TableData,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { TbTrash } from "react-icons/tb";

type UnitField = {
  units: {
    unitName: string;
    door: string;
    premises: string;
    town: string;
    block: string;
    road: string;
    city: string;
    district: string;
    state: string;
    pincode: string;
  }[];
};

type UnitFormProps = UnitField & {
  onSubmit: (values: UnitField) => void;
};

const UnitDetailForm = ({ units, onSubmit }: UnitFormProps) => {
  const form = useForm({
    initialValues: {
      units: units,
    },
    validateInputOnBlur: true,
  });

  const nestedForm = useForm({
    initialValues: {
      unitName: "",
      door: "",
      premises: "",
      town: "",
      block: "",
      road: "",
      city: "",
      district: "KOLHAPUR",
      state: "MAHARASHTRA",
      pincode: "416003",
    },
    validate: {
      unitName: isNotEmpty("Required"),
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
    validateInputOnBlur: true,
  });

  const handleAdd = () => {
    if (
      form.values.units.filter(
        (item) => item.unitName === nestedForm.values.unitName
      ).length >= 1
    ) {
      nestedForm.setFieldError("unitName", "Unit is already added.");
    } else if (!nestedForm.validate().hasErrors) {
      form.insertListItem("units", nestedForm.values);
      nestedForm.reset();
    }
  };

  const handleSubmit = () => {
    if (!form.validate().hasErrors) {
      onSubmit(form.values);
      form.reset();
    }
  };

  const tableData: TableData = {
    caption: "Unit location details",
    head: [
      "Unit Name",
      "Door",
      "Premises",
      "Town",
      "Block",
      "Road",
      "City",
      "District",
      "State",
      "Pincode",
      "",
    ],
    body: form
      .getValues()
      .units.map((item, index) => [
        item.unitName,
        item.door,
        item.premises,
        item.town,
        item.block,
        item.road,
        item.city,
        item.district,
        item.state,
        item.pincode,
        <ActionIcon
          variant="filled"
          color="red"
          onClick={() => form.removeListItem("units", index)}
        >
          <TbTrash size={24} />
        </ActionIcon>,
      ]),
  };

  return (
    <div>
      <form>
        <div className="flex justify-stretch mb-4">
          <TextInput
            required
            className="w-full"
            label="Unit Name"
            placeholder="Unit Name"
            {...nestedForm.getInputProps("unitName")}
            mr={16}
          />
        </div>
        <div className="flex justify-stretch mb-4">
          <TextInput
            required
            className="w-full"
            label="Door"
            placeholder="Door"
            {...nestedForm.getInputProps("door")}
            mr={16}
          />

          <TextInput
            required
            className="w-full"
            label="Premises"
            placeholder="Premises"
            {...nestedForm.getInputProps("premises")}
            mr={16}
          />

          <TextInput
            required
            className="w-full"
            label="Town"
            placeholder="Town"
            {...nestedForm.getInputProps("town")}
          />
        </div>

        <div className="flex justify-stretch mb-4">
          <TextInput
            required
            className="w-full"
            label="Block"
            placeholder="Block"
            {...nestedForm.getInputProps("block")}
            mr={16}
          />
          <TextInput
            required
            className="w-full"
            label="Road"
            placeholder="Road"
            {...nestedForm.getInputProps("road")}
            mr={16}
          />
          <TextInput
            required
            className="w-full"
            label="City"
            placeholder="City"
            {...nestedForm.getInputProps("city")}
          />
        </div>

        <div className="flex justify-stretch mb-4">
          <Select
            required
            className="w-full"
            label="District"
            placeholder="District"
            {...nestedForm.getInputProps("district")}
            mr={16}
            data={["KOLHAPUR"]}
          />

          <Select
            required
            className="w-full"
            label="State"
            placeholder="State"
            mr={16}
            data={["MAHARASHTRA"]}
            {...nestedForm.getInputProps("state")}
          />

          <TextInput
            required
            className="w-full"
            label="Pincode"
            placeholder="Pincode"
            key={nestedForm.key("pincode")}
            {...nestedForm.getInputProps("pincode")}
          />
        </div>

        <Button
          type="button"
          onClick={handleAdd}
          disabled={form.values.units.length >= 3}
          fullWidth
        >
          Add
        </Button>
      </form>

      {form.values.units.length > 0 && (
        <Table.ScrollContainer minWidth={1024}>
            <Table className="mt-4" data={tableData} />
        </Table.ScrollContainer>
      )}

      <form className="mt-4">
        <Button type="button" onClick={handleSubmit} fullWidth>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default UnitDetailForm;
