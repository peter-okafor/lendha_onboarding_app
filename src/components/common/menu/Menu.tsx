import {
  Box,
  Button,
  Menu as ChakraMenu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  TextProps
} from '@chakra-ui/react';
import { RiArrowDownSLine } from 'react-icons/ri';
import { v4 as key } from 'uuid';

interface MenuItemProps {
  text: string;
  onClick?: () => void;
  isActive?: boolean;
}

interface Props {
  text: string;
  items: MenuItemProps[];
  textProps?: TextProps;
}
const Menu = (props: Props) => {
  return (
    <Box
      sx={{
        '.chakra-menu__menu-button': {
          fontSize: 'base',
          px: 0
        }
      }}
    >
      <ChakraMenu>
        <MenuButton as={Button} rightIcon={<RiArrowDownSLine />}>
          <Text {...props.textProps}>{props.text}</Text>
        </MenuButton>
        {(props.items || []).length > 0 && (
          <MenuList marginTop={-2} border='1px solid' borderColor='gray.100'>
            {props.items.map((item) => (
              <MenuItem
                sx={{
                  _focus: { bgColor: '#f3f3f3', ':active': { bgColor: 'gray.100' } }
                }}
                key={key()}
                color='gray.300'
                textStyle='sm'
                onClick={item.onClick}
                fontFamily='Poppins'
              >
                {item.text}
              </MenuItem>
            ))}
          </MenuList>
        )}
      </ChakraMenu>
    </Box>
  );
};

export default Menu;
