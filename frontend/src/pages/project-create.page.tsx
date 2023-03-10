import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Textarea,
  Flex,
  Input,
} from '@chakra-ui/react';
import { useProject } from '../hooks';
import { REQUIREMENTS_OPTIONS, ROUTER_KEYS } from '../constants';
import { ErrorPage, NotificationComponent, Loader } from '../components';

const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  requirements: Yup.array()
    .min(1, 'At least one requirement is required')
    .required('Requirements are required'),
  description: Yup.string().required('Description is required'),
  how_to_apply: Yup.string().required('How to apply is required'),
});

export const UserCreateProjectPage = () => {
  const [notification, setNotification] = useState<any>(undefined);
  const { success, loading, error, handleCreateProject } = useProject();

  useEffect(() => {
    if (success) {
      setNotification({
        status: 'success',
        success: 'Project created!',
      });
      setTimeout(() => {
        window.location.href = ROUTER_KEYS.USER_PROJECTS + '?page=0&perPage=10';
      }, 250);
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
        <CreateProjectFormComponent
          handleCreateProject={handleCreateProject}
          loading={loading}
        />
      )}
    </>
  );
};

interface CreateProjectFormComponentProps {
  handleCreateProject: any;
  loading: boolean;
}

const CreateProjectFormComponent = ({
  handleCreateProject,
  loading,
}: CreateProjectFormComponentProps) => {
  return (
    <Flex
      minW={'none'}
      w={'full'}
      bg='light'
      align='center'
      justify='center'
      p={10}
    >
      <Box bg='white' p={6} rounded='md' w={'100vw'} boxShadow={'md'}>
        <Formik
          initialValues={{
            title: '',
            requirements: [],
            description: '',
            how_to_apply: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleCreateProject}
        >
          {({ values, errors, touched, setFieldValue, isSubmitting }) => (
            <Form>
              <Field name='title'>
                {({ field }: any) => (
                  <FormControl isInvalid={!!errors.title && touched.title}>
                    <FormLabel htmlFor='title'>Title</FormLabel>

                    <Box>
                      <Field
                        as={Input}
                        id='title'
                        name='title'
                        type='text'
                        {...field}
                      />
                      <FormErrorMessage>{errors.title}</FormErrorMessage>
                    </Box>
                  </FormControl>
                )}
              </Field>
              <Field name='requirements'>
                {({ field }: any) => (
                  <FormControl
                    isInvalid={!!errors.requirements && !!touched.requirements}
                  >
                    <FormLabel htmlFor='requirements'>Requirements</FormLabel>
                    <Select
                      options={REQUIREMENTS_OPTIONS}
                      isMulti
                      hideSelectedOptions={false}
                      placeholder='Select requirements'
                      onChange={(selectedOptions) =>
                        setFieldValue(
                          'requirements',
                          selectedOptions
                            ? selectedOptions.map((option) => option.value)
                            : []
                        )
                      }
                    />
                    <FormErrorMessage>{errors.requirements}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name='description'>
                {({ field }: any) => (
                  <FormControl
                    isInvalid={!!errors.description && touched.description}
                  >
                    <FormLabel htmlFor='description'>Description</FormLabel>
                    <Box>
                      <Textarea id='description' {...field} />
                      <FormErrorMessage>{errors.description}</FormErrorMessage>
                    </Box>
                  </FormControl>
                )}
              </Field>
              <Field name='how_to_apply'>
                {({ field }: any) => (
                  <FormControl
                    isInvalid={!!errors.how_to_apply && touched.how_to_apply}
                  >
                    <FormLabel htmlFor='how_to_apply'>
                      How to apply (contact data)
                    </FormLabel>
                    <Box>
                      <Textarea id='how_to_apply' {...field} />
                      <FormErrorMessage>{errors.how_to_apply}</FormErrorMessage>
                    </Box>
                  </FormControl>
                )}
              </Field>
              <Button
                mt={4}
                isLoading={loading}
                type='submit'
                color={'white'}
                bg={'attention.dark'}
                _hover={{
                  bg: 'attention.light',
                }}
                px={{ sm: 3, md: 4 }}
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Flex>
  );
};
