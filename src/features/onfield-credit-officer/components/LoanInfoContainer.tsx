import { Card } from '@/components/common';
import { Box, BoxProps, Collapse, Flex, Icon, Text, useDisclosure } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri';

const CollapseButton = ({
  isCollapsed = true,
  onClick
}: {
  isCollapsed?: boolean;
  onClick?: () => void;
}) => {
  return (
    <Flex
      alignItems='center'
      justifyContent='center'
      border='1px solid'
      borderColor='gray.300'
      w={5}
      h={5}
      borderRadius='full'
      onClick={onClick}
    >
      <Icon
        as={isCollapsed ? RiArrowDropUpLine : RiArrowDropDownLine}
        color='gray.300'
        cursor='pointer'
        fontSize='24px'
      />
    </Flex>
  );
};

interface Props extends BoxProps {
  collapsible?: boolean;
  children: ReactNode;
  label?: string;
  // isProfileCompleted?: boolean;
  collapsedItems?: ReactNode;
  props?: BoxProps;
}
const LoanInfoContainer = ({
  collapsible,
  collapsedItems,
  // isProfileCompleted = true,
  label,
  ...props
}: Props) => {
  const { isOpen: isCollapsed, onToggle } = useDisclosure();

  return (
    <Card bgColor='#eeeeef' border='none' borderRadius={0} p={5} {...props}>
      <Flex justifyContent='space-between'>
        <Box>
          <Flex justifyContent='space-between'>
            {label && (
              <Text fontFamily='Poppins' fontWeight={500} textStyle='sm'>
                {label}
              </Text>
            )}

            {/* {!isProfileCompleted && (
          <Button
            color='black.DEFAULT'
            fontFamily='Poppins'
            fontWeight={500}
            h={0}
            variant='unstyled'
            mr={[0, '50px']}
          >
            COMPLETE PROFILE
          </Button>
        )} */}
          </Flex>
          <Flex justifyContent='space-between' mt={4} alignItems={['flex-end', 'normal']}>
            {props.children}
          </Flex>

          <Collapse in={isCollapsed} animateOpacity>
            <>{collapsedItems}</>
          </Collapse>
        </Box>
        {collapsible && (
          <Box mt={['auto', 0]}>
            <CollapseButton isCollapsed={isCollapsed} onClick={onToggle} />
          </Box>
        )}
      </Flex>
    </Card>
  );
};

export default LoanInfoContainer;
