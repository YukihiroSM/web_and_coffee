import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import * as Yup from 'yup';

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Tab,
  TabList,
  Tabs,
  VStack,
  Link,
} from '@chakra-ui/react';
import { Field, Formik } from 'formik';
import { Loader } from './loader.component';
import { Notification } from '../types';
import { NotificationComponent } from './notification.component';
import { useAuth } from '../hooks';
import { ROUTER_KEYS } from '../constants';

const registerSchema = Yup.object({
  username: Yup.string()
    .min(4, 'Username must contain at least 4 characters')
    .required('Username is required'),
  password: Yup.string()
    .min(8, 'Password must contain at least 8 characters')
    .required('Enter your password'),
  confirmPassword: Yup.string()
    .required('Confirm your password')
    .oneOf([Yup.ref('password')], 'Passwords do not match'),
});

const loginSchema = Yup.object({
  username: Yup.string()
    .min(4, 'Username must contain at least 4 characters')
    .required('Username is required'),
  password: Yup.string()
    .min(8, 'Password must contain at least 8 characters')
    .required('Enter your password'),
});

type Action = {
  type: string;
  schema:
    | Yup.ObjectSchema<{
        username: string;
        password: string;
        confirmPassword?: string;
      }>
    | Yup.ObjectSchema<{
        username: string;
        password: string;
      }>;
  mutation: Function;
  index: number;
  initialValues: {
    username: string;
    password: string;
    confirmPassword?: string;
  };
};

export const UserFormPage = () => {
  const [notification, setNotification] = useState<Notification | undefined>(
    undefined
  );
  const location = useLocation();
  const { success, loading, error, handleRegister, handleLogin } = useAuth();

  const [action] = useState<Action>(
    location.pathname.includes('register')
      ? {
          type: 'register',
          schema: registerSchema,
          mutation: handleRegister,
          index: 1,
          initialValues: {
            username: '',
            password: '',
            confirmPassword: '',
          },
        }
      : {
          type: 'login',
          schema: loginSchema,
          mutation: handleLogin,
          index: 0,
          initialValues: {
            username: '',
            password: '',
          },
        }
  );

  useEffect(() => {
    if (success) {
      setNotification({
        status: 'success',
        success:
          action.type === 'register'
            ? 'Account created!'
            : 'Logged in successfully!',
      });
      window.location.href = '/';
    }
    if (error) {
      setNotification({
        status: 'error',
        error: error || undefined,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, success]);

  return (
    <>
      {notification && <NotificationComponent notification={notification} />}
      {loading && <Loader />}
      <Flex
        minW={'none'}
        w={'full'}
        bg='light'
        align='center'
        justify='center'
        h={action.type === 'register' ? '72vh' : '60vh'}
      >
        <Box bg='white' p={6} rounded='md' w={'lg'} boxShadow={'md'}>
          <Tabs
            textStyle={'body2Semi'}
            defaultIndex={action.index}
            isFitted
            variant='enclosed'
          >
            <TabList mb='1em'>
              <Tab
                as={Link}
                href={ROUTER_KEYS.USER_LOGIN}
                _selected={{
                  bg: 'gray.50',
                  color: 'attention.dark',
                  border: 0.5,
                  borderBottom: 0,
                  borderStyle: 'solid',
                  borderColor: 'gray.300',
                }}
                _hover={{
                  textDecoration: 'none',
                }}
                value='login'
              >
                Sign in
              </Tab>
              <Tab
                as={Link}
                href={ROUTER_KEYS.USER_REGISTER}
                _selected={{
                  bg: 'gray.50',
                  color: 'attention.dark',
                  border: 0.5,
                  borderBottom: 0,
                  borderStyle: 'solid',
                  borderColor: 'gray.300',
                }}
                _hover={{
                  textDecoration: 'none',
                }}
                value='register'
              >
                Sign up
              </Tab>
            </TabList>
          </Tabs>
          <Formik
            validationSchema={action.schema}
            initialValues={action.initialValues}
            onSubmit={({ username, password }) => {
              action.mutation({ username, password });
            }}
          >
            {({ handleSubmit, errors, touched }) => (
              <form onSubmit={handleSubmit}>
                <VStack spacing={4} align='flex-start'>
                  <FormControl
                    isInvalid={!!errors.username && touched.username}
                  >
                    <FormLabel htmlFor='username'>Username</FormLabel>
                    <Field
                      as={Input}
                      id='username'
                      name='username'
                      type='text'
                      variant='filled'
                    />
                    <FormErrorMessage>{errors.username}</FormErrorMessage>
                  </FormControl>
                  <FormControl
                    isInvalid={!!errors.password && touched.password}
                  >
                    <FormLabel htmlFor='password'>Password</FormLabel>
                    <Field
                      as={Input}
                      id='password'
                      name='password'
                      type='password'
                      variant='filled'
                    />
                    <FormErrorMessage>{errors.password}</FormErrorMessage>
                  </FormControl>
                  {action.type === 'register' && (
                    <FormControl
                      isInvalid={
                        !!errors.confirmPassword && touched.confirmPassword
                      }
                    >
                      <FormLabel htmlFor='confirmPassword'>
                        Confirm password
                      </FormLabel>
                      <Field
                        as={Input}
                        id='confirmPassword'
                        name='confirmPassword'
                        type='password'
                        variant='filled'
                      />
                      <FormErrorMessage>
                        {errors.confirmPassword}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                  <Button
                    isLoading={loading}
                    type='submit'
                    bg={'attention.dark'}
                    color={'white'}
                    _hover={{
                      bg: 'attention.light',
                    }}
                    width='full'
                  >
                    {action.type === 'register' ? 'Sign up' : 'Sign in'}
                  </Button>
                </VStack>
              </form>
            )}
          </Formik>
        </Box>
      </Flex>
    </>
  );
};
