import React from 'react';
import ScreenLayout from "@/components/layouts/screenLayout";
import { useRouter } from "next/router";
import { Card, Text } from '@mantine/core';

export default function FailurePage() {
  const router = useRouter();
  const { message } = router.query;

  return (
    <ScreenLayout title="Failure Page" headerTitle="Failure">
      <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Card 
          shadow="sm" 
          radius="md" 
          padding="lg"
          style={{ maxWidth: 400, width: '100%' }}
        >
          <Text 
            size="xl" 
            fw={600} 
            ta="center" 
            c="red.6"
          >
            {message || "Failure"}
          </Text>
        </Card>
      </div>
    </ScreenLayout>
  );
}