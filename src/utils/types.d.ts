import type { TextStyle, ViewStyle } from 'react-native';
import { ThemeName } from './theme';

export type RulerTheme = {
  indicatorColor: string;
  shortStepColor: string;
  longStepColor: string;
  textColor: string;
  backgroundColor: string;
};

export type AnimationConfig = {
  duration?: number;
  type?: 'spring' | 'timing';
  springConfig?: {
    tension?: number;
    friction?: number;
  };
};

export type RulerAccessibilityConfig = {
  enabled?: boolean;
  labelFormat?: string;
  announceValues?: boolean;
  minimumAdjustment?: number;
  incrementAnnouncement?: string;
  decrementAnnouncement?: string;
};

export type RulerPickerItemProps = {
  gapBetweenSteps: number;
  shortStepHeight: number;
  longStepHeight: number;
  stepWidth: number;
  shortStepColor: string;
  longStepColor: string;
  vertical?: boolean;
  containerStyle?: ViewStyle;
  stepStyle?: ViewStyle;
  showLabels?: boolean;
  animationConfig?: AnimationConfig;
  theme?: RulerTheme | ThemeName;
};

export type RulerPickerProps = {
  width?: number;
  height?: number;
   /**
   * min value of ruler
   * @default 0
   */
  min: number;
  max: number;
  step?: number;
  initialValue?: number;
  fractionDigits?: number;
  unit?: string;
  indicatorHeight?: number;
  vertical?: boolean;
  theme?: RulerTheme | ThemeName;
  hapticFeedback?: boolean;
  animated?: boolean;
  valueTextStyle?: TextStyle;
  unitTextStyle?: TextStyle;
  decelerationRate?: 'fast' | 'normal' | number;
  accessibility?: RulerAccessibilityConfig;
  showLabels?: boolean;
  animationConfig?: AnimationConfig;
  onValueChange?: (value: number) => void;
  onValueChangeEnd?: (value: string) => void;
} & Partial<RulerPickerItemProps>;