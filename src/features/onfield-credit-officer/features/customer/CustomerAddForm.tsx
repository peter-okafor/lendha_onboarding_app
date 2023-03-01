import {
  useAddBankMutation,
  useAddBusinessMutation,
  useCreateAddressMutation,
  useCreateUserMutation,
  useProofOfResidenceMutation,
  useUploadPhotographMutation,
  useUploadValidIdMutation
} from '@/app/services/onboardingOfficer';
import { ReactComponent as DashedLine } from '@/assets/svg/dashed-line.svg';
import { Alert, Card } from '@/components/common';
import { path } from '@/routes/path';
import { globalStyles } from '@/theme/styles';
import ErrorMessages from '@/utils/components/ErrorMessages';
import { sanitize } from '@/utils/helpers';
import {
  Box,
  BoxProps,
  Button,
  Divider,
  Flex,
  Icon,
  Link,
  Stack,
  Text,
  useToast
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { Fragment, useState } from 'react';
import { IconType } from 'react-icons';
import {
  RiArrowLeftLine,
  RiBriefcaseFill,
  RiCheckLine,
  RiEmotionNormalFill,
  RiUserFill
} from 'react-icons/ri';
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import { v4 as key } from 'uuid';
import { CustomerSchema } from './@schema';
import { BusinessInfoForm, PersonalInfoForm, VerificationInfoForm } from './components';
import {
  BusinessInfoFormValues,
  PersonalInfoFormValues,
  VerificationInfoFormValues
} from './types';

const CustomerAddForm = () => {
  const [proofOfResidence] = useProofOfResidenceMutation();
  const [validId] = useUploadValidIdMutation();
  const [photograph] = useUploadPhotographMutation();

  const [userId, setUserId] = useState('');
  const toast = useToast();

  const [activeStep, setActiveStep] = useState<1 | 2 | 3 | 4>(1);

  const navigate = useNavigate();

  const goBack = () => {
    switch (activeStep) {
      case 1:
        navigate(path.CUSTOMERS);
        break;
      case 2:
        setActiveStep(1);
        break;
      case 3:
        setActiveStep(2);
        break;
      case 4:
        navigate(path.CUSTOMERS);
        break;

      default:
        navigate(path.CUSTOMERS);
        break;
    }
  };

  const [createUser] = useCreateUserMutation();
  const [createAddress] = useCreateAddressMutation();
  const [createBank] = useAddBankMutation();
  const [createBusiness] = useAddBusinessMutation();

  const personalInfoFormik = useFormik<PersonalInfoFormValues>({
    initialValues: {
      businessName: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      // password: '',
      // confirmPassword: '',
      dateOfBirth: '',
      proofOfResidence: '',
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
        const userResponse = await createUser({
          business_name: values.businessName, // TODO: might probably remove this as it wasn't initially on UI
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

        const addressResponse = await createAddress({
          number: values.addressNumber,
          street_name: values.streetName,
          landmark: values.nearestLandmark,
          city: values.cityTown,
          local_government: values.lga,
          state: values.state,
          user_id: userResponse.data.user.id
        }).unwrap();
        toast({
          title: 'Success',
          description: addressResponse.message || 'Address has been successfully added',
          status: 'success',
          duration: 4000,
          position: 'top-right',
          isClosable: true
        });

        const residenceFormData = new FormData();
        residenceFormData.append('residence_proof', values.proofOfResidence[0]);
        residenceFormData.append('user_id', userId);

        const residenceResp = await proofOfResidence(residenceFormData).unwrap();
        toast({
          title: 'Success',
          description: residenceResp.message || 'Document has been uploaded',
          status: 'success',
          duration: 4000,
          position: 'top-right',
          isClosable: true
        });

        setActiveStep(2);
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

  const verificationInfoFormik = useFormik<VerificationInfoFormValues>({
    initialValues: {
      nin: '',
      bvn: '',
      bankName: '',
      accountNumber: '',
      accountName: '',
      utilityBillFile: '',
      idFile: '',
      passportPhotograph: ''
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

        const residenceFormData = new FormData();
        residenceFormData.append('residence_proof', values.utilityBillFile[0]);
        residenceFormData.append('user_id', userId);

        const residenceResp = await proofOfResidence(residenceFormData).unwrap();
        toast({
          title: 'Success',
          description: residenceResp.message || 'Document has been uploaded',
          status: 'success',
          duration: 4000,
          position: 'top-right',
          isClosable: true
        });

        const idFormData = new FormData();
        idFormData.append('user_id', userId);
        idFormData.append('valid_id', values.idFile[0]);

        const validIdResp = await validId(idFormData).unwrap();
        toast({
          title: 'Success',
          description: validIdResp.message || 'Document has been uploaded',
          status: 'success',
          duration: 4000,
          position: 'top-right',
          isClosable: true
        });

        const photographFormData = new FormData();
        photographFormData.append('user_id', userId);
        photographFormData.append('passport_photo', values.passportPhotograph[0]);

        const idResp = await photograph(photographFormData).unwrap();
        toast({
          title: 'Success',
          description: idResp.message || 'Document has been uploaded',
          status: 'success',
          duration: 4000,
          position: 'top-right',
          isClosable: true
        });

        setActiveStep(3);
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
      businessName: '',
      businessCategory: '',
      email: '',
      businessDesc: '',
      facebookHandle: '',
      twitterHandle: '',
      instagramHandle: '',
      addressNumber: '',
      streetName: '',
      cityTown: '',
      lga: '',
      state: '',
      nearestLandmark: '',
      businessLocationFile: '',
      hasSourceOfIncome: 'no',
      isBusinessRegistered: 'no'
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

        // setActiveStep(4);
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

      setActiveStep(4);
    },
    validationSchema: CustomerSchema.Business
  });

  return (
    <>
      {activeStep !== 4 && (
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
        {/* TODO: clean this up 😭 */}
        <Stepper
          activeStep={activeStep}
          steps={[
            { icon: RiUserFill, text: 'Personal Info' },
            { icon: RiEmotionNormalFill, text: 'Verification' },
            { icon: RiBriefcaseFill, text: 'Business Info' }
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
          {activeStep === 1 && 'Personal information'}
          {activeStep === 2 && 'Verification'}
          {activeStep === 3 && 'Business information'}
        </Text>
        <Box display={['block', 'none']} mt='17px' mb={7}>
          <Divider color='gray.100' />
        </Box>
        <Box className='lendha__container'>
          {activeStep === 1 && (
            <PersonalInfoForm formik={personalInfoFormik} onBack={() => navigate(path.CUSTOMERS)} />
          )}
          {activeStep === 2 && (
            <VerificationInfoForm formik={verificationInfoFormik} onBack={() => setActiveStep(1)} />
          )}
          {activeStep === 3 && (
            <BusinessInfoForm formik={businessInfoFormik} onBack={() => setActiveStep(2)} />
          )}
          {activeStep === 4 && (
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

interface CircleProps extends BoxProps {
  icon: IconType;
  props?: BoxProps;
  isCompleted: boolean;
  text: string;
}
const Circle = ({ bgColor, color, icon, isCompleted, ...props }: CircleProps) => {
  return (
    <Stack>
      <Box
        display='inline-flex'
        alignItems='center'
        justifyContent='center'
        borderRadius='full'
        bgColor={bgColor}
        h={6}
        w={6}
        color={color}
        {...props}
      >
        <Icon as={isCompleted ? RiCheckLine : icon} />
      </Box>
      <Box pos='relative'>
        <Text fontWeight={500} textStyle='xs' pos='absolute' whiteSpace='nowrap'>
          {props.text}
        </Text>
      </Box>
    </Stack>
  );
};

interface StepperProps {
  activeStep: number;
  steps: {
    icon: IconType;
    text: string;
  }[];
}

const Stepper = ({ activeStep, steps }: StepperProps) => {
  return (
    <>
      {steps.map((step, index) => {
        let bgColor;
        let color;
        const isCompleted = activeStep > index;

        if (activeStep - 1 === index) {
          bgColor = 'yellow.DEFAULT';
          color = 'darkblue.DEFAULT';
        } else if (isCompleted) {
          bgColor = 'darkblue.DEFAULT';
          color = 'white';
        } else {
          bgColor = 'white';
          color = 'gray.300';
        }

        return (
          <Fragment key={key()}>
            <Circle
              icon={step.icon}
              isCompleted={activeStep - 1 > index}
              bgColor={bgColor}
              color={color}
              text={step.text}
            />
            {index !== steps.length - 1 && <DashedLine />}
          </Fragment>
        );
      })}
    </>
  );
};
