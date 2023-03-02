import { useAppSelector } from '@/app/hooks';
import { Card, FormInput, NextCancelButton } from '@/components/common';
import { NextCancelProps } from '@/components/common/button/NextCancelButton';
import { formatCurrency, isObjectPropsEmpty } from '@/utils/helpers';
import { Stack } from '@chakra-ui/react';
import { Form, FormikProvider, useFormik } from 'formik';
interface Props {
  onCancel?: () => void;
  onSubmit: () => void;
  onCalculate?: () => void;
  showCancelBtn?: boolean;
  formButtonProps?: NextCancelProps;
}
interface TakeLoanDetailsFormValues {
  loanAmount: string;
  loanType: string;
  period: string;
  interestRate: string;
  amountToPay: string;
}
const TakeLoanDetails = ({ onCancel, onSubmit, showCancelBtn = true, formButtonProps }: Props) => {
  const { loan_amount, loan_interest_id, loan_term } = useAppSelector(
    (state) => state.loan.loanRequest
  );
  const formik = useFormik<TakeLoanDetailsFormValues>({
    initialValues: {
      loanAmount: 'N1,200,000',
      loanType: 'Retail',
      period: '6 months',
      interestRate: '2%',
      amountToPay: 'N1,239,000'
    },
    onSubmit: async (values) => {
      console.log(values);
      onSubmit();
    }
  });
  const { values, errors, touched, handleChange } = formik;

  return (
    <Card
      maxW={{ base: '100%', md: '444px' }}
      borderColor={['transparent', 'gray.100']}
      py={[0, 4]}
      px={[0, 7]}
    >
      <FormikProvider value={formik}>
        <Form>
          <Stack spacing={5}>
            <FormInput
              readonly
              id='loan-amount'
              name='loanAmount'
              label='Loan amount'
              errorMessage={errors.loanAmount}
              touchedField={touched.loanAmount}
              value={formatCurrency(loan_amount).toString()}
              handleChange={handleChange}
            />
            <FormInput
              readonly
              id='loan-type'
              name='loanType'
              label='Loan Type'
              errorMessage={errors.loanType}
              touchedField={touched.loanType}
              value={values.loanType}
              handleChange={handleChange}
            />
            <FormInput
              readonly
              id='loan-period'
              name='period'
              label='Loan period'
              errorMessage={errors.period}
              touchedField={touched.period}
              value={`${loan_term} month${loan_term > 1 ? 's' : ''}`}
              handleChange={handleChange}
            />
            <FormInput
              readonly
              id='interest-rate'
              name='interestRate'
              label='Interest rate'
              errorMessage={errors.interestRate}
              touchedField={touched.interestRate}
              value={loan_interest_id.toString()}
              handleChange={handleChange}
            />
            {/* <FormInput
              readonly
              id='amount-to-pay'
              name='amountToPay'
              label='Loan amount'
              errorMessage={errors.amountToPay}
              touchedField={touched.amountToPay}
              value={values.amountToPay}
              handleChange={handleChange}
            /> */}
          </Stack>
          <Stack direction='row' mt='22px' gap={3}>
            <NextCancelButton
              {...formButtonProps}
              onCancel={onCancel ? onCancel : () => null}
              hasErrors={Object.keys(errors).length > 0 || isObjectPropsEmpty(values)}
              showCancelBtn={showCancelBtn}
            />
          </Stack>
        </Form>
      </FormikProvider>
    </Card>
  );
};

export default TakeLoanDetails;
