import { LoanInterest, useLoanInterestsQuery } from '@/app/services/misc';
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

export type LoanValues = {
  amount: string;
  duration: string;
  loanType: string;
  interestRate: string;
};

const getCategoryIcon = (id: number) => {
  if (id === 1) return RiShoppingBagFill;
  else if (id === 2) return RiStore2Fill;
  else return RiCommunityFill;
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
  const { data: interests } = useLoanInterestsQuery();

  const [loanCategories, setLoanCategories] = useState<LoanInterest[]>([]);

  useEffect(() => {
    if (interests?.data) {
      setLoanCategories((prev) => [
        ...prev,
        ...interests.data.map(
          ({
            id,
            interest,
            purpose,
            minimum_amount,
            maximum_amount,
            repayment_duration,
            moratorium
          }) => ({
            id,
            interest,
            purpose,
            minimum_amount,
            maximum_amount,
            repayment_duration,
            moratorium
          })
        )
      ]);
    }
  }, [interests?.data]);

  const [selectedLoanCategory, setSelectedLoanCategory] = useState<number>(0);

  const [loanMinAmount, setLoanMinAmount] = useState(50_000);
  const [loanMaxAmount, setLoanMaxAmount] = useState(1_000_000);

  useEffect(() => {
    setLoanMinAmount(loanCategories[selectedLoanCategory - 1]?.minimum_amount);
    setLoanMaxAmount(loanCategories[selectedLoanCategory - 1]?.maximum_amount);
  }, [loanCategories, selectedLoanCategory]);

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

  const loanCategoryOptions = loanCategories.map((category) => ({
    value: category.id,
    label: category.purpose,
    icon: getCategoryIcon(category.id),
    onClick: () => {
      setFieldValue('amount', '');
      setFieldValue('interestRate', category.interest);
      setSelectedLoanCategory(category.id);
    }
  }));

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
