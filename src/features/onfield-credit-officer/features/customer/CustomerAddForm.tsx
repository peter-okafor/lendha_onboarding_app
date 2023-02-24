import { isObjectPropsEmpty } from '@/utils/helpers/object.helpers';
import {
  useAddBankMutation,
  useAddBusinessMutation,
  useCreateAddressMutation,
  useCreateUserMutation,
  useNextOfKinMutation,
  useSocialHandlesMutation
} from '@/app/services/onboardingOfficer';
import { ENDPOINTS as e } from '@/app/services/_endpoints';
import { Alert, Card } from '@/components/common';
import { path } from '@/routes/path';
import { globalStyles } from '@/theme/styles';
import ErrorMessages from '@/utils/components/ErrorMessages';
import { sanitize } from '@/utils/helpers';
import { Box, Button, Divider, Flex, Icon, Link, Text, useToast } from '@chakra-ui/react';
import { useFormik } from 'formik';
import Cookies from 'js-cookie';
import { useState } from 'react';
import {
  RiArrowLeftLine,
  RiBriefcaseFill,
  RiCellphoneFill,
  RiCheckLine,
  RiEmotionNormalFill,
  RiFilePaper2Fill,
  RiGroupFill,
  RiHome2Fill,
  RiInformationFill,
  RiUserFill
} from 'react-icons/ri';
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { CustomerSchema } from './@schema';
import { BusinessInfoForm, PersonalInfoForm, VerificationInfoForm } from './components';
import AddressInfoForm from './components/AddressInfoForm';
import BusinessRegForm, { BusRegFormValues } from './components/BusinessRegForm';
import BusinessSocialHandlesForm, {
  SocialHandlesFormValues
} from './components/BusinessSocialHandlesForm';
import DocumentsForm, { DocumentsFormValues } from './components/DocumentsForm';
import NextOfKinForm, { NextOfKinFormValues } from './components/NextOfKinForm';
import { Stepper } from './components/Stepper';
import {
  BusinessInfoFormValues,
  PersonalInfoFormValues,
  VerificationInfoFormValues
} from './types';

const CustomerAddForm = () => {
  const [userId, setUserId] = useState('');
  const toast = useToast();

  const [activeStep, setActiveStep] = useState<number>(1);

  const navigate = useNavigate();

  const goBack = () => {
    switch (activeStep) {
      case 1:
        navigate(path.CUSTOMERS);
        break;

      default:
        setActiveStep(activeStep - 1);
        break;
    }
  };

  const [createUser] = useCreateUserMutation();
  const [createAddress] = useCreateAddressMutation();
  const [createBank] = useAddBankMutation();
  const [createBusiness] = useAddBusinessMutation();
  const [nextOfKin] = useNextOfKinMutation();
  const [socialHandles] = useSocialHandlesMutation();

  const personalInfoFormik = useFormik<PersonalInfoFormValues>({
    initialValues: {
      businessName: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: ''
    },
    onSubmit: async (formValues) => {
      const values = sanitize(formValues);

      try {
        const userResponse = await createUser({
          business_name: values.businessName,
          date_of_birth: values.dateOfBirth,
          name: `${values.firstName} ${values.lastName}`,
          password: '123456',
          password_confirmation: '123456',
          phone_number: values.phone,
          referral_channel: '7'
        }).unwrap();
        setUserId(userResponse.data.user.id.toString());

        toast({
          title: 'Success',
          description: userResponse.message || 'Account has been successfully registered',
          status: 'success',
          duration: 4000,
          position: 'top-right',
          isClosable: true
        });
        setActiveStep(activeStep + 1);
      } catch (err: any) {
        toast({
          title: err?.data?.message || 'An error occurred',
          description: err?.data?.errors ? (
            <ErrorMessages errors={err?.data?.errors} />
          ) : (
            err?.data?.message
          ),
          status: 'error',
          duration: 4000,
          position: 'top-right',
          isClosable: true
        });
      }
    },
    validationSchema: CustomerSchema.Personal
  });

  const addressInfoFormik = useFormik({
    initialValues: {
      addressNumber: '',
      streetName: '',
      nearestLandmark: '',
      cityTown: '',
      lga: '',
      state: ''
    },
    onSubmit: async (formValues) => {
      const values = sanitize(formValues);

      try {
        const addressResponse = await createAddress({
          number: values.addressNumber,
          street_name: values.streetName,
          landmark: values.nearestLandmark,
          city: values.cityTown,
          local_government: values.lga,
          state: values.state,
          user_id: Number(userId)
        }).unwrap();

        toast({
          title: 'Success',
          description: addressResponse.message || 'Account has been successfully registered',
          status: 'success',
          duration: 4000,
          position: 'top-right',
          isClosable: true
        });
        setActiveStep(activeStep + 1);
      } catch (err: any) {
        toast({
          title: err?.data?.message || 'An error occurred',
          description: err?.data?.errors ? (
            <ErrorMessages errors={err?.data?.errors} />
          ) : (
            err?.data?.message
          ),
          status: 'error',
          duration: 4000,
          position: 'top-right',
          isClosable: true
        });
      }
    },
    validationSchema: CustomerSchema.Address
  });

  const nextOfKinFormik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      address: '',
      relationship: ''
    },
    onSubmit: async (formValues) => {
      const { name, phone, relationship, address } = sanitize(formValues);

      try {
        const response = await nextOfKin({
          address,
          name,
          phone,
          relationship,
          user_id: userId
        }).unwrap();

        toast({
          title: 'Success',
          description: response.message || 'Account has been successfully registered',
          status: 'success',
          duration: 4000,
          position: 'top-right',
          isClosable: true
        });
        setActiveStep(activeStep + 1);
      } catch (err: any) {
        toast({
          title: err?.data?.message || 'An error occurred',
          description: err?.data?.errors ? (
            <ErrorMessages errors={err?.data?.errors} />
          ) : (
            err?.data?.message
          ),
          status: 'error',
          duration: 4000,
          position: 'top-right',
          isClosable: true
        });
      }
    },
    validationSchema: Yup.object<Record<keyof NextOfKinFormValues, Yup.AnySchema>>({
      name: Yup.string().required('Name is required'),
      relationship: Yup.string().required('Relatioship is required'),
      address: Yup.string().required('Address is required'),
      phone: Yup.string()
        .matches(/^\+?\d{10,14}$/, 'Invalid phone number')
        .required('Phone is required')
    })
  });

  const socialHandlesFormik = useFormik({
    initialValues: {
      facebook: '',
      instagram: '',
      linkedin: ''
    },
    onSubmit: async (formValues) => {
      const { facebook, instagram, linkedin } = sanitize(formValues);

      try {
        const response = await socialHandles({
          facebook,
          instagram,
          linkedin,
          user_id: userId
        }).unwrap();

        toast({
          title: 'Success',
          description: response.message || 'Social media handles validated',
          status: 'success',
          duration: 4000,
          position: 'top-right',
          isClosable: true
        });
        setActiveStep(activeStep + 1);
      } catch (err: any) {
        toast({
          title: err?.data?.message || 'An error occurred',
          description: err?.data?.errors ? (
            <ErrorMessages errors={err?.data?.errors} />
          ) : (
            err?.data?.message
          ),
          status: 'error',
          duration: 4000,
          position: 'top-right',
          isClosable: true
        });
      }
    },
    validationSchema: Yup.object<Record<keyof SocialHandlesFormValues, Yup.AnySchema>>({
      facebook: Yup.string().required('Facebook handle is required'),
      instagram: Yup.string().required('Instagram handle is required'),
      linkedin: Yup.string().required('linkedin handle is required')
    })
  });

  const verificationInfoFormik = useFormik<VerificationInfoFormValues>({
    initialValues: {
      nin: '',
      bvn: '',
      bankName: '',
      accountNumber: '',
      accountName: ''
    },
    onSubmit: async (formValues) => {
      const values = sanitize(formValues);

      try {
        const bankResponse = await createBank({
          account_number: values.accountNumber,
          bank: 'Zenith Bank',
          bank_code: values.bankName,
          bvn: values.bvn,
          nin: values.nin,
          user_id: userId
        }).unwrap();

        toast({
          title: 'Success',
          description: bankResponse.message || 'Bank has been successfully added',
          status: 'success',
          duration: 4000,
          position: 'top-right',
          isClosable: true
        });

        setActiveStep(activeStep + 1);
      } catch (err: any) {
        toast({
          title: err?.data?.message || 'An error occurred',
          description: err?.data?.errors ? (
            <ErrorMessages errors={err?.data?.errors} />
          ) : (
            err?.data?.message
          ),
          status: 'error',
          duration: 4000,
          position: 'top-right',
          isClosable: true
        });
      }
    },
    validationSchema: CustomerSchema.Verification
  });

  const businessInfoFormik = useFormik<BusinessInfoFormValues>({
    initialValues: {
      addressNumber: '',
      businessName: '',
      cityTown: '',
      businessDesc: '',
      email: '',
      nearestLandmark: '',
      state: '',
      streetName: ''
    },
    onSubmit: async (formValues) => {
      const values = sanitize(formValues);

      try {
        const businessResponse = await createBusiness({
          address_number: values.addressNumber,
          business_name: values.businessName,
          city: values.cityTown,
          description: values.businessDesc,
          email: values.email,
          landmark: values.nearestLandmark,
          state: values.state,
          street: values.streetName,
          user_id: userId
        }).unwrap();

        toast({
          title: 'Success',
          description: businessResponse.message || 'Business has been successfully added',
          status: 'success',
          duration: 4000,
          position: 'top-right',
          isClosable: true
        });

        setActiveStep(activeStep + 1);
      } catch (err: any) {
        toast({
          title: err?.data?.message || 'An error occurred',
          description: err?.data?.errors ? (
            <ErrorMessages errors={err?.data?.errors} />
          ) : (
            err?.data?.message
          ),
          status: 'error',
          duration: 4000,
          position: 'top-right',
          isClosable: true
        });
      }
    },
    validationSchema: CustomerSchema.Business
  });

  const businessRegFormik = useFormik<BusRegFormValues>({
    initialValues: {
      busRegNumber: '',
      cacDocument: ''
    },
    onSubmit: async (values) => {
      if (isObjectPropsEmpty(values)) {
        return setActiveStep(activeStep + 1);
      }
      try {
        const formData = new FormData();
        formData.append('user_id', userId);
        formData.append('business_registration_number', values.busRegNumber);
        formData.append('cac_document', values.cacDocument[0], 'cac_document.png');

        const requestOptions = {
          method: 'POST',
          headers: {
            authorization: `Bearer ${Cookies.get('token')}`
          },
          body: formData
        };

        const response = await fetch(
          `${import.meta.env.VITE_LENDHA_API_URL}/${e.addBusinessReg}`,
          requestOptions
        )
          .then((response) => response.json())
          .then((result) => result);

        toast({
          title: 'Success',
          description:
            response?.message || 'Business registration info has been successfully added',
          status: 'success',
          duration: 4000,
          position: 'top-right',
          isClosable: true
        });

        setActiveStep(activeStep + 1);
      } catch (err: any) {
        toast({
          title: err?.data?.message || 'An error occurred',
          description: err?.data?.errors ? (
            <ErrorMessages errors={err?.data?.errors} />
          ) : (
            err?.data?.message
          ),
          status: 'error',
          duration: 4000,
          position: 'top-right',
          isClosable: true
        });
      }
    },
    validationSchema: CustomerSchema.BusinessReg
  });

  const documentsFormik = useFormik({
    initialValues: {
      passport_photo: '',
      work_id: '',
      valid_id: ''
    },
    onSubmit: async (values) => {
      const { passport_photo, valid_id, work_id } = values;

      try {
        const formData = new FormData();
        formData.append('passport_photo', passport_photo[0], 'passport_photo.png');
        formData.append('user_id', userId);

        const requestOptions = {
          method: 'POST',
          headers: {
            authorization: `Bearer ${Cookies.get('token')}`
          },
          body: formData
        };
        const response = await fetch(
          `${import.meta.env.VITE_LENDHA_API_URL}/${e.uploadPhotograph}`,
          requestOptions
        )
          .then((response) => response.json())
          .then((result) => result);
        toast({
          title: 'Success',
          description: response?.message || 'Passport uploaded',
          status: 'success',
          duration: 4000,
          position: 'top-right',
          isClosable: true
        });

        const workIDFormData = new FormData();
        workIDFormData.append('work_id', work_id[0], 'work_id.png');
        workIDFormData.append('user_id', userId);

        const workIDResponse = await fetch(
          `${import.meta.env.VITE_LENDHA_API_URL}/${e.uploadWorkId}`,
          {
            method: 'POST',
            headers: {
              authorization: `Bearer ${Cookies.get('token')}`
            },
            body: workIDFormData
          }
        )
          .then((workResponse) => workResponse.json())
          .then((result) => result);
        toast({
          title: 'Success',
          description: workIDResponse?.message || 'Work ID uploaded',
          status: 'success',
          duration: 4000,
          position: 'top-right',
          isClosable: true
        });

        const validIDFormData = new FormData();
        validIDFormData.append('valid_id', valid_id[0], 'valid_id.png');
        validIDFormData.append('user_id', userId);

        const validIDResponse = await fetch(
          `${import.meta.env.VITE_LENDHA_API_URL}/${e.uploadValidId}`,
          {
            method: 'POST',
            headers: {
              authorization: `Bearer ${Cookies.get('token')}`
            },
            body: validIDFormData
          }
        )
          .then((workResponse) => workResponse.json())
          .then((result) => result);
        toast({
          title: 'Success',
          description: validIDResponse?.message || 'Valid ID uploaded',
          status: 'success',
          duration: 4000,
          position: 'top-right',
          isClosable: true
        });

        setActiveStep(activeStep + 1);
      } catch (err: any) {
        console.log({ err });
        toast({
          title: err?.data?.message || 'An error occurred',
          description: err?.data?.errors ? (
            <ErrorMessages errors={err?.data?.errors} />
          ) : (
            err?.data?.message
          ),
          status: 'error',
          duration: 4000,
          position: 'top-right',
          isClosable: true
        });
      }
    },
    validationSchema: Yup.object<Record<keyof DocumentsFormValues, Yup.AnySchema>>({
      passport_photo: Yup.mixed().required('Passport photo is required'),
      work_id: Yup.mixed().required('Work ID is required'),
      valid_id: Yup.mixed().required('Valid ID is required')
    })
  });

  return (
    <>
      {activeStep !== 9 && (
        <Flex
          alignItems='center'
          gap={3}
          justifyContent={['left', 'center']}
          textStyle={['base', '2xl']}
          mb={[0, '18px']}
          className='lendha__container'
        >
          <Icon
            as={RiArrowLeftLine}
            color='gray.300'
            cursor='pointer'
            display={['none', 'inline-block']}
            onClick={goBack}
          />
          <Text fontFamily={['Nunito', 'Poppins']} fontWeight={[600, 500]}>
            Add new customer
          </Text>
        </Flex>
      )}

      <Flex
        alignItems='center'
        gap='5px'
        mb='42px'
        display={['none', 'flex']}
        mx='auto'
        w='fit-content'
      >
        <Stepper
          activeStep={activeStep}
          steps={[
            { icon: RiUserFill, text: 'Personal Info' },
            // { icon: RiUserFill, text: 'Employment' },
            { icon: RiHome2Fill, text: 'Address' },
            { icon: RiGroupFill, text: 'Next of Kin' },
            { icon: RiEmotionNormalFill, text: 'Verification' },
            { icon: RiCellphoneFill, text: 'Social Handles' },
            { icon: RiBriefcaseFill, text: 'Business Info' },
            { icon: RiInformationFill, text: 'Business Reg.' },
            { icon: RiFilePaper2Fill, text: 'Documents' }
          ]}
        />
      </Flex>

      <Card
        borderColor={['transparent', 'gray.100']}
        px={[0, '30px']}
        py={[0, '30px']}
        w={['full', '460px']}
        mx='auto'
        sx={{
          '.title': {
            color: 'gray.300',
            textStyle: 'lg'
          },
          '.chakra-input:focus': {
            border: '1px solid rgba(26, 31, 76, 0.6)',
            boxShadow: '0px 0px 4px rgba(26, 31, 76, 0.4)'
          }
        }}
      >
        <Text
          color='black.DEFAULT'
          fontFamily={['Nunito', 'Poppins']}
          fontWeight={500}
          mb={[0, '30px']}
          textStyle={['xs', 'base']}
          px={[3, 0]}
        >
          {activeStep === 1 && 'Personal Information'}
          {/* {activeStep === 2 && 'Employment Information'} */}
          {activeStep === 3 && 'Address Information'}
          {activeStep === 4 && 'Next of Kin Information'}
          {activeStep === 5 && 'Verification Information'}
          {activeStep === 6 && 'Social Handles'}
          {activeStep === 7 && 'Business Information'}
          {activeStep === 8 && 'Business Registration Information'}
          {activeStep === 9 && 'Documents'}
        </Text>
        <Box display={['block', 'none']} mt='17px' mb={7}>
          <Divider color='gray.100' />
        </Box>
        <Box className='lendha__container'>
          {activeStep === 1 && (
            <PersonalInfoForm formik={personalInfoFormik} onBack={() => navigate(path.CUSTOMERS)} />
          )}
          {/* {activeStep === 2 && (
            <EmploymentForm
              formik={employmentFormik}
              onBack={() => setActiveStep(activeStep - 1)}
            />
          )} */}
          {activeStep === 2 && (
            <AddressInfoForm
              formik={addressInfoFormik}
              onBack={() => setActiveStep(activeStep - 1)}
            />
          )}
          {activeStep === 3 && (
            <NextOfKinForm formik={nextOfKinFormik} onBack={() => setActiveStep(activeStep - 1)} />
          )}
          {activeStep === 4 && (
            <VerificationInfoForm formik={verificationInfoFormik} onBack={() => setActiveStep(2)} />
          )}
          {activeStep === 5 && (
            <BusinessSocialHandlesForm
              formik={socialHandlesFormik}
              onBack={() => setActiveStep(activeStep - 1)}
            />
          )}
          {activeStep === 6 && (
            <BusinessInfoForm
              formik={businessInfoFormik}
              onBack={() => setActiveStep(activeStep - 1)}
            />
          )}
          {activeStep === 7 && (
            <BusinessRegForm
              formik={businessRegFormik}
              onBack={() => setActiveStep(activeStep - 1)}
            />
          )}
          {activeStep === 8 && (
            <DocumentsForm formik={documentsFormik} onBack={() => setActiveStep(activeStep - 1)} />
          )}
          {activeStep === 9 && (
            <Alert
              icon={<RiCheckLine color={`${globalStyles.colors.yellow.DEFAULT}`} fontSize='70px' />}
              description={
                <Box>
                  <Text maxW={['240px', '300px']} mx='auto' className='header--success'>
                    Your account is under review
                  </Text>
                </Box>
              }
            >
              <Button
                w='full'
                size='md'
                onClick={() => {
                  navigate(path.CREDIT_OFFICER_TAKE_LOAN);
                }}
              >
                Take a loan
              </Button>
              <Flex justifyContent='center'>
                <Link
                  as={ReactRouterLink}
                  color='darkblue.DEFAULT'
                  to={path.CUSTOMERS}
                  textStyle='sm'
                  fontWeight={700}
                  mt={5}
                >
                  Back to Customers
                </Link>
              </Flex>
            </Alert>
          )}
        </Box>
      </Card>
    </>
  );
};

export default CustomerAddForm;
