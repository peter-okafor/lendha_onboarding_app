import { globalStyles } from '@/theme/styles';
import { convertBytestoKB } from '@/utils';
import { Box, Flex, Text } from '@chakra-ui/react';
import { useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

interface Props {
  name: string;
  label: string;
  labelSubText?: string;
  fileSize?: number;
  errorMessage?: string;
  touchedField?: boolean;
  setFieldValue: (field: string, value: any) => void;
}

const DropzoneFileUpload = (props: Props) => {
  const { setFieldValue } = props;

  const onDrop = useCallback(
    (acceptedFiles: any) => {
      setFieldValue(props.name, acceptedFiles);
    },
    [props.name, setFieldValue]
  );
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.png']
    },
    maxFiles: 1
  });

  useEffect(() => {
    if (acceptedFiles.length < 1) {
      setFieldValue(props.name, '');
    }
  }, [acceptedFiles, props.name, setFieldValue]);

  return (
    <Box>
      <Box textStyle='sm'>
        <Text className='lendha__form-text' as='span'>
          {props.label}{' '}
        </Text>
        {props.labelSubText && (
          <Text color='#7a7a7a' as='span'>
            {props.labelSubText}
          </Text>
        )}
      </Box>
      <Box
        bgColor='#f3f3f3'
        border='1px dashed'
        borderColor={`${globalStyles.colors.gray[100]}`}
        borderRadius='5px'
        cursor='pointer'
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <Flex
          minH='40px'
          justifyContent='center'
          alignItems='center'
          gap={2}
          // overflowX='scroll'
          wordBreak='break-word'
          p={1}
        >
          <Text textStyle='sm' color='gray.300'>
            {acceptedFiles.length < 1
              ? 'Click to upload'
              : acceptedFiles[0].name + ' - ' + convertBytestoKB(acceptedFiles[0].size) + ' kb'}
          </Text>
          <Text textStyle='xxs' color='gray.200'>
            {acceptedFiles.length < 1 && `File size: ${props.fileSize}mb Max`}
          </Text>
        </Flex>
      </Box>
      {props.errorMessage && props.touchedField && (
        <Box as='small' color='error'>
          {props.errorMessage}
        </Box>
      )}
    </Box>
  );
};

export default DropzoneFileUpload;
