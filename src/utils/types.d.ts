import type { TextStyle, ViewStyle } from 'react-native';
import { ThemeName } from './theme';

export type RulerTheme = {
  /**
   * The color of the indicator that shows the selected value
   */
  indicatorColor: string;

  /**
   * The color for short steps
   */
  shortStepColor: string;

  /**
   * The color for long steps
   */
  longStepColor: string;

  /**
   * The text color for labels or numbers shown on the ruler
   */
  textColor: string;

  /**
   * The background color of the ruler
   */
  backgroundColor: string;
};

export type AnimationConfig = {
  /**
   * The duration of the animation in milliseconds
   * @default 300
   */
  duration?: number;

  /**
   * The type of animation used
   * @default 'timing'
   */
  type?: 'spring' | 'timing';

  /**
   * Configuration for spring animations
   */
  springConfig?: {
    /**
     * The spring tension
     * @default 40
     */
    tension?: number;

    /**
     * The spring friction
     * @default 7
     */
    friction?: number;
  };
};

export type RulerAccessibilityConfig = {
  /**
   * Whether accessibility is enabled for the ruler
   * @default false
   */
  enabled?: boolean;

  /**
   * The format of the label to be announced
   * @default 'Value: {value}'
   */
  labelFormat?: string;

  /**
   * Whether to announce the value when it changes
   * @default true
   */
  announceValues?: boolean;

  /**
   * The minimum adjustment allowed before announcing a value change
   * @default 0
   */
  minimumAdjustment?: number;

  /**
   * The announcement text when incrementing the value
   * @default 'Incremented'
   */
  incrementAnnouncement?: string;

  /**
   * The announcement text when decrementing the value
   * @default 'Decremented'
   */
  decrementAnnouncement?: string;
};

export type RulerPickerItemProps = {
  /**
   * Gap between each step on the ruler
   * @default 10
   */
  gapBetweenSteps: number;

  /**
   * The height of the short step
   * @default 20
   */
  shortStepHeight: number;

  /**
   * The height of the long step
   * @default 40
   */
  longStepHeight: number;

  /**
   * The width of each step
   * @default 2
   */
  stepWidth: number;

  /**
   * The color of the short steps
   * @default 'lightgray'
   */
  shortStepColor: string;

  /**
   * The color of the long steps
   * @default 'gray'
   */
  longStepColor: string;

  /**
   * The height of the ruler, used in vertical mode
   * @default undefined (the height will adjust dynamically based on the provided props)
   */
  height?: number;

  /**
   * Whether the ruler is in vertical orientation
   * @default false
   */
  vertical?: boolean;

  /**
   * Custom styles for the step container
   */
  stepStyle?: ViewStyle;

  /**
   * Whether to animate the step movements
   * @default true
   */
  animated: boolean;

  /**
   * Configuration for the animation when moving between steps
   */
  animationConfig?: AnimationConfig;

  /**
   * The theme configuration for the ruler (including colors, etc.)
   * @default 'light'
   */
  theme?: RulerTheme | ThemeName;
};

export type RulerPickerItemProp = {
  /**
   * The index of the current item on the ruler
   */
  index: number;

  /**
   * Whether this is the last step on the ruler
   */
  isLast: boolean;
} & RulerPickerItemProps;

export type RulerPickerProps = {
  /**
   * The width of the ruler (horizontal mode only)
   * @default 300
   */
  width?: number;

  /**
   * The height of the ruler (vertical mode only)
   * @default 200
   */
  height?: number;

  /**
   * The minimum value of the ruler
   * @default 0
   */
  min: number;

  /**
   * The maximum value of the ruler
   * @default 100
   */
  max: number;

  /**
   * The step size (interval between each step)
   * @default 1
   */
  step?: number;

  /**
   * The initial value of the ruler
   * @default 0
   */
  initialValue?: number;

  /**
   * Number of decimal places to show in the value
   * @default 0
   */
  fractionDigits?: number;

  /**
   * Unit of measurement to display next to the value
   * @default undefined
   */
  unit?: string;

  /**
   * The height of the indicator that highlights the selected value
   * @default 30
   */
  indicatorHeight?: number;

  /**
   * Whether the ruler is vertical (set to false for horizontal)
   * @default false
   */
  vertical?: boolean;

  /**
   * Custom theme configuration for the ruler
   */
  theme?: RulerTheme | ThemeName;

  /**
   * Whether to provide haptic feedback when interacting with the ruler
   * @default true
   */
  hapticFeedback?: boolean;

  /**
   * Whether to enable animations for the ruler
   * @default true
   */
  animated?: boolean;

  /**
   * Custom text style for displaying the value
   */
  valueTextStyle?: TextStyle;

  /**
   * Custom text style for displaying the unit
   */
  unitTextStyle?: TextStyle;

  /**
   * Custom ruler style
   */
  containerStyle?: ViewStyle;

  /**
   * The deceleration rate when scrolling the ruler
   * @default 'normal'
   */
  decelerationRate?: 'fast' | 'normal' | number;

  /**
   * Accessibility configuration for screen readers
   */
  accessibility?: RulerAccessibilityConfig;

  /**
   * Whether to display labels at each step
   * @default true
   */
  showLabels?: boolean;

  /**
   * Configuration for the animation when moving between steps
   */
  animationConfig?: AnimationConfig;

  /**
   * Callback function when the value changes
   */
  onValueChange?: (value: number) => void;

  /**
   * Callback function when the value change is finished
   */
  onValueChangeEnd?: (value: string) => void;
} & Partial<RulerPickerItemProps>;

