import React, { useCallback, useEffect, useRef, useMemo } from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  Animated,
  TextInput,
  Platform,
  Vibration,
  AccessibilityInfo,
} from 'react-native';
import type {
  NativeSyntheticEvent,
  NativeScrollEvent,
  FlatList,
} from 'react-native';
import { RulerPickerItem } from './RulerPickerItem';
import { RulerPickerProps } from 'src/utils/types';
import { PRESET_THEMES } from 'src/utils/theme';
import { calculateCurrentValue, getInitialOffset } from 'src/utils';

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

export const RulerPicker: React.FC<RulerPickerProps> = ({
  width = windowWidth,
  height = windowHeight,
  min,
  max,
  step = 1,
  initialValue = min,
  fractionDigits = 1,
  unit = 'cm',
  indicatorHeight = 80,
  vertical = false,
  theme = 'light',
  hapticFeedback = false,
  animated = true,
  gapBetweenSteps = 10,
  shortStepHeight = 20,
  longStepHeight = 40,
  stepWidth = 2,
  valueTextStyle,
  unitTextStyle,
  decelerationRate = 'normal',
  accessibility,
  onValueChange,
  onValueChangeEnd,
  renderLabel,
}: RulerPickerProps) => {
  // Validate props
  if (min >= max) {
    console.error('min must be less than max');
    return null;
  }

  if (initialValue < min || initialValue > max) {
    console.error('initialValue must be between min and max');
    return null;
  }

  const activeTheme =
    typeof theme === 'string'
      ? PRESET_THEMES[theme as keyof typeof PRESET_THEMES]
      : theme;
  const itemAmount = Math.floor((max - min) / step);
  const arrData = useMemo(
    () => Array.from({ length: itemAmount + 1 }, (_, i) => i),
    [itemAmount]
  );

  const listRef = useRef<FlatList<number>>(null);
  const stepTextRef = useRef<TextInput>(null);
  const prevValue = useRef<string>(initialValue.toFixed(fractionDigits));
  const prevMomentumValue = useRef<string>(
    initialValue.toFixed(fractionDigits)
  );
  const scrollPosition = useRef(new Animated.Value(0)).current;

  const announceValue = useCallback(
    (value: string) => {
      if (accessibility?.enabled && accessibility.announceValues) {
        const announcement = accessibility.labelFormat
          ? accessibility.labelFormat.replace('${value}', value)
          : `Value: ${value}${unit}`;
        AccessibilityInfo.announceForAccessibility(announcement);
      }
    },
    [accessibility, unit]
  );

  const valueCallback: Animated.ValueListenerCallback = useCallback(
    ({ value }) => {
      const newStep = calculateCurrentValue(
        value,
        stepWidth,
        gapBetweenSteps,
        min,
        max,
        step,
        fractionDigits
      );

      if (prevValue.current !== newStep) {
        if (hapticFeedback && Platform.OS !== 'web') {
          Vibration.vibrate(1);
        }
        onValueChange?.(parseFloat(newStep));
        stepTextRef.current?.setNativeProps({ text: newStep });
        announceValue(newStep);
      }

      prevValue.current = newStep;
    },
    [
      announceValue,
      fractionDigits,
      gapBetweenSteps,
      hapticFeedback,
      max,
      min,
      onValueChange,
      step,
      stepWidth,
    ]
  );

  useEffect(() => {
    scrollPosition.addListener(valueCallback);
    return () => scrollPosition.removeAllListeners();
  }, [scrollPosition, valueCallback]);
  useEffect(() => {
    const initialOffset = getInitialOffset(
      initialValue,
      min,
      step,
      stepWidth,
      gapBetweenSteps
    );
    listRef.current?.scrollToOffset({
      offset: initialOffset,
      animated: false,
    });
  }, [gapBetweenSteps, initialValue, min, step, stepWidth]);

  const scrollHandler = Animated.event(
    [
      {
        nativeEvent: {
          contentOffset: vertical
            ? { y: scrollPosition }
            : { x: scrollPosition },
        },
      },
    ],
    { useNativeDriver: true }
  );

  const renderSeparator = useCallback(() => {
    const separatorSize = vertical ? height : width;
    return (
      <View
        style={{
          height: vertical
            ? separatorSize * 0.6124 - stepWidth * 0.5
            : undefined,
          width: vertical ? undefined : separatorSize * 0.5 - stepWidth * 0.5,
        }}
      />
    );
  }, [height, stepWidth, vertical, width]);

  const renderItem = useCallback(
    ({ item: index }: { item: number }) => {
      return (
        <RulerPickerItem
          isLast={index === arrData.length - 1}
          index={index}
          shortStepHeight={shortStepHeight}
          longStepHeight={longStepHeight}
          gapBetweenSteps={gapBetweenSteps}
          stepWidth={stepWidth}
          shortStepColor={activeTheme!.shortStepColor}
          longStepColor={activeTheme!.longStepColor}
          vertical={vertical}
          animated={animated}
          renderLabel={renderLabel}
        />
      );
    },
    [
      activeTheme,
      animated,
      arrData.length,
      gapBetweenSteps,
      longStepHeight,
      shortStepHeight,
      stepWidth,
      vertical,
    ]
  );

  const onMomentumScrollEnd = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offset = vertical
        ? event.nativeEvent.contentOffset.y
        : event.nativeEvent.contentOffset.x;

      const newStep = calculateCurrentValue(
        offset,
        stepWidth,
        gapBetweenSteps,
        min,
        max,
        step,
        fractionDigits
      );

      if (prevMomentumValue.current !== newStep) {
        onValueChangeEnd?.(newStep);
        announceValue(newStep);
      }

      prevMomentumValue.current = newStep;
    },
    [
      announceValue,
      fractionDigits,
      gapBetweenSteps,
      max,
      min,
      onValueChangeEnd,
      step,
      stepWidth,
      vertical,
    ]
  );

  return (
    <View
      style={[
        styles.container,
        {
          width: width > 300 ? width : 300,
          height: height > 300 ? height : 300,
          backgroundColor: activeTheme!.backgroundColor,
          flexDirection: vertical ? 'row' : 'column',
        },
      ]}
      accessible={accessibility?.enabled}
      accessibilityRole="adjustable"
    >
      <Animated.FlatList
        ref={listRef}
        data={arrData}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={{
          marginLeft: vertical ? '35%' : 0,
          marginTop: vertical ? -60 : 0,
        }}
        ListHeaderComponent={renderSeparator}
        ListFooterComponent={renderSeparator}
        onScroll={scrollHandler}
        onMomentumScrollEnd={onMomentumScrollEnd}
        snapToOffsets={arrData.map(
          (_, index) => index * (stepWidth + gapBetweenSteps)
        )}
        snapToAlignment="start"
        decelerationRate={decelerationRate}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        horizontal={!vertical}
      />
      <View
        pointerEvents="none"
        style={[
          styles.indicator,
          {
            [vertical ? 'top' : 'left']: '50%',
            flexDirection: vertical ? 'row-reverse' : 'column',
            alignItems: vertical ? 'center' : 'flex-start',
          },
        ]}
      >
        <View
          style={[
            styles.displayTextContainer,
            {
              marginLeft: vertical ? 0 : -30,
            },
          ]}
        >
          <TextInput
            ref={stepTextRef}
            defaultValue={initialValue.toFixed(fractionDigits)}
            style={[
              {
                lineHeight:
                  valueTextStyle?.fontSize ?? styles.valueText.fontSize,
                color: activeTheme!.textColor,
              },
              styles.valueText,
              valueTextStyle,
            ]}
          />
          {unit && (
            <Text
              style={[
                {
                  lineHeight:
                    unitTextStyle?.fontSize ?? styles.unitText.fontSize,
                  color: activeTheme!.textColor,
                },
                styles.unitText,
                unitTextStyle,
              ]}
            >
              {unit}
            </Text>
          )}
        </View>
        <View
          style={[
            {
              width: vertical ? indicatorHeight : stepWidth,
              height: vertical ? stepWidth : indicatorHeight,
              backgroundColor: activeTheme!.indicatorColor,
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // paddingTop: 150,
  },
  indicator: {
    justifyContent: 'space-between',
    height: 100,
    width: 200,
    position: 'absolute',
    top: 30,
    left: '32%',
  },
  displayTextContainer: {
    flexDirection: 'row',
    width: 200
  },
  valueText: {
    fontSize: 32,
    fontWeight: '800',
    margin: 0,
    padding: 0,
  },
  unitText: {
    fontSize: 24,
    fontWeight: '400',
    marginLeft: 6,
  },
});
