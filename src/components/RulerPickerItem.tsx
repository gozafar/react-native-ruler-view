import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { RulerPickerItemProp, RulerTheme } from 'src/utils/types';

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
    vertical = false,
    stepStyle,
    animationConfig,
    theme,
  }: RulerPickerItemProp) => {
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
      if (!isLong) return null;

      return (
        <Animated.Text
          style={[
            styles.label,
            {
              color: (theme as RulerTheme)?.textColor || '#000000',
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
            [vertical ? 'height' : 'width']: stepWidth,
            [vertical ? 'marginBottom' : 'marginRight']: isLast
              ? 0
              : gapBetweenSteps,
            [vertical ? 'marginLeft' : 'marginTop']: 20,
          },
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
                : shortStepHeight - 30,
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
    justifyContent: 'center',
  },
  step: {
    backgroundColor: '#000000',
  },
  label: {
    fontSize: 10,
    textAlign: 'center',
  },
});
