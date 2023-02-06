import { LendhaTabList as TabList, Tab as LendhaTab } from '@/components/common';
import { Box, BoxProps, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react';
import TakeLoanMonthlyForm from './TakeLoanMonthlyForm';
import TakeLoanWeeklyDailyForm from './TakeLoanWeeklyDailyForm';

interface Props extends BoxProps {
  onSubmit?: () => void;
  onBack?: () => void;
  shouldCalculate?: boolean;
  showCancelBtn?: boolean;
}
const LoanCalculator = ({ shouldCalculate = false, ...props }: Props) => {
  return (
    <>
      {shouldCalculate && (
        <Text
          fontFamily='Poppins'
          fontWeight={600}
          fontSize={['xl', '2xl']}
          mb={[6, 7]}
          textAlign={['center', 'left']}
        >
          Loan Calculator
        </Text>
      )}
      <Tabs
        variant='unstyled'
        sx={{
          '.chakra-tabs__tab-panel': {
            p: 0,
            mt: 4
          },
          'button.loan-category-option span': {
            display: 'inline-flex',
            gap: 2,
            textStyle: 'sm',
            alignItems: 'center',
            fontWeight: 700
          },
          'button.loan-category-option': {
            color: 'gray.200',
            _hover: {
              color: 'white'
            }
          },
          'button.loan-category-option.selected': {
            color: 'white'
          }
        }}
      >
        <TabList>
          <LendhaTab>Monthly Loan</LendhaTab>
          <LendhaTab>Weekly/Daily Loan</LendhaTab>
        </TabList>
        <Box>
          <TabPanels>
            <TabPanel>
              <TakeLoanMonthlyForm
                showCancelBtn={props.showCancelBtn}
                onSubmit={props.onSubmit ? props.onSubmit : () => null}
                onGoBack={props.onBack ? props.onBack : () => null}
                shouldCalculate={shouldCalculate}
              />
            </TabPanel>
            <TabPanel>
              <TakeLoanWeeklyDailyForm
                showCancelBtn={props.showCancelBtn}
                onSubmit={props.onSubmit ? props.onSubmit : () => null}
                onGoBack={props.onBack ? props.onBack : () => null}
                shouldCalculate={shouldCalculate}
              />
            </TabPanel>
          </TabPanels>
        </Box>
      </Tabs>
    </>
  );
};

export default LoanCalculator;
