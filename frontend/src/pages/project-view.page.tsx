import React, { useEffect, useState } from 'react';
import { Notification, Params, Project } from '../types';
import { Loader } from '../components/loader.component';
import { NotificationComponent } from '../components/notification.component';
import { Box, Flex, FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { useProject } from '../hooks';
import { ErrorPage } from '../components';
import { useParams } from 'react-router-dom';

export const ProjectViewPage = () => {
  const [notification, setNotification] = useState<Notification | undefined>(undefined);

  const { id } = useParams<Params>();

  const { loading, error, project, handleGetSingleProject } = useProject();

  useEffect(() => {
    id && handleGetSingleProject(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (error) {
      setNotification({
        status: 'error',
        error: error.message || undefined
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  return (
    <>
      {notification && <NotificationComponent notification={notification} />}
      {loading ? (
        <Loader />
      ) : error || !project ? (
        <ErrorPage />
      ) : (
        <SingleProjectViewComponent project={project} />
      )}
    </>
  );
};

interface SingleProjectViewComponentProps {
  project: Project;
}

const SingleProjectViewComponent = ({ project }: SingleProjectViewComponentProps) => {
  return (
    <Flex minW={'none'} w={'full'} bg="light" align="center" justify="center" p={10}>
      <Box bg="white" p={6} rounded="md" w={'100vw'} boxShadow={'md'}>
        <Formik
          initialValues={{
            // @ts-ignore
            title: project.title,
            requirements: [],
            description: '',
            how_to_apply: ''
          }}
          onSubmit={() => console.log('hi')}
        >
          {({ values, errors, touched, setFieldValue, isSubmitting }) => (
            <Form>
              <Field name="title">
                {({ field }: any) => (
                  <FormControl isInvalid={!!errors.title && touched.title}>
                    <FormLabel htmlFor="title">Title</FormLabel>

                    <Box as="i">{project.title}</Box>
                  </FormControl>
                )}
              </Field>
              <Field name="requirements">
                {({ field }: any) => (
                  <FormControl isInvalid={!!errors.requirements && !!touched.requirements}>
                    <FormLabel htmlFor="requirements">Requirements</FormLabel>
                    <Box as="i">{project.requirements}</Box>
                    <FormErrorMessage>{errors.requirements}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="description">
                {({ field }: any) => (
                  <FormControl isInvalid={!!errors.description && touched.description}>
                    <FormLabel htmlFor="description">Description</FormLabel>
                    <Box as="i">{project.description}</Box>
                  </FormControl>
                )}
              </Field>
              <Field name="how_to_apply">
                {({ field }: any) => (
                  <FormControl isInvalid={!!errors.how_to_apply && touched.how_to_apply}>
                    <FormLabel htmlFor="how_to_apply">How to apply (contact data)</FormLabel>
                    <Box as="i">{project.how_to_apply}</Box>
                  </FormControl>
                )}
              </Field>
            </Form>
          )}
        </Formik>
      </Box>
    </Flex>
  );
};
