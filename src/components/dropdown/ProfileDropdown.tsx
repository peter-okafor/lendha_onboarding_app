import { path } from '@/routes/path';
import { Avatar, Box, Flex, SkeletonCircle, SkeletonText, Stack, Text } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { useOnClickOutside } from 'usehooks-ts';

interface Props {
  name: string;
  email: string;
  src?: string;
}
const ProfileDropdown = ({ name, email, src = 'https://bit.ly/kent-c-dodds' }: Props) => {
  const [dropdown, setDropdown] = useState(false);

  const ref = useRef(null);

  const handleClickOutside = () => {
    if (dropdown) {
      setDropdown(false);
    }
  };

  const handleClickInside = () => {
    setDropdown(!dropdown);
  };

  useOnClickOutside(ref, handleClickOutside);

  return (
    <ReactRouterLink to={path.USER_PROFILE}>
      <Box pos='relative' display='inline-block'>
        <Box
          bgColor='white'
          py={2}
          px={4}
          borderRadius='10px'
          cursor='pointer'
          ref={ref}
          onClick={handleClickInside}
        >
          <Stack direction='row' spacing={5} alignItems='center' minW='200px'>
            <SkeletonCircle size='8' isLoaded={!!src}>
              <Avatar size='sm' name={name} src={src} />
            </SkeletonCircle>
            <Flex gap={0} fontFamily='Poppins' flexDir='column' w='full'>
              <SkeletonText noOfLines={1} isLoaded={!!name}>
                <Text textStyle='base'>{name}</Text>
              </SkeletonText>
              <SkeletonText noOfLines={1} mt={email ? 0 : 2} isLoaded={!!email}>
                <Text textStyle='xs'>{email}</Text>
              </SkeletonText>
            </Flex>
          </Stack>
        </Box>
      </Box>
    </ReactRouterLink>
  );
};

export default ProfileDropdown;
