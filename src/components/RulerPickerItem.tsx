import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { RulerPickerItemProp } from '../utils/types';

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
  }: RulerPickerItemProp) => {
    const isLong = index % 10 === 0;
    const stepHeight = isLong ? longStepHeight : shortStepHeight;
    const stepColor = isLong ? longStepColor : shortStepColor;

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
