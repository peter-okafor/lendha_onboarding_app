import { ReactComponent as Logo } from '@/assets/svg/logo/logo.svg';
import { Flex, keyframes } from '@chakra-ui/react';
import styled from '@emotion/styled';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const RotatingPath = styled.path`
  animation: ${rotate} 1s linear infinite;
`;

const LoaderSuspense = () => {
  return (
    <Flex justifyContent='center' alignItems='center' h='100vh'>
      <RotatingPath>
        <Logo />
      </RotatingPath>
    </Flex>
  );
};

export default LoaderSuspense;
