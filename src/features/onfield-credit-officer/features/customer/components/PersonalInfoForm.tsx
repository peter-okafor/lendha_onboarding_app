import {
  DropzoneFileUpload,
  FormControlLabel,
  FormDatePicker,
  FormInput,
  FormLeftAddonInput,
  NextCancelButton
  // PasswordInput
} from '@/components/common';
import { dateInSlashFormat } from '@/utils/helpers';
import { Grid, GridItem, Stack, Text, useMediaQuery } from '@chakra-ui/react';
import { Form, FormikProps, FormikProvider } from 'formik';
import { useState } from 'react';
import { PersonalInfoFormValues } from '../types';

interface Props {
  onBack: () => void;
  formik: FormikProps<PersonalInfoFormValues>;
}
const PersonalInfoForm = ({ formik, ...props }: Props) => {
  const { values, errors, touched, handleChange, setFieldValue } = formik;

  const [dateOfBirth, setDateOfBirth] = useState(new Date());
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
            id='email'
            label='Email address'
            name='email'
            value={values.email}
            handleChange={handleChange}
            errorMessage={errors.email}
            touchedField={touched.email}
          />
          <FormLeftAddonInput
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
          {/* <PasswordInput
            name='password'
            id='password'
            label='Create password'
            value={values.password}
            errorMessage={errors.password}
            handleChange={handleChange}
            touchedField={touched.password}
          />
          <PasswordInput
            name='confirmPassword'
            id='confirm-password'
            label='Confirm password'
            value={values.confirmPassword}
            errorMessage={errors.confirmPassword}
            handleChange={handleChange}
            touchedField={touched.confirmPassword}
          /> */}
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
          <Text className='title'>Home Address</Text>
        </Stack>
        <Stack spacing={5}>
          <Grid templateColumns='repeat(4, 1fr)' gap={4} mt={5}>
            <GridItem colSpan={1}>
              <FormInput
                name='addressNumber'
                id='address-number'
                label='Number'
                errorMessage={errors.addressNumber}
                touchedField={touched.addressNumber}
                value={values.addressNumber}
                handleChange={handleChange}
              />
            </GridItem>
            <GridItem colSpan={3}>
              <FormInput
                name='streetName'
                id='street-name'
                label='Street name'
                errorMessage={errors.streetName}
                touchedField={touched.streetName}
                value={values.streetName}
                handleChange={handleChange}
              />
            </GridItem>
          </Grid>
          <FormInput
            name='nearestLandmark'
            id='nearest-landmark'
            label='Nearest Landmark'
            errorMessage={errors.nearestLandmark}
            handleChange={handleChange}
            touchedField={touched.nearestLandmark}
            value={values.nearestLandmark}
          />
          <FormInput
            name='cityTown'
            id='city-town'
            label='City/Town'
            errorMessage={errors.cityTown}
            handleChange={handleChange}
            touchedField={touched.cityTown}
            value={values.cityTown}
          />
          <Grid templateColumns='repeat(2, 1fr)' gap={4}>
            <GridItem>
              <FormInput
                name='lga'
                id='lga'
                label='L.G.A'
                errorMessage={errors.lga}
                touchedField={touched.lga}
                value={values.lga}
                handleChange={handleChange}
              />
            </GridItem>
            <GridItem>
              <FormInput
                name='state'
                id='state'
                label='State'
                errorMessage={errors.state}
                touchedField={touched.state}
                value={values.state}
                handleChange={handleChange}
              />
            </GridItem>
          </Grid>
          <DropzoneFileUpload
            name='proofOfResidence'
            setFieldValue={setFieldValue}
            label='Upload a proof of residence'
            touchedField={touched.proofOfResidence}
            errorMessage={errors.proofOfResidence}
            fileSize={5}
          />

          <Stack direction='row' spacing={3}>
            <NextCancelButton
              onCancel={props.onBack}
              showCancelBtn={isLargerThan810 ? false : true}
            />
          </Stack>
        </Stack>
      </Form>
    </FormikProvider>
  );
};

export default PersonalInfoForm;
