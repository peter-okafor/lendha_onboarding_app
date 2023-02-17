import { Button } from '@chakra-ui/react';
import { useState } from 'react';

export interface NextCancelProps {
  cancelBtnText?: string;
  nextBtnText?: string;
  showCancelBtn?: boolean;
  onCancel?: () => void;
  onNext?: () => void;
  hasErrors?: boolean;
  isSubmitting?: boolean;
}
const NextCancelButton = ({
  showCancelBtn = true,
  isSubmitting = false,
  ...props
}: NextCancelProps) => {
  return (
    <>
      {showCancelBtn && (
        <Button size='md' type='button' w='full' variant='secondary' onClick={props.onCancel}>
          {props.cancelBtnText || 'Back'}
        </Button>
      )}
      <Button
        isLoading={isSubmitting}
        size='md'
        type='submit'
        w='full'
        onClick={() => {
          if (props.onNext) props.onNext();
        }}
      >
        {props.nextBtnText || 'Next'}
      </Button>
    </>
  );
};

export default NextCancelButton;
