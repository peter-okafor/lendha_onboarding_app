import {
  DropzoneFileUpload,
  FormControlLabel,
  FormError,
  FormInput,
  FormRadio,
  FormSelect,
  NextCancelButton
} from '@/components/common';
import FormTextArea from '@/components/common/input/form-textarea';
import { capitalize } from '@/utils/helpers';
import { Grid, GridItem, Stack, Text, useMediaQuery, useRadioGroup } from '@chakra-ui/react';
import { Field, Form, FormikProps, FormikProvider } from 'formik';
import { BusinessInfoFormValues } from '../types';

interface Props {
  onBack: () => void;
  formik: FormikProps<BusinessInfoFormValues>;
}
const BusinessInfoForm = ({ formik, ...props }: Props) => {
  const { values, errors, touched, handleChange, setFieldValue } = formik;

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'isBusinessRegistered',
    defaultValue: 'no',
    onChange: (e) => setFieldValue('isBusinessRegistered', e)
  });

  const group = getRootProps();

  const { getRootProps: getSourceOfIncomeProps, getRadioProps: getSourceOfIncomeRadioProps } =
    useRadioGroup({
      name: 'hasSourceOfIncome',
      defaultValue: 'no',
      onChange: (e) => setFieldValue('hasSourceOfIncome', e)
    });

  const sourceOfIncomeGroup = getSourceOfIncomeProps();

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
          <FormSelect
            label='Business category'
            name='businessCategory'
            value={values.businessCategory}
            onChange={handleChange}
            errorMessage={errors.businessCategory}
            touchedField={touched.businessCategory}
            options={[
              { value: '', label: '' },
              { value: 'trade', label: 'Trade' },
              { value: 'service', label: 'Service' },
              { value: 'production', label: 'Production' }
            ]}
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
          <FormInput
            name='facebookHandle'
            label='Facebook'
            errorMessage={errors.facebookHandle}
            handleChange={handleChange}
            touchedField={touched.facebookHandle}
            value={values.facebookHandle}
            type='text'
          />
          <FormInput
            name='twitterHandle'
            label='Twitter'
            errorMessage={errors.twitterHandle}
            handleChange={handleChange}
            touchedField={touched.twitterHandle}
            value={values.twitterHandle}
            type='text'
          />
          <FormInput
            name='instagramHandle'
            label='Instagram'
            errorMessage={errors.instagramHandle}
            handleChange={handleChange}
            touchedField={touched.instagramHandle}
            value={values.instagramHandle}
            type='text'
          />
          <Text className='title'>Business Address</Text>
        </Stack>
        <Stack spacing={5}>
          <Grid templateColumns='repeat(4, 1fr)' gap={4} mt={5}>
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
          <FormInput
            name='cityTown'
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
                label='State'
                errorMessage={errors.state}
                touchedField={touched.state}
                value={values.state}
                handleChange={handleChange}
              />
            </GridItem>
          </Grid>
          <FormControlLabel
            controlProps={{
              display: 'flex',
              flexDirection: 'column',
              gap: 4
            }}
            label='Is this business registered?'
          >
            <Stack direction='row' gap={4} spacing={4} {...group}>
              {['yes', 'no'].map((value) => {
                const radio = getRadioProps({ value });
                return (
                  <Field as={FormRadio} type='radio' key={value} {...radio} id={value}>
                    {capitalize(value)}
                  </Field>
                );
              })}
            </Stack>

            <FormError error={errors.isBusinessRegistered} touched={touched.isBusinessRegistered} />
          </FormControlLabel>
          <DropzoneFileUpload
            name='businessLocationFile'
            setFieldValue={setFieldValue}
            label='Upload a picture of where you conduct business'
            touchedField={touched.businessLocationFile}
            errorMessage={errors.businessLocationFile}
            fileSize={5}
          />
          {values.isBusinessRegistered === 'yes' && (
            <>
              <Stack spacing={5}>
                <FormInput
                  name='regNumber'
                  label='Registration number'
                  errorMessage={errors.regNumber}
                  handleChange={handleChange}
                  touchedField={touched.regNumber}
                  value={values.regNumber}
                />

                {/* <DropzoneFileUpload
                  name='certOfIncorporationFile'
                  setFieldValue={setFieldValue}
                  label='Upload your Certification of Incorporation'
                  touchedField={touched.certOfIncorporationFile}
                  errorMessage={errors.certOfIncorporationFile}
                  fileSize={5}
                />
                <DropzoneFileUpload
                  name='memorandumFile'
                  setFieldValue={setFieldValue}
                  label='Upload your Memorandum and Article of Association'
                  touchedField={touched.memorandumFile}
                  errorMessage={errors.memorandumFile}
                  fileSize={5}
                /> */}
              </Stack>
            </>
          )}
          <FormControlLabel
            controlProps={{
              display: 'flex',
              flexDirection: 'column',
              gap: 4
            }}
            label='Do you have any other source of income?'
          >
            <Stack direction='row' gap={4} spacing={4} {...sourceOfIncomeGroup}>
              {['yes', 'no'].map((value) => {
                const radio = getSourceOfIncomeRadioProps({ value });
                return (
                  <Field as={FormRadio} type='radio' key={value} {...radio} id={value}>
                    {capitalize(value)}
                  </Field>
                );
              })}
            </Stack>

            <FormError error={errors.hasSourceOfIncome} touched={touched.hasSourceOfIncome} />
          </FormControlLabel>
          {values.hasSourceOfIncome === 'yes' && (
            <FormTextArea
              label='Tell us about it'
              name='sourceOfIncomeDesc'
              value={values.sourceOfIncomeDesc}
              errorMessage={errors.sourceOfIncomeDesc}
              touchedField={touched.sourceOfIncomeDesc}
              handleChange={handleChange}
            />
          )}

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

export default BusinessInfoForm;
