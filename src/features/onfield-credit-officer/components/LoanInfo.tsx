import { Link, LinkProps, Stack, Text, TextProps } from '@chakra-ui/react';
import Avatar from './Avatar';
import { Link as ReactRouterLink } from 'react-router-dom';

interface Props {
  label: string;
  isLink?: boolean;
  text?: string;
  linkPath?: string;
  isExternal?: boolean;
  img?: { src?: string; name?: string };
  hasImg?: boolean;
  labelProps?: TextProps;
  textProps?: TextProps;
  linkProps?: LinkProps;
  onImgClick?: () => void;
}
const LoanInfo = ({
  isLink = false,
  linkPath = '',
  label,
  text,
  img,
  onImgClick,
  isExternal = true,
  ...props
}: Props) => {
  return (
    <Stack
      spacing={1}
      sx={{
        span: {
          color: 'gray.300',
          fontWeight: 500,
          textStyle: 'xs'
        },
        'a, p': {
          color: 'darkblue.DEFAULT',
          fontWeight: 600,
          textStyle: 'base',
          maxWidth: { base: '200px', lg: '182px' },
          textOverflow: 'ellipsis',
          whiteSpace: { base: 'nowrap', md: 'wrap' },
          overflow: 'hidden'
        }
      }}
    >
      {label && (
        <Text as='span' {...props.labelProps}>
          {label}
        </Text>
      )}

      {text && !isLink && <Text {...props.textProps}>{text}</Text>}

      {text &&
        isLink &&
        (isExternal ? (
          <Link href={linkPath} {...props.linkProps} target='_blank' rel='nofollow'>
            {text}
          </Link>
        ) : (
          <Link as={ReactRouterLink} to={linkPath} {...props.linkProps}>
            {text}
          </Link>
        ))}

      {props.hasImg && <Avatar src={img?.src} name={img?.name} onImgClick={onImgClick} />}
    </Stack>
  );
};

export default LoanInfo;
