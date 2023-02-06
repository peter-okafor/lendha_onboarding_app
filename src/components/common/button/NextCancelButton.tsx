import { ReactComponent as Spinner } from '@/assets/svg/spinner.svg';
import { Button } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useState } from 'react';

const SpinnerStyle = styled.div`
  svg {
    animation-name: spin;
    animation-duration: 1000ms;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export interface NextCancelProps {
  cancelBtnText?: string;
  nextBtnText?: string;
  showCancelBtn?: boolean;
  onCancel?: () => void;
  onNext?: () => void;
  hasErrors?: boolean;
}
const NextCancelButton = ({ showCancelBtn = true, ...props }: NextCancelProps) => {
  const [loading] = useState(false);

  return (
    <>
      {showCancelBtn && (
        <Button size='md' type='button' w='full' variant='secondary' onClick={props.onCancel}>
          {props.cancelBtnText || 'Back'}
        </Button>
      )}
      <Button
        disabled={loading}
        size='md'
        type='submit'
        w='full'
        onClick={() => {
          // if (props.hasErrors) {
          //   return setLoading(false);
          // }
          // setLoading(true);

          // setTimeout(() => {
          //   setLoading(false);
          //   if (props.onNext) props.onNext();
          // }, 2000);
          if (props.onNext) props.onNext();
        }}
      >
        {loading ? (
          <SpinnerStyle>
            <Spinner />{' '}
          </SpinnerStyle>
        ) : (
          props.nextBtnText || 'Next'
        )}
      </Button>
    </>
  );
};

export default NextCancelButton;
