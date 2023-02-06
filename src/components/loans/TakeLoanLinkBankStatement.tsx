import { ReactComponent as Spinner } from '@/assets/svg/spinner.svg';
import {
  Card,
  DropzoneFileUpload,
  FormError,
  FormInput,
  NextCancelButton
} from '@/components/common';
import FormTextArea from '@/components/common/input/form-textarea';
import { SpinnerStyle } from '@/components/styles';
import { isObjectPropsEmpty, URL_PATTERN } from '@/utils/helpers';
import { Box, BoxProps, Button, Flex, Stack, Text } from '@chakra-ui/react';
import { Form, FormikProvider, useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { RiCheckboxCircleLine } from 'react-icons/ri';
import { useReadLocalStorage } from 'usehooks-ts';
import * as Yup from 'yup';

interface Props extends BoxProps {
  onBack: () => void;
  onSubmit: () => void;
  showCancelBtn?: boolean;
  showSocialHandles?: boolean;
  props?: BoxProps;
}

interface BankStatementValues {
  reason: string;
  facebookHandle: string;
  twitterHandle: string;
  instagramHandle: string;
  hasLinkedBankStatement: boolean;
  bankStatementFile?: string;
}
const TakeLoanLinkBankStatement = ({
  showCancelBtn = true,
  showSocialHandles = true,
  onBack,
  onSubmit,
  ...props
}: Props) => {
  const [bankLinkText, setBankLinkText] = useState('Click to link your Bank Statement (Mono)');
  const [bankLinkLoading, setBankLinkLoading] = useState(false);
  const [bankLinkSuccess, setBankLinkSuccess] = useState(false);

  const userEmail = useReadLocalStorage('email');
  const hasLoan = userEmail === 'johndoe@email.com';

  const formik = useFormik<BankStatementValues>({
    initialValues: {
      reason: '',
      facebookHandle: '',
      twitterHandle: '',
      instagramHandle: '',
      hasLinkedBankStatement: false,
      bankStatementFile: ''
    },
    onSubmit: async (values) => {
      console.log(values);
      onSubmit();
    },
    validationSchema: showSocialHandles
      ? Yup.object<Record<keyof BankStatementValues, Yup.AnySchema>>({
          reason: Yup.string().required('Please fill this field'),
          facebookHandle: Yup.string().matches(URL_PATTERN, 'Enter a valid URL'),
          // .required('Facebook Handle is required'),
          twitterHandle: Yup.string().matches(URL_PATTERN, 'Enter a valid URL'),
          // .required('Twitter Handle is required'),
          instagramHandle: Yup.string().matches(URL_PATTERN, 'Enter a valid URL'),
          // .required('Instagram Handle is required')
          hasLinkedBankStatement: Yup.boolean().oneOf([true], 'Link your bank statement'),
          bankStatementFile: Yup.mixed()
        })
      : Yup.object<Record<keyof BankStatementValues, Yup.AnySchema>>({
          reason: Yup.string().required('Please fill this field'),
          facebookHandle: Yup.string().matches(URL_PATTERN, 'Enter a valid URL'),
          // .required('Facebook Handle is required'),
          twitterHandle: Yup.string().matches(URL_PATTERN, 'Enter a valid URL'),
          // .required('Twitter Handle is required'),
          instagramHandle: Yup.string().matches(URL_PATTERN, 'Enter a valid URL'),
          // .required('Instagram Handle is required')
          hasLinkedBankStatement: Yup.boolean().oneOf([true], 'Link your bank statement'),
          bankStatementFile: Yup.mixed().required('Upload your bank statement')
        })
  });
  const { values, errors, touched, handleChange, setFieldValue } = formik;

  useEffect(() => {
    // TODO: ask UX guy if bank statement upload is optional
    if (!showSocialHandles) setFieldValue('hasLinkedBankStatement', true);
  }, [setFieldValue, showSocialHandles]);

  return (
    <Card borderColor={['transparent', 'gray.100']} py={[0, 4]} px={[0, 7]} {...props}>
      <Text color='gray.300' textStyle='sm'>
        Please fill the following details to collect your loan
      </Text>
      <Box mt={['30px', '46px']}>
        <FormikProvider value={formik}>
          <Form>
            <Stack spacing={5}>
              <FormTextArea
                id='reason'
                name='reason'
                label='Why do you want to collect this loan?'
                placeholder='Reason for loan...'
                errorMessage={errors.reason}
                touchedField={touched.reason}
                value={values.reason}
                handleChange={handleChange}
              />
              {!hasLoan && showSocialHandles && (
                <>
                  <FormInput
                    id='facebookHandle'
                    name='facebookHandle'
                    label='Facebook Handle'
                    placeholder='http://www.facebook.com/'
                    errorMessage={errors.facebookHandle}
                    touchedField={touched.facebookHandle}
                    value={values.facebookHandle}
                    handleChange={handleChange}
                    type='url'
                  />
                  <FormInput
                    id='twitterHandle'
                    name='twitterHandle'
                    label='Twitter Handle'
                    placeholder='http://www.twitter.com/'
                    errorMessage={errors.twitterHandle}
                    touchedField={touched.twitterHandle}
                    value={values.twitterHandle}
                    handleChange={handleChange}
                    type='url'
                  />
                  <FormInput
                    id='instagramHandle'
                    name='instagramHandle'
                    label='Instagram Handle'
                    placeholder='http://www.instagram.com/'
                    errorMessage={errors.instagramHandle}
                    touchedField={touched.instagramHandle}
                    value={values.instagramHandle}
                    handleChange={handleChange}
                    type='url'
                  />
                </>
              )}
              <Box>
                {showSocialHandles ? (
                  <Button
                    w='full'
                    bgColor='yellow.DEFAULT'
                    color='darkblue.DEFAULT'
                    sx={{
                      _hover: {
                        bgColor: 'yellow.800 !important'
                      },
                      _active: {
                        bgColor: 'yellow.DEFAULT !important'
                      }
                    }}
                    onClick={() => {
                      if (!bankLinkSuccess) {
                        setFieldValue('hasLinkedBankStatement', true);
                        setBankLinkLoading(true);
                        setTimeout(() => {
                          setBankLinkLoading(false);
                          setBankLinkText('Bank Statement linked Successfully');
                          setBankLinkSuccess(true);
                        }, 2000);
                      }
                    }}
                  >
                    {bankLinkLoading ? (
                      <SpinnerStyle>
                        <Spinner />
                      </SpinnerStyle>
                    ) : (
                      <>
                        <Flex
                          gap={3}
                          alignItems='center'
                          textStyle='sm'
                          fontWeight={600}
                          color='darkblue.DEFAULT'
                        >
                          {bankLinkSuccess && <RiCheckboxCircleLine fontSize='20px' />}
                          <Text>{bankLinkText}</Text>
                        </Flex>
                      </>
                    )}
                  </Button>
                ) : (
                  <DropzoneFileUpload
                    name='bankStatementFile'
                    setFieldValue={setFieldValue}
                    label='Upload your Bank Statement'
                    // labelSubText='(showing your current house address)'
                    errorMessage={errors.bankStatementFile}
                    touchedField={touched.bankStatementFile}
                    fileSize={5}
                  />
                )}

                {showSocialHandles && (
                  <Box>
                    <FormError
                      error={errors.hasLinkedBankStatement}
                      touched={touched.hasLinkedBankStatement}
                    />
                  </Box>
                )}
              </Box>
            </Stack>
            <Stack direction='row' mt='22px' gap={3}>
              <NextCancelButton
                onCancel={onBack}
                hasErrors={Object.keys(errors).length > 0 || isObjectPropsEmpty(values)}
                showCancelBtn={showCancelBtn}
              />
            </Stack>
          </Form>
        </FormikProvider>
      </Box>
    </Card>
  );
};

export default TakeLoanLinkBankStatement;
