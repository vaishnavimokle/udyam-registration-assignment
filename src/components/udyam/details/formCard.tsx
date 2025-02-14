import { Card, Group, ActionIcon, Text } from "@mantine/core";
import { ReactNode } from "react";
import { TbEdit } from "react-icons/tb";

type FormCardProps = {
  title: string;
  children: ReactNode;
  onEditClick: () => void;
};

const FormCard = ({ title, children, onEditClick }: FormCardProps) => {
  return (
    <Card shadow="sm" padding="xl">
      <Group justify="space-between" mb="xs">
        <Text fw={500}>{title}</Text>

        <ActionIcon
          variant="transparent"
          aria-label="Edit"
          onClick={onEditClick}
        >
          <TbEdit />
        </ActionIcon>
      </Group>

      {children}
    </Card>
  );
};

export default FormCard;
