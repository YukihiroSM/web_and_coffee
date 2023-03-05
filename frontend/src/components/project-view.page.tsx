import React, {useEffect, useState} from 'react';
import {Notification} from '../types';
import {Loader} from './loader.component';
import {NotificationComponent} from './notification.component';
import {Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Input, Textarea} from "@chakra-ui/react";
import {Field, Form, Formik} from "formik";
import Select from "react-select";
import {REQUIREMENTS_OPTIONS} from "../constants";

export const ProjectView = () => {
    const [notification, setNotification] = useState<Notification | undefined>(
        undefined
    );
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const pathname = window.location.pathname.split("/");
    const projectId = pathname[pathname.length - 1];
    const [project, setProject] = useState({
        "title": '',
        "requirements": '',
        "description": '',
        "how_to_apply": '',
    });

    useEffect(() => {
        const project = {
            id: '3',
            admin: 'Mark Johnson',
            title: 'Project C',
            requirements: ['Java', 'Spring Boot', 'MySQL'],
            feedback: [
                {
                    score: 10,
                    comment:
                        'Absolutely loved this project, would work on it again anytime!',
                },
                {
                    score: 9,
                    comment: 'Great team and admin, highly recommended.',
                },
            ],
            status: 'Active',
            members: [
                {
                    first_name: 'Emily',
                    position: 'Backend Developer',
                },
                {
                    first_name: 'Frank',
                    position: 'QA Engineer',
                },
            ],
            rating: 5,
            description: 'This is the third project',
            how_to_apply: 'Apply on our website at www.example.com',
        }  // projectService.getProjectById(projectId);
        setLoading(false);
        // @ts-ignore
        setProject(project);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [projectId]);

    useEffect(() => {
        if (error) {
            setNotification({
                status: 'error',
                error: error || undefined,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error]);

    return (
        <>
            {notification && <NotificationComponent notification={notification}/>}
            {loading && <Loader/>}
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
                            // @ts-ignore
                            title: project.title,
                            requirements: [],
                            description: '',
                            how_to_apply: '',
                        }}
                        onSubmit={() => console.log('hi')}
                    >
                        {({values, errors, touched, setFieldValue, isSubmitting}) => (
                            <Form>
                                <Field name='title'>
                                    {({field}: any) => (
                                        <FormControl isInvalid={!!errors.title && touched.title}>
                                            <FormLabel htmlFor='title'>Title</FormLabel>

                                            <Box as='i'>
                                                {project.title}
                                            </Box>
                                        </FormControl>
                                    )}
                                </Field>
                                <Field name='requirements'>
                                    {({field}: any) => (
                                        <FormControl
                                            isInvalid={
                                                !!errors.requirements && !!touched.requirements
                                            }
                                        >
                                            <FormLabel htmlFor='requirements'>Requirements</FormLabel>
                                            <Box as='i'>
                                                {project.requirements}
                                            </Box>
                                            <FormErrorMessage>{errors.requirements}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                                <Field name='description'>
                                    {({field}: any) => (
                                        <FormControl
                                            isInvalid={!!errors.description && touched.description}
                                        >
                                            <FormLabel htmlFor='description'>Description</FormLabel>
                                            <Box as='i'>
                                                {project.description}
                                            </Box>
                                        </FormControl>
                                    )}
                                </Field>
                                <Field name='how_to_apply'>
                                    {({field}: any) => (
                                        <FormControl
                                            isInvalid={!!errors.how_to_apply && touched.how_to_apply}
                                        >
                                            <FormLabel htmlFor='how_to_apply'>
                                                How to apply (contact data)
                                            </FormLabel>
                                            <Box as='i'>
                                                {project.how_to_apply}
                                            </Box>
                                        </FormControl>
                                    )}
                                </Field>
                            </Form>
                        )}
                    </Formik>
                </Box>
            </Flex>
        </>
    );
};
