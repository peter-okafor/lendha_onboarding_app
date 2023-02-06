import { ReactNode, SVGProps } from 'react';

export interface ButtonProps {
  icon?: SVGProps<SVGSVGElement>;
  text?: string | ReactNode;
}
