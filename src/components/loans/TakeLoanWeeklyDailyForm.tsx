import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { useLoanApplyMutation } from '@/app/services/onboardingOfficer';
import { FormInput, FormSelect, NextCancelButton } from '@/components/common';
import { setLoanRequest } from '@/features/onfield-credit-officer/features/loans/loanSlice';
import {
  formatNumber,
  isObjectPropsEmpty,
  maskCurrency,
  sanitize,
  stripCommas
} from '@/utils/helpers';
import { Box, Button, Icon, InputRightElement, Stack, Text, useToast } from '@chakra-ui/react';
import { Form, FormikProvider, useFormik } from 'formik';
import { useEffect } from 'react';
import { RiBriefcaseFill } from 'react-icons/ri';
import * as Yup from 'yup';
import { LOAN_AMOUNTS } from './constants';

const { float } = LOAN_AMOUNTS;
interface Props {
  onSubmit: () => void;
  onGoBack: () => void;
  shouldCalculate?: boolean;
  showCancelBtn?: boolean;
}
interface TakeLoanValues {
  paymentType: number;
  amount: number;
  loanPeriod: number;
  interestRate: number;
}

const TakeLoanWeeklyDailyForm = (props: Props) => {
  const dispatch = useAppDispatch();

  const userId = useAppSelector((state) => state.customer.userId) || localStorage.getItem('userId');
  const toast = useToast();

  const floatInterests = useAppSelector((state) => state.loan.loanInterests.slice(3));

  const [loanApply] = useLoanApplyMutation();

  const formik = useFormik<TakeLoanValues>({
    initialValues: {
      paymentType: 1,
      amount: 0,
      loanPeriod: 31,
      interestRate: 5
    },
    onSubmit: async (formValues) => {
      const values = sanitize<TakeLoanValues>(formValues);
      try {
        const payload = {
          loan_amount: values.amount,
          loan_interest_id: values.interestRate,
          loan_term: values.loanPeriod,
          user_id: Number(userId)
        };
        const response = await loanApply(payload).unwrap();

        toast({
          title: 'Loan Application',
          description: response?.message,
          status: 'success',
          duration: 4000,
          position: 'top-right',
          isClosable: true
        });

        dispatch(setLoanRequest(payload));
        props.onSubmit();
      } catch (err: any) {
        toast({
          title: 'Loan Application Error',
          description: err?.data?.message || 'An error occurred',
          status: 'error',
          duration: 4000,
          position: 'top-right',
          isClosable: true
        });
      }
    },
    validationSchema: Yup.object<Record<keyof TakeLoanValues, Yup.AnySchema>>({
      paymentType: Yup.string().required('Payment Type is required'),
      amount: Yup.number()
        .required('Loan Amount is required')
        .min(float.min, `Minimum loan amount is N${formatNumber(float.min)}`)
        .max(float.max, `Maximum loan amount is N${formatNumber(float.max)}`),
      loanPeriod: Yup.string().required('Loan Period is required'),
      interestRate: Yup.string().required('Interest Rate is required')
    })
  });
  const { values, errors, touched, handleChange, setFieldValue, isSubmitting } = formik;

  const handleInputChange = (e: any /**TODO: fix this type**/) => {
    const amount: number | '' = Number(stripCommas(maskCurrency(e.target.value))) || '';

    setFieldValue('amount', Number(amount) || '');
  };

  useEffect(() => {
    setFieldValue('interestRate', 5);
  }, [setFieldValue]);

  return (
    <>
      <Button className='loan-category-option selected'>
        <Box as='span'>
          <Icon as={RiBriefcaseFill} fontSize='20px' />
          Float
        </Box>
      </Button>
      <Box mt={4}>
        <FormikProvider value={formik}>
          <Form>
            <Stack spacing={5}>
              <FormSelect
                id='payment-type'
                name='paymentType'
                label='Payment Type'
                options={[
                  { value: '', label: '' },
                  {
                    value: floatInterests[0]?.id.toString(),
                    label: `Daily Payment (${floatInterests[0]?.interest}% total interest)`
                  },
                  {
                    value: floatInterests[1]?.id.toString(),
                    label: `Weekly Payment (${floatInterests[1]?.interest}% total interest)`
                  }
                ]}
                errorMessage={errors.paymentType}
                touchedField={touched.paymentType}
                onChange={handleChange}
                value={values.paymentType}
              />
              <FormInput
                pr={8}
                placeholder='min 300,000'
                label='Enter amount'
                rightAddon={
                  <InputRightElement>
                    <Text as='span' textStyle='xs' userSelect='none'>
                      N
                    </Text>
                  </InputRightElement>
                }
                id='amount'
                name='amount'
                errorMessage={errors.amount}
                touchedField={touched.amount}
                value={(formatNumber(Number(values.amount)) === 0
                  ? ''
                  : formatNumber(Number(values.amount))
                ).toString()}
                handleChange={handleInputChange}
              />

              <FormInput
                id='loan-period'
                name='loanPeriod'
                label='Loan period'
                errorMessage={errors.loanPeriod}
                touchedField={touched.loanPeriod}
                handleChange={handleChange}
                value={values.loanPeriod.toString()}
                readonly
              />
              <FormInput
                label='Interest rate'
                name='interestRate'
                id='interest-rate'
                readonly
                value={values.interestRate.toString()}
                // handleChange={handleChange}
                touchedField={touched.interestRate}
                errorMessage={errors.interestRate}
              />
            </Stack>
            <Stack direction='row' mt='30px' gap={3}>
              {props.shouldCalculate ? (
                <Button type='submit' w='full'>
                  Calculate
                </Button>
              ) : (
                <NextCancelButton
                  isSubmitting={isSubmitting}
                  showCancelBtn={props.showCancelBtn}
                  onCancel={props.onGoBack}
                  hasErrors={Object.keys(errors).length > 0 || isObjectPropsEmpty(values)}
                />
              )}
            </Stack>
          </Form>
        </FormikProvider>
      </Box>
    </>
  );
};

export default TakeLoanWeeklyDailyForm;
