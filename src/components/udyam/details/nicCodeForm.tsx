import {
  ActionIcon,
  Button,
  Text,
  TextInput,
  Group,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { TbTrash } from "react-icons/tb";

type NicCodeField = {
  nicCodes: string[];
};

type NicCodeFormProps = NicCodeField & {
  onSubmit: (values: NicCodeField) => void;
};

const NicCodeForm = ({ nicCodes, onSubmit }: NicCodeFormProps) => {
  const [nicCode, setNicCode] = useState<string>();
  const [error, setError] = useState<string>();

  const form = useForm({
    initialValues: {
      nicCodes: nicCodes,
    },
    validate: {
      nicCodes: (value) => {
        if (value.length < 1) {
          return "Minimum one NIC Code is needed";
        }
        return null;
      },
    },
    validateInputOnBlur: true,
  });

  const handleAdd = () => {
    if (nicCode && form.values.nicCodes.includes(nicCode)) {
      setError("Code is already added");
    } else if (!error) {
      form.insertListItem("nicCodes", nicCode);
      form.clearErrors();
    }
  };

  const handleSubmit = () => {
    if (!form.validate().hasErrors) {
      onSubmit(form.values);
      form.reset();
    }
  };

  const fields = form.getValues().nicCodes.map((item, index) => (
    <li className="pb-3 sm:pb-4" key={index}>
      <div className="flex items-center space-x-4 rtl:space-x-reverse">
        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
          <ActionIcon
            variant="filled"
            color="red"
            onClick={() => form.removeListItem("nicCodes", index)}
          >
            <TbTrash size={24} />
          </ActionIcon>
          <div className="flex-1 min-w-0 ml-4">
            <p className="text-md font-bold text-gray-900 truncate dark:text-white">
              {item}
            </p>
          </div>
        </div>
      </div>
    </li>
  ));

  return (
    <form>
      <TextInput
        required
        className="w-full"
        label="NIC Code"
        placeholder="NIC Code"
        mb={16}
        error={error || form.errors.nicCodes}
        onChange={(event) => setNicCode(event.currentTarget.value)}
        onBlur={(_) =>
          !nicCode || nicCode.length !== 6
            ? setError("Please enter a valid nic code.")
            : setError(undefined)
        }
      />

      <Group gap="xs" grow>
        <Button type="button" onClick={handleAdd} disabled={!nicCode} fullWidth>
          Add
        </Button>
        <Button
          type="button"
          onClick={handleSubmit}
          disabled={form.values.nicCodes.length <= 0}
          fullWidth
        >
          Submit
        </Button>
      </Group>

      {fields.length > 0 && (
        <div className="mt-4">
          <Text className="mb-4">Added Nic Codes</Text>
          <ul className="max-w-24 divide-y divide-gray-200 dark:divide-gray-700 list-none pl-0">
            {fields}
          </ul>
        </div>
      )}
    </form>
  );
};

export default NicCodeForm;
