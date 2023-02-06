import { Box, Flex, Stack, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { RiArrowRightSLine } from 'react-icons/ri';
import { Link as ReactRouterLink } from 'react-router-dom';
import Card from './Card';

interface LinkCardProps {
  title: string;
  desc: string;
  link?: string;
  comingSoon?: boolean;
}
const MoneyOptionLinkCard = ({ comingSoon = false, title, desc, link = '#' }: LinkCardProps) => (
  <MoneyOptionLinkCardWrapper isComingSoon={comingSoon} to={comingSoon ? '#' : link}>
    <Card
      borderColor='gray.100'
      borderRadius='5px'
      px={4}
      py={['9px', '14px']}
      cursor={comingSoon ? 'default' : 'pointer'}
      userSelect='none'
    >
      <Flex justifyContent='space-between' alignItems='center'>
        <Stack spacing={[1, '10px']}>
          <Text as='span' textStyle={['sm', 'base']} fontWeight={500}>
            {title}
          </Text>
          <Text as='span' textStyle={['xs', 'sm']} color='gray.300'>
            {desc}
          </Text>
        </Stack>
        {comingSoon ? (
          <Box
            bgColor='#eeeeee'
            borderRadius='5px'
            display='inline-flex'
            justifyContent='center'
            alignItems='center'
            sx={{
              textStyle: 'xs',
              fontWeight: '600 !important'
            }}
            h={7}
            w='90px'
          >
            Coming soon
          </Box>
        ) : (
          <Box fontSize={['15px', '24px']}>
            <RiArrowRightSLine />
          </Box>
        )}
      </Flex>
    </Card>
  </MoneyOptionLinkCardWrapper>
);

const MoneyOptionLinkCardWrapper = ({
  children,
  isComingSoon = false,
  to = ''
}: {
  children: ReactNode;
  isComingSoon: boolean;
  to: string;
}) => {
  return (
    <>{isComingSoon ? <>{children}</> : <ReactRouterLink to={to}>{children}</ReactRouterLink>}</>
  );
};

export default MoneyOptionLinkCard;
