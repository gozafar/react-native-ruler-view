// export const calculateCurrentValue = (
//   scrollPosition: number,
//   stepWidth: number,
//   gapBetweenItems: number,
//   min: number,
//   max: number,
//   step: number,
//   fractionDigits: number
// ) => {
//   const index = Math.round(scrollPosition / (stepWidth + gapBetweenItems));
//   return Math.min(Math.max(index * step + min, min), max).toFixed(
//     fractionDigits
//   );
// };


export const calculateCurrentValue = (
  offset: number,
  stepWidth: number,
  gapBetweenSteps: number,
  min: number,
  max: number,
  step: number,
  fractionDigits: number
): string => {
  const totalStepWidth = stepWidth + gapBetweenSteps;
  const currentStep = Math.round(offset / totalStepWidth);
  const value = min + currentStep * step;
  const clampedValue = Math.min(Math.max(value, min), max);
  return clampedValue.toFixed(fractionDigits);
};

export const getInitialOffset = (
  initialValue: number,
  min: number,
  step: number,
  stepWidth: number,
  gapBetweenSteps: number
): number => {
  const initialIndex = Math.floor((initialValue - min) / step);
  return initialIndex * (stepWidth + gapBetweenSteps);
};