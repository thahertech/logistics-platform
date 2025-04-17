import { useState } from 'react';

export const useFormSteps = (initialStep = 0) => {
  const [activeStep, setActiveStep] = useState(initialStep);
  const handleNext = () => setActiveStep((p) => p + 1);
  const handleBack = () => setActiveStep((p) => p - 1);
  return { activeStep, handleNext, handleBack };
};