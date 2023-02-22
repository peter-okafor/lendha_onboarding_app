import { ReactComponent as DashedLine } from '@/assets/svg/dashed-line.svg';
import { Fragment } from 'react';
import { IconType } from 'react-icons';
import { v4 as key } from 'uuid';
import { StepperCircle } from './StepperCircle';

interface StepperProps {
  activeStep: number;
  steps: {
    icon: IconType;
    text: string;
  }[];
}
export const Stepper = ({ activeStep, steps }: StepperProps) => {
  return (
    <>
      {steps.map((step, index) => {
        let bgColor;
        let color;
        const isCompleted = activeStep > index;

        if (activeStep - 1 === index) {
          bgColor = 'yellow.DEFAULT';
          color = 'darkblue.DEFAULT';
        } else if (isCompleted) {
          bgColor = 'darkblue.DEFAULT';
          color = 'white';
        } else {
          bgColor = 'white';
          color = 'gray.300';
        }

        return (
          <Fragment key={key()}>
            <StepperCircle
              icon={step.icon}
              isCompleted={activeStep - 1 > index}
              bgColor={bgColor}
              color={color}
              text={step.text}
            />
            {index !== steps.length - 1 && <DashedLine width='60px' />}
          </Fragment>
        );
      })}
    </>
  );
};
