import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { RulerPickerItemProp } from 'src/utils/types';

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
