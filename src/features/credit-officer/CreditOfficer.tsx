import { useProfileQuery } from '@/app/services/onboardingOfficer';
import { Card, FormInput } from '@/components/common';
import { Avatar, Box, Stack, Text } from '@chakra-ui/react';
import { Form, FormikProvider, useFormik } from 'formik';

const CreditOfficer = () => {
  const { data: response } = useProfileQuery();
  const officerProfile = response?.data;

  const firstName = officerProfile?.name.split(' ')[0];
  const lastName = officerProfile?.name.split(' ')[1];

  const formik = useFormik({
    initialValues: {},
    onSubmit: async (values) => {
      console.log(values);
    }
  });

  return (
    <Box>
      <Text textStyle='lg' fontFamily='Poppins' className='lendha__container'>
        Credit Officer
      </Text>
      <Box maxW={['100%', '434px']} mt={4} className='lendha__container'>
        <Card py={[4, 8]} px={[0, 7]}>
          <FormikProvider value={formik}>
            <Form>
              <Stack spacing={6}>
                <Stack spacing={1}>
                  <Text color='gray.300' textStyle='sm'>
                    Photo
                  </Text>
                  <Avatar
                    size='2xl'
                    name={officerProfile?.name}
                    src='https://bit.ly/kent-c-dodds'
                  />
                </Stack>
                <FormInput
                  name='firstName'
                  id='first-name'
                  label='First name'
                  readonly
                  value={firstName}
                />
                <FormInput
                  name='lastName'
                  id='last-name'
                  label='Last name'
                  readonly
                  value={lastName}
                />
                <FormInput
                  name='email'
                  id='email'
                  label='Email address'
                  readonly
                  value={officerProfile?.email}
                />
                {/* <FormInput
                  name='phone'
                  id='phone'
                  label='Phone number'
                  readonly
                  value='09091640897'
                /> */}
              </Stack>
            </Form>
          </FormikProvider>
        </Card>
      </Box>
    </Box>
  );
};

export default CreditOfficer;
