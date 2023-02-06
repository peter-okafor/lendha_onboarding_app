import { globalStyles } from '@/theme/styles';
import { InputRightElement } from '@chakra-ui/react';
import { useState } from 'react';
import { RiEyeCloseFill, RiEyeFill } from 'react-icons/ri';
import FormInput from './form-input';
import { LendhaFormInputProps } from './types';

interface Props extends LendhaFormInputProps {
  props?: LendhaFormInputProps;
}
const PasswordInput = ({ ...props }: Props) => {
  const [showPwd, setShowPwd] = useState(false);

  return (
    <FormInput
      {...props}
      type={showPwd ? 'text' : 'password'}
      rightAddon={
        <InputRightElement cursor='pointer' onClick={() => setShowPwd(!showPwd)}>
          {showPwd ? (
            <RiEyeCloseFill color={`${globalStyles.colors.gray[200]}`} />
          ) : (
            <RiEyeFill color={`${globalStyles.colors.gray[200]}`} />
          )}
        </InputRightElement>
      }
    />
  );
};

export default PasswordInput;
