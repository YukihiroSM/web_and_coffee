import React, { useEffect, useState } from 'react';

import {
  FormLabel,
  Input,
  InputProps,
  Box,
  Button,
  Heading,
  Text,
  Textarea,
  FormControl,
  FormErrorMessage
} from '@chakra-ui/react';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import * as Yup from 'yup';

import { Formik, FieldArray, Field, FieldProps } from 'formik';

import ReactSelect from 'react-select';
import { useUser } from '../hooks';
import { REQUIREMENTS_OPTIONS } from '../constants';
import { Loader, NotificationComponent } from '../components';
import { CreateResume } from '../types';

const validationSchema = Yup.object({
  username: Yup.string().email('Invalid email').required('Email is required'),
  about: Yup.string().required('About is required'),
  skills: Yup.array()
    .of(Yup.string())
    .min(1, 'At least one skill is required')
    .required('Skills are required'),
  contact: Yup.string().required('Contact is required')
});

interface TextInputProps extends InputProps {
  label: string;
}

interface DatePickerFieldProps extends FieldProps {
  label: string;
}

interface ExperienceItemProps {
  index: number;
  onDelete: (index: number) => void;
}

interface EducationItemProps {
  index: number;
  onDelete: (index: number) => void;
}

interface Props {
  handleCreateUserResume: any;
  resume: CreateResume | null;
}

export const UserResumePage = () => {
  const { handleCreateUserResume, handleGetUserResume, loading, error, success, resume } =
    useUser();
  const [notification, setNotification] = useState<any>(undefined);

  useEffect(() => {
    handleGetUserResume();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (success) {
      setNotification({
        status: 'success',
        success: 'Resume added!'
      });
    }
    if (error) {
      setNotification({
        status: 'error',
        error: error.message || undefined
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, success]);
  return (
    <>
      {notification && <NotificationComponent notification={notification} />}
      {loading && <Loader />}
      {resume && (
        <ResumeFormComponent resume={resume} handleCreateUserResume={handleCreateUserResume} />
      )}
    </>
  );
};

const TextInput = ({ label, ...inputProps }: TextInputProps) => {
  return (
    <div>
      <FormLabel>{label}</FormLabel>
      <Input {...inputProps} />
    </div>
  );
};

const DatePickerField = ({ field, form, label, meta }: DatePickerFieldProps) => {
  const handleChange = (date: Date) => {
    form.setFieldValue(field.name, date);
  };

  return (
    <div>
      <FormLabel>{label}</FormLabel>
      <DatePicker
        selected={field.value}
        onChange={handleChange}
        dateFormat="dd/MM/yyyy"
        showYearDropdown
        showMonthDropdown
        dropdownMode="select"
        className="custom-datepicker"
      />
    </div>
  );
};

const ExperienceItem = ({ index, onDelete }: ExperienceItemProps) => {
  const handleDelete = () => {
    onDelete(index);
  };

  return (
    <Box borderWidth="1px" borderRadius="lg" p="4" mb={4}>
      <Text fontWeight="bold">Experience Item {index + 1}</Text>
      <Field name={`experience[${index}].company`} label="Company">
        {({ field, form }: FieldProps) => <TextInput label="Company" {...field} />}
      </Field>
      <Field name={`experience[${index}].position`} label="Position">
        {({ field, form }: FieldProps) => <TextInput label="Position" {...field} />}
      </Field>
      <Field name={`experience[${index}].start`} label="Start Date">
        {({ field, form, meta }: FieldProps) => (
          <DatePickerField label="Start Date" field={field} form={form} meta={meta} />
        )}
      </Field>
      <Field name={`experience[${index}].end`} label="End Date">
        {({ field, form, meta }: FieldProps) => (
          <DatePickerField meta={meta} label="End Date" field={field} form={form} />
        )}
      </Field>
      <Field name={`experience[${index}].employment`} label="Employment Type">
        {({ field, form }: FieldProps) => <TextInput label="Employment Type" {...field} />}
      </Field>
      <Field name={`experience[${index}].place`} label="Place">
        {({ field, form }: FieldProps) => <TextInput label="Place" {...field} />}
      </Field>
      <Field name={`experience[${index}].description`} label="Description">
        {({ field, form }: FieldProps) => <TextInput label="Description" {...field} />}
      </Field>
      <button onClick={handleDelete}>Delete Experience Item</button>
    </Box>
  );
};

const EducationItem = ({ index, onDelete }: EducationItemProps) => {
  const handleDelete = () => {
    onDelete(index);
  };

  return (
    <Box borderWidth="1px" borderRadius="lg" p="4" mb={4}>
      <Text fontWeight="bold">Education Item {index + 1}</Text>
      <Field name={`education[${index}].title`} label="Title">
        {({ field, form }: FieldProps) => <TextInput label="Title" {...field} />}
      </Field>
      <Field name={`education[${index}].degree`} label="Degree">
        {({ field, form }: FieldProps) => <TextInput label="Degree" {...field} />}
      </Field>
      <Field name={`education[${index}].place`} label="Place">
        {({ field, form }: FieldProps) => <TextInput label="Place" {...field} />}
      </Field>
      <Field name={`education[${index}].start`} label="Start Date">
        {({ field, form, meta }: FieldProps) => (
          <DatePickerField field={field} form={form} meta={meta} label="Start Date" />
        )}
      </Field>
      <Field name={`education[${index}].end`} label="End Date">
        {({ field, form, meta }: FieldProps) => (
          <DatePickerField label="End Date" field={field} form={form} meta={meta} />
        )}
      </Field>
      <button onClick={handleDelete}>Delete Education Item</button>
    </Box>
  );
};

const ResumeFormComponent = ({ handleCreateUserResume, resume }: Props) => {
  return (
    <Box w={'full'} px={20} py={10}>
      <Heading mb="4">My Resume</Heading>
      <Formik
        initialValues={
          resume || {
            username: '',
            about: '',
            skills: [],
            contact: '',
            experience: [],
            education: []
          }
        }
        validationSchema={validationSchema}
        onSubmit={handleCreateUserResume}
      >
        {({ values, handleSubmit, setFieldValue, errors, touched }) => (
          <form onSubmit={handleSubmit}>
            <FormControl isInvalid={!!errors.username && touched.username}>
              <FormLabel htmlFor="username">Email</FormLabel>
              <Field as={Input} id="username" name="username" type="text" />
              <FormErrorMessage>{errors.username}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.about && touched.about}>
              <FormLabel htmlFor="about">About</FormLabel>
              <Field as={Textarea} type="text" id="about" name="about" />
              <FormErrorMessage>{errors.about}</FormErrorMessage>
            </FormControl>
            <Field name="skills">
              {({ field }: any) => (
                <FormControl isInvalid={!!errors.skills && !!touched.skills}>
                  <FormLabel htmlFor="skills">Skills</FormLabel>
                  <ReactSelect
                    isMulti
                    defaultValue={REQUIREMENTS_OPTIONS.filter((skill) =>
                      resume?.skills?.find((x) => x === skill.value)
                    )}
                    options={REQUIREMENTS_OPTIONS}
                    onChange={(selected) =>
                      setFieldValue(
                        'skills',
                        selected ? selected.map((option) => option.value) : []
                      )
                    }
                  />
                  <FormErrorMessage>{errors.skills?.toString()}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <FormControl isInvalid={!!errors.contact && touched.contact}>
              <FormLabel htmlFor="contact">Contact</FormLabel>
              <Field as={Textarea} type="text" id="contact" name="contact" />
              <FormErrorMessage>{errors.contact}</FormErrorMessage>
            </FormControl>
            <FieldArray name="experience">
              {({ push, remove }) => (
                <Box mb="4">
                  <Text mb="2">Experience</Text>
                  {values?.experience?.map((_, index) => (
                    <ExperienceItem
                      key={index}
                      index={index}
                      onDelete={(index: number) => remove(index)}
                    />
                  ))}
                  <Button type="button" onClick={() => push({})}>
                    Add Experience Item
                  </Button>
                </Box>
              )}
            </FieldArray>
            <FieldArray name="education">
              {({ push, remove }) => (
                <Box mb="4">
                  <Text mb="2">Education</Text>
                  {values?.education?.map((_, index) => (
                    <EducationItem
                      key={index}
                      index={index}
                      onDelete={(index: number) => remove(index)}
                    />
                  ))}
                  <Button type="button" onClick={() => push({})}>
                    Add Education Item
                  </Button>
                </Box>
              )}
            </FieldArray>
            <Button
              w={'full'}
              transition={'all .5s ease'}
              fontSize={{ sm: 'sm', md: 'md' }}
              fontWeight={600}
              color={'white'}
              bg={'attention.dark'}
              _hover={{
                bg: 'attention.light'
              }}
              type={'submit'}
            >
              Submit
            </Button>
          </form>
        )}
      </Formik>
    </Box>
  );
};
