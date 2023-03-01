import { useGetUserDetailQuery } from '@/app/services/onboardingOfficer';
import Placeholder from '@/assets/loan-placeholder.png';
import Image1 from '@/assets/site/home/woman6.png';
import { LendhaModal } from '@/components/common';
import { Flex, Image, Stack, useDisclosure, useMediaQuery } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { Avatar, LoanHistoryTable, LoanInfo, LoanInfoContainer } from '../../components';
import { LoanAction } from '../loans';

const UserProfile = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const mx = { base: 3, lg: 0 };
  const emailW = {
    whiteSpace: 'normal !important',
    maxW: { base: '90% !important', lg: '300px !important' }
  };
  const [isLargerThan810] = useMediaQuery(`(min-width: 810px)`);

  const { id } = useParams();
  const { data: response } = useGetUserDetailQuery({ user_id: Number(id) });

  const user = response?.data;

  const bank = user?.bank;
  const homeAddress = user?.home_address;
  const business = user?.business;
  const socialMedia = user?.social_media_handles;

  return (
    <>
      <LoanAction mx={mx} hasRightAction={false} />

      <Flex flexDir='column' gap={5} mt={4}>
        <LoanInfoContainer
          w='auto'
          mx={mx}
          label='Basic Customer Info'
          collapsible
          collapsedItems={
            <Stack mt={5} spacing={7}>
              <Flex
                gap={[5, '34px']}
                flexDir={['column', 'row']}
                sx={{
                  p: {
                    maxW: 'full !important',
                    whiteSpace: 'pre-wrap'
                  }
                }}
              >
                <LoanInfo label='BVN' text={bank?.bvn || 'N/A'} />
                <LoanInfo label='NIN' text={bank?.nin || 'N/A'} />
                <LoanInfo
                  label='Home Address'
                  text={`${homeAddress?.number || 'N/A'} ${homeAddress?.street_name || 'N/A'} ${
                    homeAddress?.landmark || 'N/A'
                  } ${homeAddress?.city || 'N/A'} ${homeAddress?.local_government || 'N/A'} ${
                    homeAddress?.state || 'N/A'
                  }`}
                />
              </Flex>
              <Flex gap={[5, '34px']} flexDir={['column', 'row']}>
                <LoanInfo label='Registration date' text={user?.created_at} />
                <Flex gap={[5, '34px']}>
                  <LoanInfo label='Utility bill' hasImg onImgClick={onOpen} />
                  <LoanInfo
                    label='Valid Government Issued ID'
                    hasImg
                    onImgClick={onOpen}
                    labelProps={{
                      whiteSpace: 'nowrap'
                    }}
                  />
                </Flex>
                {/* <LoanInfo label='Proof of residence' hasImg onImgClick={onOpen} /> */}
              </Flex>
            </Stack>
          }
        >
          <Flex flexDir={['column', 'row']} gap={10}>
            <Flex gap='18px' alignItems={['flex-end', 'normal']} flexWrap='wrap'>
              <Avatar onImgClick={onOpen} cursor='pointer' src={Image1} />
              <LoanInfo label='Full name' text={user?.name || 'N/A'} />
            </Flex>
            <Flex gap={10}>
              <LoanInfo label='Phone number' text={user?.phone_number || 'N/A'} />
              {isLargerThan810 ? (
                <LoanInfo
                  label='Email address'
                  text={user?.email || 'N/A'}
                  textProps={{
                    sx: emailW
                  }}
                />
              ) : (
                <LoanInfo label='Date of birth' text={user?.date_of_birth} />
              )}
            </Flex>
            {isLargerThan810 ? (
              <LoanInfo label='Date of birth' text={user?.date_of_birth} />
            ) : (
              <LoanInfo
                label='Email address'
                text={user?.email || 'N/A'}
                textProps={{
                  sx: emailW
                }}
              />
            )}
          </Flex>
        </LoanInfoContainer>

        <LoanInfoContainer
          mx={mx}
          w='auto'
          label='Basic Business Info'
          collapsible
          collapsedItems={
            <Stack mt={5} spacing={7}>
              <Flex
                gap={[5, '34px']}
                flexDir={['column', 'row']}
                sx={{
                  p: {
                    maxW: 'full !important',
                    whiteSpace: 'pre-wrap'
                  }
                }}
              >
                <LoanInfo label='Business category' text={business?.category || 'N/A'} />
                <LoanInfo
                  label='Business Address'
                  text={`${business?.address_number || 'N/A'} ${business?.street || 'N/A'} ${
                    business?.landmark || 'N/A'
                  } ${business?.city || 'N/A'} ${business?.state || 'N/A'}`}
                />
              </Flex>
              <Flex gap={[5, '34px']} flexDir={['column', 'row']}>
                <Flex gap={[5, '34px']}>
                  <LoanInfo label='Business place' hasImg onImgClick={onOpen} />
                  <LoanInfo label='Certificate of Incorporation' hasImg onImgClick={onOpen} />
                </Flex>
                <LoanInfo label='Business Place Receipt' hasImg onImgClick={onOpen} />
              </Flex>
              <Flex
                gap={[5, '34px']}
                flexDir={['column', 'row']}
                sx={{
                  p: {
                    maxW: 'full !important',
                    whiteSpace: 'pre-wrap'
                  }
                }}
              >
                <LoanInfo label='Registration number' text='RC-847293223234' />
                <LoanInfo
                  label='Other sources of income'
                  text='I sell vegetable at a vegetable market. They buy vegetable from another vegetable market and so on and so forth hence, line break'
                />
              </Flex>
            </Stack>
          }
        >
          <Flex flexDir={['column', 'row']} gap={[5, 10]}>
            <LoanInfo label='Business name' text={business?.name} />
            <LoanInfo
              label='LinkedIn'
              text={socialMedia?.linkedin}
              isLink
              linkPath={socialMedia?.linkedin}
              linkProps={{
                textDecor: 'underline'
              }}
            />
            <LoanInfo
              label='Instagram'
              text={socialMedia?.instagram}
              isLink
              linkPath={socialMedia?.instagram}
              linkProps={{
                textDecor: 'underline'
              }}
            />
            <LoanInfo
              label='Facebook'
              text={socialMedia?.facebook}
              isLink
              linkPath={socialMedia?.facebook}
              linkProps={{
                textDecor: 'underline'
              }}
            />
          </Flex>
        </LoanInfoContainer>

        <LoanInfoContainer label='Credit Officer' mx={mx} w='auto'>
          <Flex gap={[5, '58px']} flexDirection={['column', 'row']}>
            <Flex gap='18px' alignItems={['flex-end', 'normal']}>
              <Avatar onImgClick={onOpen} cursor='pointer' src={Image1} />
              <LoanInfo label='Full name' text='Jude Okorocha' />
            </Flex>
            <LoanInfo label='Phone number' text='08098989898' />
            <LoanInfo label='Email address' text='Jude@mail.com' />
          </Flex>
        </LoanInfoContainer>

        <LoanHistoryTable
          data={[
            {
              id: '00123R',
              date: '1st Jul, 2022',
              amount: 20000,
              status: 'active'
            },
            {
              id: '00123R',
              date: '2nd Jul, 2022',
              amount: 40000,
              status: 'rejected'
            },
            {
              id: '00123R',
              date: '4th Jul, 2022',
              amount: 60000,
              status: 'paid'
            }
          ]}
          mt={3}
        />
      </Flex>

      <LendhaModal
        p={0}
        size='xl'
        isOpen={isOpen}
        onClose={onClose}
        showCloseButton={false}
        sx={{
          '.chakra-modal__body': {
            p: 0
          }
        }}
      >
        <Image w='full' h='full' src={Image1} fallbackSrc={Placeholder} />
      </LendhaModal>
    </>
  );
};

export default UserProfile;
