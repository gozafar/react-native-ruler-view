import type { TextStyle, ViewStyle } from 'react-native';
import { PRESET_THEMES } from 'src/components/RulerPicker';

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
  renderLabel?: (value: number) => React.ReactNode;
  animationConfig?: AnimationConfig;
  theme?: RulerTheme;
};

export type RulerPickerProps = {
  width?: number;
  height?: number;
  min: number;
  max: number;
  step?: number;
  initialValue?: number;
  fractionDigits?: number;
  unit?: string;
  indicatorHeight?: number;
  vertical?: boolean;
  theme?: RulerTheme | keyof typeof PRESET_THEMES;
  hapticFeedback?: boolean;
  animated?: boolean;
  customMarker?: React.ComponentType<any>;
  valueTextStyle?: TextStyle;
  unitTextStyle?: TextStyle;
  decelerationRate?: 'fast' | 'normal' | number;
  accessibility?: RulerAccessibilityConfig;
  showLabels?: boolean;
  renderLabel?: (value: number) => React.ReactNode;
  animationConfig?: AnimationConfig;
  onValueChange?: (value: string) => void;
  onValueChangeEnd?: (value: string) => void;
} & Partial<RulerPickerItemProps>;