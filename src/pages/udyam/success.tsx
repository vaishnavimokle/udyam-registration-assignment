import React from 'react';
import ScreenLayout from "@/components/layouts/screenLayout";
import { useRouter } from "next/router";
import { Card, Text } from '@mantine/core';

export default function SuccessPage() {
  const router = useRouter();
  const { message } = router.query;

  return (
    <ScreenLayout title="Success Page" headerTitle="Success">
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
            c="green.6"
          >
            {message || "SUCCESS"}
          </Text>
        </Card>
      </div>
    </ScreenLayout>
  );
}