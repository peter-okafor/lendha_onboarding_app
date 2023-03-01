import { Customer, getUserDetail, useGetLoanDetailQuery } from '@/app/services/onboardingOfficer';
import { CopyToClipboard, DropzoneFileUpload, FormInput, LendhaModal } from '@/components/common';
import { path } from '@/routes/path';
import { globalStyles } from '@/theme/styles';
import { formatCurrency, maskCurrency } from '@/utils/helpers';
import { ACCOUNT_NAME, ACCOUNT_NUMBER, BANK_NAME } from '@/variables/general';
import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  GridItem,
  InputRightElement,
  Stack,
  Text
} from '@chakra-ui/react';
import { Form, FormikProps, FormikProvider, useFormik } from 'formik';
import { FormEvent, useEffect, useState } from 'react';
import { RiCheckLine } from 'react-icons/ri';
import { useNavigate, useParams } from 'react-router-dom';
import { useReadLocalStorage } from 'usehooks-ts';
import * as Yup from 'yup';
import {
  LoanInfo,
  LoanInfoContainer,
  LoanStageHistoryTimeLine,
  LoanStatusTimeline,
  PayLoanOption
} from '../../components';
import LoanAction from './LoanAction';

// type PayLoanViaWalletValues = {
//   amount: string;
// };
type PayLoanViaTransferValues = {
  amount: string;
  paymentReceipt: string;
};
const PayLoan = () => {
  const userEmail = useReadLocalStorage('email');

  const [payloanModalOpen, setPayloanModalOpen] = useState(false);
  const [paymentStep, setPaymentStep] = useState<
    'form' | 'wallet' | 'transfer' | 'details' | 'success'
  >('form');

  const isPaymentTypeSet = paymentStep !== 'form';

  const payViaTransferFormik: FormikProps<PayLoanViaTransferValues> =
    useFormik<PayLoanViaTransferValues>({
      initialValues: {
        amount: '',
        paymentReceipt: ''
      },
      onSubmit: async (values) => {
        if (userEmail !== 'creditofficer@email.com') {
          return transferSetFieldError('amount', 'Insufficient funds');
        }
        console.log(values);
        setPaymentStep('success');
      },
      validationSchema: Yup.object<Record<keyof PayLoanViaTransferValues, Yup.AnySchema>>({
        amount: Yup.string().required('Amount is required'),
        paymentReceipt: Yup.mixed().required('Payment receipt is required')
      })
    });

  const {
    values: transferValues,
    errors: transferErrors,
    touched: transferTouched,
    setFieldValue: transferSetFieldValue,
    setFieldError: transferSetFieldError,
    resetForm: transferResetForm
  } = payViaTransferFormik;

  const onPayLoan = () => {
    setPayloanModalOpen(true);
    setPaymentStep('transfer');
    // resetForm();
    transferResetForm();
  };

  const navigate = useNavigate();
  const mx = { base: 3, lg: 0 };

  const { id } = useParams();
  const { data: response, isSuccess } = useGetLoanDetailQuery({ loan_id: Number(id) });
  const loan = response?.data;

  const [customer, setCustomer] = useState<Customer>();

  const [trigger] = getUserDetail.useLazyQuerySubscription();

  useEffect(() => {
    if (isSuccess) {
      trigger(
        {
          user_id: Number(loan?.user_id)
        },
        true
      ).then((res) => setCustomer(res?.data?.data));
    }
  }, [isSuccess, loan?.user_id, trigger]);

  return (
    <>
      <LoanAction mx={mx} onPayLoan={onPayLoan} />

      <LoanInfoContainer w='auto' mt='14px' label='Basic Application info' mx={mx}>
        <Grid
          templateColumns={['repeat(2, 1fr)', 'repeat(6, 1fr)']}
          rowGap={{ base: 5, md: 0 }}
          w='full'
        >
          <GridItem>
            <LoanInfo label='Application ID' text={loan?.application_id || 'N/A'} />
          </GridItem>
          <GridItem>
            <LoanInfo
              isLink
              label='Customer name'
              text={customer?.name}
              linkPath={path.CUSTOMER_PROFILE}
              linkProps={{
                textDecor: 'underline'
              }}
              isExternal={false}
            />
          </GridItem>
          <GridItem>
            <LoanInfo
              label='Loan amount'
              text={formatCurrency(loan?.approved_amount || 0).toString()}
            />
          </GridItem>
          <GridItem>
            <LoanInfo label='Application date' text={loan?.request_date} />
          </GridItem>
          <GridItem>
            <LoanInfo label='Current Status' text={loan?.status} />
          </GridItem>
          <GridItem>
            <LoanInfo label='Loan type' text={loan?.purpose} />
          </GridItem>
        </Grid>
      </LoanInfoContainer>

      <LoanStageHistoryTimeLine display={['none', 'block']} mt={5} mx={mx} />

      <Stack spacing={4} mt={12} mx={mx}>
        <LoanStatusTimeline comment='Declined' status='declined' />
        <LoanStatusTimeline comment='Paid' status='paid' />
        <LoanStatusTimeline comment='Disbursed' status='success' />
        <LoanStatusTimeline comment='Approved' status='success' />
        <LoanStatusTimeline comment='Business verified' status='success' />
        <LoanStatusTimeline comment='Guarantor Approved' status='success' />
        <LoanStatusTimeline comment='Reviewed' status='success' />
      </Stack>

      <LendhaModal
        w='324px'
        isOpen={payloanModalOpen}
        header={
          <Flex gap='86px' textStyle='base' alignItems='flex-start' justifyContent='center'>
            <Stack>
              <Text color='black' fontWeight={700} textAlign='center'>
                Pay loan
              </Text>

              <Text as='span' textStyle='xs'>
                {paymentStep === 'transfer' && 'Via Transfer'}
                {(paymentStep === 'wallet' || paymentStep === 'details') && 'Fund wallet'}
              </Text>
            </Stack>
          </Flex>
        }
        onClose={() => setPayloanModalOpen(false)}
      >
        {!isPaymentTypeSet ? (
          <Stack spacing={5}>
            {/* <PayLoanOption onClick={() => setPaymentStep('wallet')} text='Pay from wallet' /> */}
            <PayLoanOption onClick={() => setPaymentStep('transfer')} text='Transfer' />
          </Stack>
        ) : (
          <>
            {paymentStep === 'details' && (
              <>
                <Stack
                  spacing='18px'
                  textAlign='center'
                  sx={{
                    span: {
                      textStyle: 'xs'
                    },
                    p: {
                      color: 'darkblue.DEFAULT',
                      fontWeight: 600,
                      textStyle: 'xl'
                    }
                  }}
                >
                  <Stack spacing={0}>
                    <Text as='span'>Bank</Text>
                    <Text>Zenith Bank</Text>
                  </Stack>
                  <Stack spacing={0}>
                    <Text as='span'>Account number</Text>
                    <Text>1234567890</Text>
                  </Stack>
                  <Stack spacing={0}>
                    <Text as='span'>Account name</Text>
                    <Text>John Doe</Text>
                  </Stack>
                </Stack>
                <Divider color='gray.100' my='25px' />
                <Text fontWeight={700} textAlign='center' textStyle='base' mb={4}>
                  Or Pay loan via transfer
                </Text>
                <BankInfo />
              </>
            )}

            {paymentStep === 'transfer' && (
              <>
                <BankInfo />
                <Divider color='gray.100' my='25px' />
                <FormikProvider value={payViaTransferFormik}>
                  <Form>
                    <FormInput
                      pr={8}
                      label='Enter amount you transferred'
                      rightAddon={
                        <InputRightElement>
                          <Text
                            as='span'
                            color='gray.300'
                            fontWeight={600}
                            textStyle='base'
                            userSelect='none'
                          >
                            N
                          </Text>
                        </InputRightElement>
                      }
                      id='amount'
                      name='amount'
                      errorMessage={transferErrors.amount}
                      touchedField={transferTouched.amount}
                      value={transferValues.amount}
                      handleChange={(e: FormEvent<HTMLInputElement>) => {
                        let value = Number(e.currentTarget.value) || '';
                        value = maskCurrency(e.currentTarget.value);

                        transferSetFieldValue('amount', value);
                      }}
                    />
                    <Box mt={5}>
                      <DropzoneFileUpload
                        name='paymentReceipt'
                        setFieldValue={transferSetFieldValue}
                        label='Upload payment receipt'
                        errorMessage={transferErrors.paymentReceipt}
                        touchedField={transferTouched.paymentReceipt}
                        fileSize={5}
                      />
                    </Box>
                    <Button fontWeight={700} mt={5} fontSize='16px' w='full' type='submit'>
                      Pay Loan
                    </Button>
                  </Form>
                </FormikProvider>
              </>
            )}

            {paymentStep === 'success' && (
              <Box textAlign='center'>
                <Text textStyle='sm'>Thank you</Text>
                <Box
                  mt={5}
                  mb={4}
                  mx='auto'
                  border='1.89753px solid'
                  borderColor='darkblue.DEFAULT'
                  w='86px'
                  h='86px'
                  borderRadius='full'
                  display='flex'
                  justifyContent='center'
                >
                  <RiCheckLine
                    color={`${globalStyles.colors.yellow.DEFAULT}`}
                    fontSize='40px'
                    style={{ margin: 'auto' }}
                  />
                </Box>
                <Text maxW='180px' mx='auto' textStyle='sm'>
                  Loan payment is under review.
                </Text>
                <Button mt={5} w='full' onClick={() => navigate(path.CREDIT_OFFICER_LOANS)}>
                  Done
                </Button>
              </Box>
            )}
          </>
        )}
      </LendhaModal>
    </>
  );
};

export default PayLoan;

const BankInfo = () => {
  return (
    <Stack
      spacing='18px'
      textAlign='center'
      sx={{
        span: {
          textStyle: 'xs'
        },
        p: {
          color: 'darkblue.DEFAULT',
          fontWeight: 600,
          textStyle: 'xl'
        }
      }}
    >
      <Stack spacing={0}>
        <Text as='span'>Bank</Text>
        <Text>{BANK_NAME}</Text>
      </Stack>
      <Stack spacing={0}>
        <Text as='span'>Account number</Text>
        <Flex gap={4} justifyContent='flex-end'>
          <Text>{ACCOUNT_NUMBER}</Text>
          <CopyToClipboard text={ACCOUNT_NUMBER} />
        </Flex>
      </Stack>
      <Stack spacing={0}>
        <Text as='span'>Account name</Text>
        <Text>{ACCOUNT_NAME}</Text>
      </Stack>
    </Stack>
  );
};
