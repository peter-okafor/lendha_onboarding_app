import { FormInput, FormSelect, NextCancelButton } from '@/components/common';
import { formatNumber, isObjectPropsEmpty, maskCurrency, stripCommas } from '@/utils/helpers';
import { Box, Button, Icon, InputRightElement, Stack, Text } from '@chakra-ui/react';
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
  paymentType: '' | 'daily' | 'weekly';
  amount: string;
  loanPeriod: string;
  interestRate: '3%' | '3.6%';
}

const TakeLoanWeeklyDailyForm = (props: Props) => {
  const formik = useFormik<TakeLoanValues>({
    initialValues: {
      paymentType: '',
      amount: '',
      loanPeriod: '30 days',
      interestRate: '3%'
    },
    onSubmit: async (values) => {
      console.log(values);
      props.onSubmit();
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
  const { values, errors, touched, handleChange, setFieldValue } = formik;

  useEffect(() => {
    switch (values.paymentType) {
      case 'daily':
        setFieldValue('interestRate', '3%');
        break;
      case 'weekly':
        setFieldValue('interestRate', '3.6%');
        break;
      default:
        setFieldValue('interestRate', '3%');
        break;
    }
  }, [setFieldValue, values.paymentType]);

  const handleInputChange = (e: any /**TODO: fix this type**/) => {
    const amount: number | '' = Number(stripCommas(maskCurrency(e.target.value))) || '';

    setFieldValue('amount', Number(amount) || '');
  };

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
                  { value: 'daily', label: 'Daily Payment (3% total interest)' },
                  { value: 'weekly', label: 'Weekly Payment (3.6% total interest)' }
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
                value={values.loanPeriod}
                readonly
              />
              <FormInput
                label='Interest rate'
                name='interestRate'
                id='interest-rate'
                readonly
                value={values.interestRate}
                handleChange={handleChange}
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
