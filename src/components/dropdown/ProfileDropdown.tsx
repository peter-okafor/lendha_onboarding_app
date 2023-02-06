import { path } from '@/routes/path';
import { Avatar, Box, Stack, Text } from '@chakra-ui/react';
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
          <Stack direction='row' spacing={5} alignItems='center'>
            <Avatar size='sm' name={name} src={src} />
            <Stack spacing={0} fontFamily='Poppins'>
              <Text textStyle='base'>{name}</Text>
              <Text textStyle='xs'>{email}</Text>
            </Stack>
            {/* <RiArrowDownSLine fontSize='24px' /> */}
          </Stack>
        </Box>
        {/* {dropdown && options.length > 0 && (
          <DropdownWrapper position='absolute' w='100%' zIndex={1} mt={1} py={1}>
            {options.map((item, i) => (
              <DropdownText textStyle='base' key={i} text={item} />
            ))}
          </DropdownWrapper>
        )} */}
      </Box>
    </ReactRouterLink>
  );
};

export default ProfileDropdown;
