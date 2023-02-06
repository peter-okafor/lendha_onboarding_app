import { Avatar as ChakraAvatar, AvatarProps } from '@chakra-ui/react';
import Placeholder from '@/assets/loan-placeholder.png';

interface Props extends AvatarProps {
  src?: string;
  name?: string;
  onImgClick?: () => void;
  props?: AvatarProps;
}
const Avatar = ({ src = Placeholder, name = '', onImgClick, ...props }: Props) => {
  return (
    <ChakraAvatar
      w='50px'
      h='50px'
      borderRadius={0}
      name={name}
      src={src}
      onClick={onImgClick ? onImgClick : () => null}
      {...props}
    />
  );
};

export default Avatar;
