import React from 'react';
import { Flex, Text, Icon } from '@chakra-ui/react';
import { FiAlertTriangle } from 'react-icons/fi';

export const ErrorPage = () => {
  return (
    <Flex
      direction='column'
      alignItems='center'
      justifyContent='center'
      h='100vh'
    >
      <Icon as={FiAlertTriangle} color='red.500' boxSize={10} mb={5} />
      <Text fontSize='2xl' fontWeight='bold' mb={5}>
        Oops! Something went wrong.
      </Text>
      <Text fontSize='lg' textAlign='center' mb={10}>
        We're sorry, but it looks like there was an error processing your
        request.
      </Text>
      <img
        src='https://media.giphy.com/media/3o6ZtpbH8UWXW3pFtu/giphy.gif'
        alt='Sad cat gif'
      />
    </Flex>
  );
};
