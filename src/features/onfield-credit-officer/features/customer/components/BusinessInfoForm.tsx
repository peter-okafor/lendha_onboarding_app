import { FormInput, NextCancelButton } from '@/components/common';
import FormTextArea from '@/components/common/input/form-textarea';
import { Box, Grid, GridItem, Stack, Text, useMediaQuery } from '@chakra-ui/react';
import { Form, FormikProps, FormikProvider } from 'formik';
import { BusinessInfoFormValues } from '../types';

interface Props {
  onBack: () => void;
  formik: FormikProps<BusinessInfoFormValues>;
}
const BusinessInfoForm = ({ formik, ...props }: Props) => {
  const { values, errors, touched, handleChange, isSubmitting } = formik;

  const [isLargerThan810] = useMediaQuery(`(min-width: 810px)`);

  return (
    <FormikProvider value={formik}>
      <Form>
        <Stack spacing={5}>
          <FormInput
            name='businessName'
            label='Business name'
            errorMessage={errors.businessName}
            handleChange={handleChange}
            touchedField={touched.businessName}
            value={values.businessName}
            type='text'
          />
          <FormInput
            name='email'
            label='Email'
            errorMessage={errors.email}
            handleChange={handleChange}
            touchedField={touched.email}
            value={values.email}
            type='text'
          />
          <FormTextArea
            id='business-desc'
            name='businessDesc'
            label='Tell us more about your business'
            errorMessage={errors.businessDesc}
            handleChange={handleChange}
            touchedField={touched.businessDesc}
            value={values.businessDesc}
          />
        </Stack>
        <Stack spacing={5} mt={5}>
          <Box>
            <Text className='title'>Business Address</Text>
          </Box>
          <Grid templateColumns='repeat(4, 1fr)' gap={4}>
            <GridItem colSpan={1}>
              <FormInput
                name='addressNumber'
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
            label='Nearest Landmark'
            errorMessage={errors.nearestLandmark}
            handleChange={handleChange}
            touchedField={touched.nearestLandmark}
            value={values.nearestLandmark}
          />

          <Grid templateColumns='repeat(2, 1fr)' gap={4}>
            <GridItem>
              <FormInput
                name='state'
                label='State'
                errorMessage={errors.state}
                touchedField={touched.state}
                value={values.state}
                handleChange={handleChange}
              />
            </GridItem>
            <GridItem>
              <FormInput
                name='cityTown'
                label='City/Town'
                errorMessage={errors.cityTown}
                handleChange={handleChange}
                touchedField={touched.cityTown}
                value={values.cityTown}
              />
            </GridItem>
          </Grid>

          <Stack direction='row' spacing={3}>
            <NextCancelButton
              isSubmitting={isSubmitting}
              onCancel={props.onBack}
              showCancelBtn={isLargerThan810 ? false : true}
            />
          </Stack>
        </Stack>
      </Form>
    </FormikProvider>
  );
};

export default BusinessInfoForm;
