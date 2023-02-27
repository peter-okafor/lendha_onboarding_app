import {
  FormControlLabel,
  FormDatePicker,
  FormInput,
  FormLeftAddonInput,
  NextCancelButton
} from '@/components/common';
import { dateInSlashFormat } from '@/utils/helpers';
import { Stack, useMediaQuery } from '@chakra-ui/react';
import { subDays } from 'date-fns';
import { Form, FormikProps, FormikProvider } from 'formik';
import { useState } from 'react';
import { PersonalInfoFormValues } from '../types';

interface Props {
  onBack: () => void;
  formik: FormikProps<PersonalInfoFormValues>;
}
const PersonalInfoForm = ({ formik, ...props }: Props) => {
  const { values, errors, touched, handleChange, setFieldValue, isSubmitting } = formik;

  const [dateOfBirth, setDateOfBirth] = useState(subDays(new Date(), 6570));
  const handleOnDateOfBirth = (date: Date) => {
    setDateOfBirth(date);
    setFieldValue('dateOfBirth', dateInSlashFormat(date));
  };

  const [isLargerThan810] = useMediaQuery(`(min-width: 810px)`);

  return (
    <FormikProvider value={formik}>
      <Form>
        <Stack spacing={5}>
          <FormInput
            label='First name'
            id='first-name'
            name='firstName'
            value={values.firstName}
            handleChange={handleChange}
            errorMessage={errors.firstName}
            touchedField={touched.firstName}
          />
          <FormInput
            id='last-name'
            label='Last name'
            name='lastName'
            value={values.lastName}
            handleChange={handleChange}
            errorMessage={errors.lastName}
            touchedField={touched.lastName}
          />
          <FormInput
            label='Business name'
            id='business-name'
            name='businessName'
            value={values.businessName}
            handleChange={handleChange}
            errorMessage={errors.businessName}
            touchedField={touched.businessName}
          />
          <FormInput
            id='email'
            label='Email address'
            name='email'
            value={values.email}
            handleChange={handleChange}
            errorMessage={errors.email}
            touchedField={touched.email}
          />
          <FormLeftAddonInput
            // addonText='+234'
            errorMessage={errors.phone}
            handleChange={handleChange}
            inputProps={{
              name: 'phone',
              id: 'phone',
              maxLength: 11,
              inputMode: 'tel'
            }}
            label='Phone number'
            touchedField={touched.phone}
            value={values.phone}
          />
          <FormControlLabel
            textProps={{
              htmlFor: 'date-of-birth'
            }}
            controlProps={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              sx: {
                input: {
                  bgColor: 'transparent !important',
                  borderColor: 'gray.100 !important'
                }
              }
            }}
            label='Date of birth'
          >
            <FormDatePicker
              errorMessage={errors.dateOfBirth}
              touched={touched.dateOfBirth}
              inputProps={{
                name: 'dateOfBirth',
                id: 'date-of-birth',
                value: values.dateOfBirth,
                placeholder: 'DD/MM/YYYY'
              }}
              selected={dateOfBirth}
              onChange={handleOnDateOfBirth}
            />
          </FormControlLabel>

          <NextCancelButton
            isSubmitting={isSubmitting}
            onCancel={props.onBack}
            showCancelBtn={isLargerThan810 ? false : true}
          />
        </Stack>
      </Form>
    </FormikProvider>
  );
};

export default PersonalInfoForm;
