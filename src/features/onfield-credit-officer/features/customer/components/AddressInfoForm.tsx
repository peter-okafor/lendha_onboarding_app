import { FormInput, NextCancelButton } from '@/components/common';
import { Address } from '@/types';
import { Grid, GridItem, Stack, useMediaQuery } from '@chakra-ui/react';
import { Form, FormikProps, FormikProvider } from 'formik';

interface Props {
  onBack: () => void;
  formik: FormikProps<Address>;
}
const AddressInfoForm = ({ formik, ...props }: Props) => {
  const [isLargerThan810] = useMediaQuery(`(min-width: 810px)`);
  const { values, errors, touched, handleChange, isSubmitting } = formik;

  return (
    <FormikProvider value={formik}>
      <Form>
        <Stack spacing={5}>
          <Grid templateColumns='repeat(4, 1fr)' gap={4}>
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

export default AddressInfoForm;
