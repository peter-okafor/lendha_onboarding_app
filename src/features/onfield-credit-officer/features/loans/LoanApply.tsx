import { PageHeader2 } from '@/components';
import { Alert, Card } from '@/components/common';
import { LoanCalculator } from '@/components/loans';
import {
  TakeLoanDetails,
  // TakeLoanGuarantorForm,
  TakeLoanLinkBankStatement
} from '@/components/loans';
import { path } from '@/routes/path';
import { globalStyles } from '@/theme/styles';
import { Box, Button, Divider, Flex, Icon, Stack, Text, useMediaQuery } from '@chakra-ui/react';
import { useState } from 'react';
import { RiArrowLeftLine, RiCheckLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

const LoanApply = () => {
  const [step, setStep] = useState<'form' | 'bank' | 'guarantor' | 'confirm' | 'success'>('form');
  const navigate = useNavigate();

  const CARD_WIDTH = { base: 'full', md: '400px', lg: '520px' };

  const [isLargerThan810] = useMediaQuery(`(min-width: 810px)`);

  return (
    <Flex
      justifyContent='center'
      sx={{
        h2: {
          mb: 0
        },
        // hide the addon
        '.chakra-input__left-element': {
          display: 'none'
        },
        '#phone': {
          pl: { base: 4 },
          color: 'black.DEFAULT'
        }
      }}
    >
      <Box
        sx={{
          '.card': {
            w: CARD_WIDTH,
            maxW: CARD_WIDTH,
            border: { base: 'none', md: '1px solid' },
            borderColor: 'gray.100 !important',
            borderRadius: '10px',
            boxShadow: '0px 4px 40px -23px rgba(26, 31, 76, 0.15)',
            py: { base: 0, md: '26px' },
            px: { base: 4, md: 8 }
          }
        }}
        w={['full', 'revert']}
      >
        <Box mb={[0, '27px']} className='lendha__container'>
          <Stack
            direction='row'
            justifyContent={['normal', 'center']}
            spacing={[0, '18px']}
            mb={['2px', '4px']}
          >
            <Icon
              display={['none', 'inline-block']}
              mt={[0, '2px']}
              as={RiArrowLeftLine}
              color='gray.300'
              cursor='pointer'
              fontSize={['20px', '24px']}
              onClick={() => {
                switch (step) {
                  case 'form':
                    navigate(path.CREDIT_OFFICER_LOANS);
                    break;
                  case 'bank':
                    setStep('form');
                    break;
                  case 'guarantor':
                    setStep('bank');
                    break;
                  case 'confirm':
                    setStep('guarantor');
                    break;
                  case 'success':
                    navigate(path.CREDIT_OFFICER_LOANS);
                    break;

                  default:
                    navigate(path.CREDIT_OFFICER_LOANS);
                    break;
                }
              }}
            />
            <PageHeader2 text={step === 'success' ? 'Application Successful' : 'Apply for Loan'} />
          </Stack>
          {step !== 'success' && (
            <Text
              color='gray.300'
              fontWeight={500}
              textAlign={['left', 'center']}
              textStyle={['xs', 'base']}
            >
              Apply for a loan, get credited in 3 hours
            </Text>
          )}
        </Box>
        <Divider display={['block', 'none']} mt={4} mb={7} color='gray.100' />
        {step !== 'success' ? (
          <>
            {step === 'form' && (
              <Card
                px={{ base: 2, md: 8 }}
                py={{ base: 5, md: 8 }}
                sx={{
                  '.chakra-tabs__tablist': {
                    mx: { base: 'auto', md: '0' }
                  }
                }}
              >
                <LoanCalculator
                  showCancelBtn={!isLargerThan810 ? true : false}
                  onSubmit={() => setStep('bank')}
                  onBack={() => navigate(path.CREDIT_OFFICER_LOANS)}
                />
              </Card>
            )}

            {step === 'bank' && (
              <TakeLoanLinkBankStatement
                onBack={() => setStep('form')}
                onSubmit={() => setStep('confirm')}
                showCancelBtn={!isLargerThan810 ? true : false}
                showSocialHandles={false}
              />
            )}

            {/* {step === 'guarantor' && (
              <TakeLoanGuarantorForm
                onBack={() => setStep('bank')}
                onSubmit={() => setStep('confirm')}
                sx={{
                  h2: {
                    color: 'black.DEFAULT',
                    fontWeight: 500,
                    textStyle: 'base'
                  }
                }}
                showCancelBtn={!isLargerThan810 ? true : false}
              />
            )} */}

            {step === 'confirm' && (
              <TakeLoanDetails
                onSubmit={() => setStep('success')}
                showCancelBtn={!isLargerThan810 ? true : false}
              />
            )}
          </>
        ) : (
          <Card>
            <Alert
              icon={<RiCheckLine color={`${globalStyles.colors.yellow.DEFAULT}`} fontSize='70px' />}
              description={
                <Box>
                  <Text
                    maxW={['240px', '284px']}
                    textStyle={['sm', 'lg']}
                    mx='auto'
                    textAlign='center'
                  >
                    Your loan request is being reviewed. We&apos;ll get in touch soon
                  </Text>
                </Box>
              }
            >
              <Button
                size='md'
                onClick={() => navigate(path.CREDIT_OFFICER_LOANS)}
                textTransform='none'
                w='full'
              >
                Back to Loans
              </Button>
            </Alert>
          </Card>
        )}
      </Box>
    </Flex>
  );
};

export default LoanApply;
