import { useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Notification } from '../types';

type Props = {
  notification: Notification | undefined;
};

export const NotificationComponent = ({ notification }: Props) => {
  const toast = useToast();
  const [statusDefault] = useState<any>({
    info: {
      title: 'Nothing found',
      description: notification?.error,
    },
    error: {
      title: 'Something went wrong...',
      description: notification?.error,
    },
    success: {
      title: notification?.success,
      description: undefined,
    },
  });

  useEffect(() => {
    if (notification) {
      toast({
        title: statusDefault[notification.status as string].title,
        description: statusDefault[notification.status as string].description,
        status: notification.status,
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notification]);
  return <></>;
};
