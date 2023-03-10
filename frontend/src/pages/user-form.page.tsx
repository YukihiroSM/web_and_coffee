import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Select from 'react-select';

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
  Stack,
} from '@chakra-ui/react';
import { Field, Formik } from 'formik';
import { Notification } from '../types';
import { NotificationComponent, Loader, ErrorPage } from '../components';
import { useAuth } from '../hooks';
import {
  REQUIREMENTS_OPTIONS,
  ROUTER_KEYS,
  POSITION_OPTIONS,
} from '../constants';

const registerSchema = Yup.object({
  username: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must contain at least 8 characters')
    .required('Enter your password'),
  confirmPassword: Yup.string()
    .required('Confirm your password')
    .oneOf([Yup.ref('password')], 'Passwords do not match'),
  first_name: Yup.string()
    .min(2, 'Name must contain at least 2 characters')
    .required('Enter your First name'),
  last_name: Yup.string()
    .min(2, 'Surname must contain at least 2 characters')
    .required('Enter your Last name'),
  position: Yup.array()
    .min(1, 'At least one position is required')
    .required('Choose your positions'),
  skills: Yup.array()
    .min(1, 'At least one skill is required')
    .required('Choose your skills'),
});

const loginSchema = Yup.object({
  username: Yup.string().email('Invalid email').required('Email is required'),
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
        confirmPassword: string;
        first_name: string;
        last_name: string;
        position: string[];
        skills: string[];
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
    first_name?: string;
    last_name?: string;
    position?: string[];
    skills?: string[];
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
            first_name: '',
            last_name: '',
            position: [],
            skills: [],
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
        error: error.message || undefined,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, success]);

  return (
    <>
      {notification && <NotificationComponent notification={notification} />}
      {loading && <Loader />}
      {error ? (
        <ErrorPage />
      ) : (
        <UserFormComponent action={action} loading={loading} />
      )}
    </>
  );
};

interface UserFormComponentProps {
  action: Action;
  loading: boolean;
}

const UserFormComponent = ({ action, loading }: UserFormComponentProps) => {
  return (
    <Flex
      minW={'none'}
      w={'full'}
      bg='light'
      align='center'
      justify='center'
      h={'full'}
      p={5}
    >
      <Box bg='white' p={6} rounded='md' w={'3xl'} boxShadow={'md'}>
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
          onSubmit={({
            username,
            password,
            first_name,
            last_name,
            position,
            skills,
          }) => {
            action.mutation(
              action.type === 'login'
                ? { username, password }
                : {
                    username,
                    password,
                    first_name,
                    last_name,
                    position,
                    skills,
                  }
            );
          }}
        >
          {({ handleSubmit, errors, touched, setFieldValue }) => (
            <form onSubmit={handleSubmit}>
              <VStack spacing={4} align='flex-start'>
                <FormControl isInvalid={!!errors.username && touched.username}>
                  <FormLabel htmlFor='username'>Email</FormLabel>
                  <Field
                    as={Input}
                    id='username'
                    name='username'
                    type='text'
                    variant='filled'
                  />
                  <FormErrorMessage>{errors.username}</FormErrorMessage>
                </FormControl>

                {action.type === 'register' && (
                  <>
                    <Stack
                      spacing={5}
                      w={'full'}
                      direction={'row'}
                      alignItems={'space-between'}
                    >
                      <FormControl
                        isInvalid={!!errors.first_name && touched.first_name}
                      >
                        <FormLabel htmlFor='first_name'>First name</FormLabel>
                        <Field
                          as={Input}
                          id='first_name'
                          name='first_name'
                          type='text'
                          variant='filled'
                        />
                        <FormErrorMessage>{errors.first_name}</FormErrorMessage>
                      </FormControl>
                      <FormControl
                        isInvalid={!!errors.last_name && touched.last_name}
                      >
                        <FormLabel htmlFor='last_name'>Last name</FormLabel>
                        <Field
                          as={Input}
                          id='last_name'
                          name='last_name'
                          type='text'
                          variant='filled'
                        />
                        <FormErrorMessage>{errors.last_name}</FormErrorMessage>
                      </FormControl>
                    </Stack>
                    <Field name='position'>
                      {({ field }: any) => (
                        <FormControl
                          isInvalid={!!errors.position && !!touched.position}
                        >
                          <FormLabel htmlFor='position'>Positions</FormLabel>
                          <Select
                            options={POSITION_OPTIONS}
                            isMulti
                            hideSelectedOptions={false}
                            placeholder='Select position'
                            onChange={(selectedOptions) =>
                              setFieldValue(
                                'position',
                                selectedOptions
                                  ? selectedOptions.map(
                                      (option) => option.value
                                    )
                                  : []
                              )
                            }
                          />
                          <FormErrorMessage>{errors.position}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name='skills'>
                      {({ field }: any) => (
                        <FormControl
                          isInvalid={!!errors.skills && !!touched.skills}
                        >
                          <FormLabel htmlFor='skills'>Skills</FormLabel>
                          <Select
                            options={REQUIREMENTS_OPTIONS}
                            isMulti
                            hideSelectedOptions={false}
                            placeholder='Select skills'
                            onChange={(selectedOptions) =>
                              setFieldValue(
                                'skills',
                                selectedOptions
                                  ? selectedOptions.map(
                                      (option) => option.value
                                    )
                                  : []
                              )
                            }
                          />
                          <FormErrorMessage>{errors.skills}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </>
                )}
                <Stack
                  spacing={5}
                  w={'full'}
                  direction={'row'}
                  alignItems={'space-between'}
                >
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
                </Stack>

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
  );
};
