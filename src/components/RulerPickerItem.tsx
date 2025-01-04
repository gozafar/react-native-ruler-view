import React from 'react';
import { View, StyleSheet, Animated, ViewStyle } from 'react-native';
import { RulerTheme } from 'src/utils/types';

export type RulerPickerItemProps = {
  /**
   * Gap between steps
   * @default 10
   */
  gapBetweenSteps: number;
  /**
   * Height of the short step
   * @default 20
   */
  shortStepHeight: number;
  /**
   * Height of the long step
   * @default 40
   */
  longStepHeight: number;
  /**
   * Width of the steps
   * @default 2
   */
  stepWidth: number;
  /**
   * Color of the short steps
   * @default 'lightgray'
   */
  shortStepColor: string;
  /**
   * Color of the long steps
   * @default 'gray'
   */
  longStepColor: string;
  /**
   * Color of the long steps
   * @default 180
   */
  height?: number,
  /**
   * Whether the ruler is vertical
   * @default false
   */
  vertical?: boolean;
  /**
   * Custom styles for the container
   */
  containerStyle?: ViewStyle;
  /**
   * Custom styles for the step marks
   */
  stepStyle?: ViewStyle;
  /**
   * Show step labels
   * @default false
   */
  showLabels?: boolean;
  /**
   * Animated or not
   */
  animated: boolean;
  /**
   * Custom label component
   */
  renderLabel?: (value: number) => React.ReactNode;
  /**
   * Animation configuration
   */
  animationConfig?: {
    duration?: number;
    type?: 'spring' | 'timing';
    springConfig?: {
      tension?: number;
      friction?: number;
    };
  };
  /**
   * Theme configuration
   */
  theme?: RulerTheme;
};

type Props = {
  index: number;
  isLast: boolean;
} & RulerPickerItemProps;

export const RulerPickerItem = React.memo(
  ({
    isLast,
    index,
    gapBetweenSteps,
    shortStepHeight,
    longStepHeight,
    stepWidth,
    shortStepColor,
    longStepColor,
    height=180,
    vertical = false,
    containerStyle,
    stepStyle,
    showLabels = false,
    renderLabel,
    animationConfig,
    theme,
  }: Props) => {
    const isLong = index % 10 === 0;
    const stepHeight = isLong ? longStepHeight : shortStepHeight;
    const stepColor = isLong ? longStepColor : shortStepColor;

    // Animation setup
    const animatedValue = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
      if (animationConfig) {
        const animation =
          animationConfig.type === 'spring'
            ? Animated.spring(animatedValue, {
                toValue: 1,
                useNativeDriver: true,
                ...animationConfig.springConfig,
              })
            : Animated.timing(animatedValue, {
                toValue: 1,
                duration: animationConfig.duration || 300,
                useNativeDriver: true,
              });

        animation.start();
      }
    }, [animatedValue, animationConfig]);

    const animatedStyle = animationConfig
      ? {
          opacity: animatedValue,
          transform: [
            {
              scale: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0.5, 1],
              }),
            },
          ],
        }
      : {};

    const renderStepLabel = () => {
      if (!showLabels || !isLong) return null;

      if (renderLabel) {
        return renderLabel(index);
      }

      return (
        <Animated.Text
          style={[
            styles.label,
            {
              color: theme?.textColor || '#000000',
              [vertical ? 'marginLeft' : 'marginTop']: 4,
            },
            animatedStyle,
          ]}
        >
          {index}
        </Animated.Text>
      );
    };

    return (
      <View
        style={[
          styles.container,
          {
            height: height,
            [vertical ? 'height' : 'width']: stepWidth,
            [vertical ? 'marginBottom' : 'marginRight']: isLast
              ? 0
              : gapBetweenSteps,
            [vertical ? 'marginLeft' : 'marginTop']: 20,
          },
          containerStyle,
        ]}
      >
        <Animated.View
          style={[
            styles.step,
            {
              [vertical ? 'height' : 'width']: stepWidth,
              [vertical ? 'width' : 'height']: stepHeight,
              backgroundColor: stepColor,
              [vertical ? 'marginLeft' : 'marginTop']: isLong
                ? -12
                : shortStepHeight-20,
            },
            stepStyle,
            animatedStyle,
          ]}
        />
        {renderStepLabel()}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
   justifyContent: 'center'
  },
  step: {
    backgroundColor: '#000000',
  },
  label: {
    fontSize: 10,
    textAlign: 'center',
  },
});
