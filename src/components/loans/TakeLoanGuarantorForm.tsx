import {
  Card,
  FormError,
  FormInput,
  FormLeftAddonInput,
  FormRadio,
  NextCancelButton
} from '@/components/common';
import { globalStyles } from '@/theme/styles';
import { isObjectPropsEmpty } from '@/utils/helpers';
import { usePhoneMaskWith11Digits } from '@/utils/hooks/usePhoneMask';
import { Box, BoxProps, Flex, Stack, Text, useRadioGroup } from '@chakra-ui/react';
import { Field, Form, FormikProvider, useFormik } from 'formik';
import { useState } from 'react';
import { RiAddLine } from 'react-icons/ri';
import { useReadLocalStorage } from 'usehooks-ts';
import * as Yup from 'yup';

interface Props extends BoxProps {
  onBack: () => void;
  onSubmit: () => void;
  showCancelBtn?: boolean;
  props?: BoxProps;
}
interface GuarantorFormValues {
  name: string;
  phone: string;
  email: string;
  relationshipWithGuarantor: string;
}
const TakeLoanGuarantorForm = ({ onBack, onSubmit, showCancelBtn = true, ...props }: Props) => {
  const [showGuarantorForm, setShowGuarantorForm] = useState(false);
  const [guarantorErrorMessage, setGuarantorMessage] = useState('Choose Guarantor');

  const formik = useFormik<GuarantorFormValues>({
    initialValues: {
      name: '',
      phone: '',
      email: '',
      relationshipWithGuarantor: ''
    },
    onSubmit: async (values) => {
      console.log(values);

      onSubmit();
    },
    validationSchema: Yup.object<Record<keyof GuarantorFormValues, Yup.AnySchema>>({
      name: Yup.string()
        .matches(/^[aA-zZ\s]+$/, 'Please enter a valid guarantor name')
        .required('Guarantor name is required'),
      phone: Yup.string()
        .matches(/^[0-9]+$/, 'Enter a valid phone number')
        .min(11, 'Phone number should be 11 digits')
        .required('Phone number is required'),
      email: Yup.string().email('Enter a valid email').required('Email is required'),
      relationshipWithGuarantor: Yup.string()
        .matches(/^[aA-zZ\s]+$/, 'Relationship must be in alphabets')
        .required('Relationship is required')
    })
  });
  const { values, errors, touched, handleChange, setFieldValue, resetForm } = formik;

  const userEmail = useReadLocalStorage('email');
  const hasLoan = userEmail === 'johndoe@email.com';

  const guarantors = [
    {
      name: 'John Doe',
      phoneNumber: '+2349091640897',
      email: 'johndoe@email.com'
    },
    {
      name: 'John Smith',
      phoneNumber: '+2349091640390',
      email: 'johnsmith@email.com'
    }
  ];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'name',
    defaultValue: '',
    onChange: (e) => {
      setFieldValue('email', e);
      setFieldValue('name', 'John Doe');
      setFieldValue('phone', '09012345678');
      setFieldValue('relationshipWithGuarantor', 'Brother');
      setGuarantorMessage('');
    }
  });

  const group = getRootProps();

  const maskedPhoneNumber = usePhoneMaskWith11Digits(values.phone);

  return (
    <Card borderColor={['transparent', 'gray.100']} py={[0, 4]} px={[0, 7]} {...props}>
      <Text
        color='darkblue.DEFAULT'
        fontFamily='Poppins'
        lineHeight={[9, '45px']}
        fontSize={['2xl', '30px']}
        fontWeight={500}
        as='h2'
      >
        Guarantor&apos;s details
      </Text>

      <Box mt={['30px', '46px']}>
        <FormikProvider value={formik}>
          <Form>
            <Stack spacing={5}>
              {hasLoan && !showGuarantorForm ? (
                <>
                  <Box>
                    <Stack {...group} spacing={7}>
                      {guarantors.map((guarantor) => {
                        const radio = getRadioProps({ value: guarantor.email });
                        return (
                          <Stack
                            key={guarantor.email}
                            border='1px solid'
                            p='18px'
                            borderColor='gray.100'
                            borderRadius='5px'
                            boxShadow={
                              values.email === guarantor.email
                                ? '0px 0px 16px rgba(26, 31, 76, 0.3);'
                                : ''
                            }
                          >
                            <Flex justifyContent='space-between'>
                              <Text textStyle='lg' fontWeight={600}>
                                {guarantor.name}
                              </Text>
                              <Field as={FormRadio} type='radio' {...radio} />
                            </Flex>
                            <Stack
                              direction='row'
                              color='gray.300'
                              textStyle='xs'
                              alignItems='center'
                            >
                              <Text>{guarantor.phoneNumber}</Text>
                              <Box
                                bgColor='yellow.DEFAULT'
                                w='6px'
                                h='7px'
                                borderRadius='full'
                              ></Box>
                              <Text>{guarantor.email}</Text>
                            </Stack>
                          </Stack>
                        );
                      })}
                    </Stack>
                    <FormError error={guarantorErrorMessage} touched={touched.email} />
                  </Box>
                  <Flex
                    bgColor='rgba(26, 31, 76, 0.1)'
                    border='1px dashed'
                    borderColor={`${globalStyles.colors.gray[100]}`}
                    borderRadius='5px'
                    cursor='pointer'
                    h={12}
                    justifyContent='center'
                    alignItems='center'
                    fontSize='sm'
                    fontWeight={600}
                    color='gray.300'
                    gap={1}
                    onClick={() => {
                      setShowGuarantorForm(true);
                      resetForm();
                    }}
                  >
                    <RiAddLine />
                    Add new guarantor
                  </Flex>
                </>
              ) : (
                <>
                  <FormInput
                    name='name'
                    id='name'
                    label="Guarantor's name"
                    value={values.name}
                    handleChange={handleChange}
                    errorMessage={errors.name}
                    touchedField={touched.name}
                  />
                  <FormInput
                    name='email'
                    id='email'
                    label='Email address'
                    value={values.email}
                    handleChange={handleChange}
                    errorMessage={errors.email}
                    touchedField={touched.email}
                  />
                  <FormLeftAddonInput
                    addonText='+234'
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
                    value={maskedPhoneNumber}
                  />
                  <FormInput
                    name='relationshipWithGuarantor'
                    id='name'
                    label='Relationship  with guarantor'
                    value={values.relationshipWithGuarantor}
                    handleChange={handleChange}
                    errorMessage={errors.relationshipWithGuarantor}
                    touchedField={touched.relationshipWithGuarantor}
                    placeholder='Friend'
                  />
                  {/* <FormSelect
                    name='relationshipWithGuarantor'
                    id='relationshipWithGuarantor'
                    label='Relationship  with guarantor'
                    value={values.relationshipWithGuarantor}
                    onChange={handleChange}
                    errorMessage={errors.relationshipWithGuarantor}
                    touchedField={touched.relationshipWithGuarantor}
                    options={[
                      { value: '', label: '' },
                      { value: 'father', label: 'Father' },
                      { value: 'mother', label: 'Mother' },
                      { value: 'brother', label: 'Brother' },
                      { value: 'sister', label: 'Sister' },
                      { value: 'friend', label: 'Friend' },
                      { value: 'spouse', label: 'Spouse' },
                      { value: 'other', label: 'Other' }
                    ]}
                  /> */}
                </>
              )}
            </Stack>
            <Stack direction='row' mt='22px' gap={3}>
              <NextCancelButton
                onCancel={showGuarantorForm ? () => setShowGuarantorForm(false) : onBack}
                hasErrors={Object.keys(errors).length > 0 || isObjectPropsEmpty(values)}
                showCancelBtn={showCancelBtn}
              />
            </Stack>
          </Form>
        </FormikProvider>
      </Box>
    </Card>
  );
};

export default TakeLoanGuarantorForm;
