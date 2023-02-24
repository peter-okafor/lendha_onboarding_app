import { InputProps } from '@chakra-ui/react';
import { ChangeEvent, HTMLInputTypeAttribute, ReactNode } from 'react';

export interface LendhaFormInputProps extends InputProps {
  readonly?: boolean;
  disabled?: boolean;
  value?: string | undefined;
  touchedField?: boolean | undefined;
  errorMessage?: string | undefined;
  id?: string | undefined;
  name?: string | undefined;
  isErrorLabel?: boolean;
  label?: string;
  subLabel?: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute | undefined;
  handleChange?: (e: ChangeEvent<any>) => void;
  leftAddon?: ReactNode;
  rightAddon?: ReactNode;
  props?: InputProps;
}
