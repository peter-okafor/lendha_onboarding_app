import { ReactComponent as DashedLine } from '@/assets/svg/dashed-line.svg';
import { Alert, Card } from '@/components/common';
import { path } from '@/routes/path';
import { globalStyles } from '@/theme/styles';
import { Box, BoxProps, Button, Divider, Flex, Icon, Link, Stack, Text } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useState } from 'react';
import { IconType } from 'react-icons';
import {
  RiArrowLeftLine,
  RiBriefcaseFill,
  RiCheckLine,
  RiEmotionNormalFill,
  RiUserFill
} from 'react-icons/ri';
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import { CustomerSchema } from './@schema';
import { BusinessInfoForm, PersonalInfoForm, VerificationInfoForm } from './components';
import {
  BusinessInfoFormValues,
  PersonalInfoFormValues,
  VerificationInfoFormValues
} from './types';

const CustomerAddForm = () => {
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

  const personalInfoFormik = useFormik<PersonalInfoFormValues>({
    initialValues: {
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
    onSubmit: async () => {
      setActiveStep(2);
    },
    validationSchema: CustomerSchema.Personal
  });

  const verificationInfoFormik = useFormik<VerificationInfoFormValues>({
    initialValues: {
      nin: '',
      bvn: '',
      bankName: '',
      accountNumber: '',
      accountName: 'John Doe',
      utilityBillFile: '',
      idFile: '',
      passportPhotograph: ''
    },
    onSubmit: async () => {
      setActiveStep(3);
    },
    validationSchema: CustomerSchema.Verification
  });

  const businessInfoFormik = useFormik<BusinessInfoFormValues>({
    initialValues: {
      businessName: '',
      businessCategory: '',
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
    onSubmit: async () => {
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
          <>
            <Circle
              icon={step.icon}
              isCompleted={activeStep - 1 > index}
              bgColor={bgColor}
              color={color}
              text={step.text}
            />
            {index !== steps.length - 1 && <DashedLine />}
          </>
        );
      })}
    </>
  );
};
