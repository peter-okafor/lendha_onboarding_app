import { Card, FormInput } from '@/components/common';
import { Avatar, Box, Stack, Text } from '@chakra-ui/react';
import { Form, FormikProvider, useFormik } from 'formik';

const CreditOfficer = () => {
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
                  <Avatar size='2xl' name='John Doe' src='https://bit.ly/kent-c-dodds' />
                </Stack>
                <FormInput
                  name='firstName'
                  id='first-name'
                  label='First name'
                  readonly
                  value='Joshua'
                />
                <FormInput name='lastName' id='last-name' label='Last name' readonly value='Eki' />
                <FormInput
                  name='email'
                  id='email'
                  label='Email address'
                  readonly
                  value='joshua@mail.com'
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
