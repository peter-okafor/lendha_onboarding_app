import { FormError, FormInput, FormSelect, NextCancelButton } from '@/components/common';
import { formatNumber, isObjectPropsEmpty, maskCurrency, stripCommas } from '@/utils/helpers';
import {
  Box,
  Button,
  Grid,
  GridItem,
  Icon,
  InputRightElement,
  Stack,
  Text
} from '@chakra-ui/react';
import { Form, FormikProvider, useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { RiCommunityFill, RiShoppingBagFill, RiStore2Fill } from 'react-icons/ri';
import * as Yup from 'yup';
import { LOAN_AMOUNTS } from './constants';

const { retail, wholesalers, smes } = LOAN_AMOUNTS;

export type LoanValues = {
  amount: string;
  duration: string;
  loanType: string;
  interestRate: string;
};

export type LoanCategory = 'retail' | 'wholesalers' | 'smes' | 'float';

const loanCategories = {
  retail: { rate: 7, minAmount: retail.min, maxAmount: retail.max },
  wholesalers: {
    category: 'wholesalers',
    rate: 6,
    minAmount: wholesalers.min,
    maxAmount: wholesalers.max
  },
  smes: { rate: 5, minAmount: smes.min, maxAmount: smes.max }
};

interface Props {
  onSubmit: () => void;
  onGoBack: () => void;
  shouldCalculate?: boolean;
  showCancelBtn?: boolean;
}
interface TakeLoanValues {
  amount: string;
  loanPeriod: string;
  interestRate: string;
}
const TakeLoanMonthlyForm = (props: Props) => {
  const [selectedLoanCategory, setSelectedLoanCategory] = useState<LoanCategory | ''>('');

  const [loanMinAmount, setLoanMinAmount] = useState(50_000);
  const [loanMaxAmount, setLoanMaxAmount] = useState(1_000_000);

  useEffect(() => {
    if (
      selectedLoanCategory === 'retail' ||
      selectedLoanCategory === 'wholesalers' ||
      selectedLoanCategory === 'smes'
    ) {
      setLoanMinAmount(loanCategories[selectedLoanCategory].minAmount);
      setLoanMaxAmount(loanCategories[selectedLoanCategory].maxAmount);
    }
  }, [selectedLoanCategory]);

  const formik = useFormik<TakeLoanValues>({
    initialValues: {
      amount: '',
      loanPeriod: '',
      interestRate: ''
    },
    onSubmit: async (values) => {
      console.log(values);
      props.onSubmit();
    },
    validationSchema: Yup.object<Record<keyof TakeLoanValues, Yup.AnySchema>>({
      amount: Yup.number()
        .required('Loan Amount is required')
        .min(loanMinAmount, `Minimum loan amount is ₦${formatNumber(loanMinAmount)}`)
        .max(loanMaxAmount, `Maximum loan amount is ₦${formatNumber(loanMaxAmount)}`),
      loanPeriod: Yup.string().required('Loan Period is required'),
      interestRate: Yup.string().required('Choose a loan category')
    })
  });

  const { values, errors, touched, handleChange, setFieldValue } = formik;

  const handleInputChange = (e: any /**TODO: fix this type**/) => {
    const amount: number | '' = Number(stripCommas(maskCurrency(e.target.value))) || '';

    setFieldValue('amount', Number(amount) || '');
  };

  const loanCategoryOptions = [
    {
      value: 'retail',
      label: 'Retail Merchants',
      icon: RiShoppingBagFill,
      onClick: () => {
        setFieldValue('amount', '');
        setSelectedLoanCategory('retail');
      }
    },
    {
      value: 'wholesalers',
      label: 'Wholesalers',
      icon: RiStore2Fill,
      onClick: () => {
        setFieldValue('amount', '');
        setSelectedLoanCategory('wholesalers');
      }
    },
    {
      value: 'smes',
      label: 'SMEs',
      icon: RiCommunityFill,
      onClick: () => {
        setFieldValue('amount', '');
        setSelectedLoanCategory('smes');
      }
    }
  ];

  useEffect(() => {
    switch (selectedLoanCategory) {
      case 'retail':
        setFieldValue('interestRate', '7%');
        break;
      case 'wholesalers':
        setFieldValue('interestRate', '6%');
        break;
      case 'smes':
        setFieldValue('interestRate', '5%');
        break;
    }
  }, [selectedLoanCategory, setFieldValue]);

  return (
    <>
      <Grid
        templateColumns={{ base: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
        columnGap={[2, 5]}
        rowGap='10px'
      >
        {loanCategoryOptions.map((option) => (
          <GridItem key={option.value}>
            <Button
              onClick={option.onClick}
              variant={option.value === selectedLoanCategory ? 'primary' : 'secondary'}
              className={
                option.value === selectedLoanCategory
                  ? 'selected loan-category-option'
                  : 'loan-category-option'
              }
            >
              <Box as='span'>
                <Icon as={option.icon} fontSize='20px' />
                {option.label}
              </Box>
            </Button>
          </GridItem>
        ))}
        <FormError error={errors.interestRate} touched={touched.interestRate} />
      </Grid>
      <Box mt={4}>
        <FormikProvider value={formik}>
          <Form>
            <Stack spacing={5}>
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

              <FormSelect
                label='Loan period'
                name='loanPeriod'
                id='loan-period'
                options={[
                  {
                    label: '',
                    value: ''
                  },
                  {
                    label: '1 months',
                    value: '10'
                  },
                  {
                    label: '2 months',
                    value: '20'
                  },
                  {
                    label: '3 months',
                    value: '30'
                  },
                  {
                    label: '4 months',
                    value: '40'
                  },
                  {
                    label: '5 months',
                    value: '50'
                  },
                  {
                    label: '5 months',
                    value: '60'
                  }
                ]}
                value={values.loanPeriod}
                onChange={handleChange}
                errorMessage={errors.loanPeriod}
                touchedField={touched.loanPeriod}
              />

              <FormInput
                label='Interest rate'
                name='interestRate'
                id='interest-rate'
                readonly={true}
                value={values.interestRate}
                handleChange={handleChange}
                touchedField={touched.interestRate}
              />
            </Stack>

            <Stack direction='row' mt='30px' gap={3}>
              {props.shouldCalculate ? (
                <Button w='full' type='submit'>
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

export default TakeLoanMonthlyForm;
