// import React, { useCallback, useEffect, useRef } from 'react';
// import {
//   Dimensions,
//   StyleSheet,
//   TextStyle,
//   View,
//   Text,
//   Animated,
//   TextInput,
// } from 'react-native';
// import type { NativeSyntheticEvent, NativeScrollEvent } from 'react-native';

// import {
//   AnimatedFlashList,
//   FlashList,
//   ListRenderItem,
// } from '@shopify/flash-list';

// import { RulerPickerItem, RulerPickerItemProps } from './RulerPickerItem';
// import { calculateCurrentValue } from '../utils/';

// export type RulerPickerTextProps = TextStyle

// const { width: windowWidth } = Dimensions.get('window');

// export type RulerPickerProps = {
//   /**
//    * Width of the ruler picker
//    * @default windowWidth
//    */
//   width?: number;
//   /**
//    * Height of the ruler picker
//    * @default 500
//    */
//   height?: number;
//   /**
//    * Minimum value of the ruler picker
//    *
//    * @default 0
//    */
//   min: number;
//   /**
//    * Maximum value of the ruler picker
//    *
//    * @default 200
//    */
//   max: number;
//   /**
//    * Step of the ruler picker
//    *
//    * @default 1
//    */
//   step?: number;
//   /**
//    * Initial value of the ruler picker
//    *
//    * @default min
//    */
//   initialValue?: number;
//   /**
//    * Number of digits after the decimal point
//    *
//    * @default 1
//    */
//   fractionDigits?: number;
//   /**
//    * Unit of the ruler picker
//    *
//    * @default 'kg'
//    */
//   unit?: string;
//   /**
//    * Height of the indicator
//    *
//    * @default 80
//    */
//   indicatorHeight?: number;
//   /**
//    * Color of the center line
//    *
//    * @default 'black'
//    */
//   indicatorColor?: string;
//   /**
//    * Text style of the value
//    */
//   valueTextStyle?: RulerPickerTextProps;
//   /**
//    * Text style of the unit
//    */
//   unitTextStyle?: RulerPickerTextProps;
//   /**
//    * A floating-point number that determines how quickly the scroll view
//    * decelerates after the user lifts their finger. You may also use string
//    * shortcuts `"normal"` and `"fast"` which match the underlying iOS settings
//    * for `UIScrollViewDecelerationRateNormal` and
//    * `UIScrollViewDecelerationRateFast` respectively.
//    *
//    *  - `'normal'`: 0.998 on iOS, 0.985 on Android (the default)
//    *  - `'fast'`: 0.99 on iOS, 0.9 on Android
//    *
//    * @default 'normal'
//    */
//   decelerationRate?: 'fast' | 'normal' | number;
//   /**
//    * Callback when the value changes
//    *
//    * @param value
//    */
//     /**
//    * Weather to show verticall or not
//    *
//    * @default false
//    */
//     vertical?: boolean;
//   onValueChange?: (value: string) => void;
//   /**
//    * Callback when the value changes end
//    *
//    * @param value
//    */
//   onValueChangeEnd?: (value: string) => void;
// } & Partial<RulerPickerItemProps>;

// export const RulerPicker = ({
//   width = windowWidth,
//   height = 500,
//   min,
//   max,
//   step = 1,
//   initialValue = min,
//   fractionDigits = 1,
//   unit = 'cm',
//   indicatorHeight = 80,
//   gapBetweenSteps = 10,
//   shortStepHeight = 20,
//   longStepHeight = 40,
//   stepWidth = 2,
//   indicatorColor = 'black',
//   shortStepColor = 'lightgray',
//   longStepColor = 'darkgray',
//   valueTextStyle,
//   unitTextStyle,
//   decelerationRate = 'normal',
//   onValueChange,
//   onValueChangeEnd,
// }: RulerPickerProps) => {
//   const itemAmount = (max - min) / step;
//   const arrData = Array.from({ length: itemAmount + 1 }, (_, index) => index);
//   const listRef = useRef<FlashList<typeof arrData>>(null);

//   const stepTextRef = useRef<TextInput>(null);
//   const prevValue = useRef<string>(initialValue.toFixed(fractionDigits));
//   const prevMomentumValue = useRef<string>(
//     initialValue.toFixed(fractionDigits)
//   );
//   const scrollPosition = useRef(new Animated.Value(0)).current;

//   const valueCallback: Animated.ValueListenerCallback = useCallback(
//     ({ value }) => {
//       const newStep = calculateCurrentValue(
//         value,
//         stepWidth,
//         gapBetweenSteps,
//         min,
//         max,
//         step,
//         fractionDigits
//       );

//       if (prevValue.current !== newStep) {
//         onValueChange?.(newStep);
//         stepTextRef.current?.setNativeProps({ text: newStep });
//       }

//       prevValue.current = newStep;
//     },
//     [fractionDigits, gapBetweenSteps, stepWidth, max, min, onValueChange, step]
//   );

//   useEffect(() => {
//     scrollPosition.addListener(valueCallback);

//     return () => {
//       scrollPosition.removeAllListeners();
//     };
//   }, [scrollPosition, valueCallback]);

//   const scrollHandler = Animated.event(
//     [
//       {
//         nativeEvent: {
//           contentOffset: {
//             x: scrollPosition,
//           },
//         },
//       },
//     ],
//     {
//       useNativeDriver: true,
//     }
//   );

//   const renderSeparator = useCallback(
//     () => <View style={{ width: width * 0.5 - stepWidth * 0.5 }} />,
//     [stepWidth, width]
//   );

//   const renderItem: ListRenderItem<unknown> = useCallback(
//     ({ index }) => {
//       return (
//         <RulerPickerItem
//           isLast={index === arrData.length - 1}
//           index={index}
//           shortStepHeight={shortStepHeight}
//           longStepHeight={longStepHeight}
//           gapBetweenSteps={gapBetweenSteps}
//           stepWidth={stepWidth}
//           shortStepColor={shortStepColor}
//           longStepColor={longStepColor}
//         />
//       );
//     },
//     [
//       arrData.length,
//       gapBetweenSteps,
//       stepWidth,
//       longStepColor,
//       longStepHeight,
//       shortStepColor,
//       shortStepHeight,
//     ]
//   );

//   const onMomentumScrollEnd = useCallback(
//     (event: NativeSyntheticEvent<NativeScrollEvent>) => {
//       const newStep = calculateCurrentValue(
//         event.nativeEvent.contentOffset.x || event.nativeEvent.contentOffset.y,
//         stepWidth,
//         gapBetweenSteps,
//         min,
//         max,
//         step,
//         fractionDigits
//       );

//       if (prevMomentumValue.current !== newStep) {
//         onValueChangeEnd?.(newStep);
//       }

//       prevMomentumValue.current = newStep;
//     },
//     [
//       fractionDigits,
//       gapBetweenSteps,
//       stepWidth,
//       max,
//       min,
//       onValueChangeEnd,
//       step,
//     ]
//   );
//   function onContentSizeChange() {
//     const initialIndex = Math.floor((initialValue - min) / step);
//     listRef.current?.scrollToOffset({
//       offset: initialIndex * (stepWidth + gapBetweenSteps),
//       animated: false,
//     });
//   }

//   return (
//     <View style={{ width, height, marginTop: 50, }}>
//       <AnimatedFlashList
//         ref={listRef}
//         data={arrData}
//         keyExtractor={(_, index) => index.toString()}
//         renderItem={renderItem}
//         ListHeaderComponent={renderSeparator}
//         ListFooterComponent={renderSeparator}
//         onScroll={scrollHandler}
//         onMomentumScrollEnd={onMomentumScrollEnd}
//         estimatedItemSize={stepWidth + gapBetweenSteps}
//         snapToOffsets={arrData.map(
//           (_, index) => index * (stepWidth + gapBetweenSteps)
//         )}
//         onContentSizeChange={onContentSizeChange}
//         snapToAlignment="start"
//         decelerationRate={decelerationRate}
//         estimatedFirstItemOffset={0}
//         scrollEventThrottle={16}
//         showsHorizontalScrollIndicator={false}
//         showsVerticalScrollIndicator={false}
//         horizontal
//       />
//       <View
//         pointerEvents="none"
//         style={[
//           styles.indicator,
//           {
//             transform: [
//               { translateX: -stepWidth * 0.5 },
//               {
//                 translateY:
//                   -indicatorHeight * 3.36 -
//                   (valueTextStyle?.fontSize ?? styles.valueText.fontSize),
//               },
//             ],
//             left: stepWidth * 0.5,
//           },
//         ]}
//       >
//         <View
//           style={[
//             styles.displayTextContainer,
//             {
//               height: valueTextStyle?.fontSize ?? styles.valueText.fontSize,
//               transform: [
//                 {
//                   translateY:
//                     -(valueTextStyle?.fontSize ?? styles.valueText.fontSize) *
//                     0.5,
//                 },
//               ],
//             },
//           ]}
//         >
//           <TextInput
//             ref={stepTextRef}
//             defaultValue={initialValue.toFixed(fractionDigits)}
//             style={[
//               {
//                 lineHeight:
//                   valueTextStyle?.fontSize ?? styles.valueText.fontSize,
//               },
//               styles.valueText,
//               valueTextStyle,
//             ]}
//           />
//           {unit && (
//             <Text
//               style={[
//                 {
//                   lineHeight:
//                     unitTextStyle?.fontSize ?? styles.unitText.fontSize,
//                 },
//                 styles.unitText,
//                 unitTextStyle,
//               ]}
//             >
//               {unit}
//             </Text>
//           )}
//         </View>
//         <View
//           style={[
//             {
//               width: stepWidth,
//               height: indicatorHeight,
//               backgroundColor: indicatorColor,
//             },
//           ]}
//         />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   indicator: {
//     position: 'absolute',
//     top: '50%',
//     width: '100%',
//     alignItems: 'center',
//   },
//   displayTextContainer: {
//     width: '100%',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   valueText: {
//     color: 'black',
//     fontSize: 32,
//     fontWeight: '800',
//     margin: 0,
//     padding: 0,
//   },
//   unitText: {
//     color: 'black',
//     fontSize: 24,
//     fontWeight: '400',
//     marginLeft: 6,
//   },
// });





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
import type { NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { AnimatedFlashList, FlashList } from '@shopify/flash-list';
// import type { RulerPickerProps } from './types';
// import { PRESET_THEMES } from './themes';
// import { calculateCurrentValue, getInitialOffset } from './utils';
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
  customMarker,
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
}) => {
  // Validate props
  if (min >= max) {
    console.error('min must be less than max');
    return null;
  }

  if (initialValue < min || initialValue > max) {
    console.error('initialValue must be between min and max');
    return null;
  }

  const activeTheme = typeof theme === 'string' ? PRESET_THEMES[theme] : theme;
  const itemAmount = Math.floor((max - min) / step);
  const arrData = useMemo(() => Array.from({ length: itemAmount + 1 }, (_, i) => i), [itemAmount]);

  const listRef = useRef<FlashList<typeof arrData>>(null);
  const stepTextRef = useRef<TextInput>(null);
  const prevValue = useRef<string>(initialValue.toFixed(fractionDigits));
  const prevMomentumValue = useRef<string>(initialValue.toFixed(fractionDigits));
  const scrollPosition = useRef(new Animated.Value(0)).current;

  const announceValue = useCallback((value: string) => {
    if (accessibility?.enabled && accessibility.announceValues) {
      const announcement = accessibility.labelFormat
        ? accessibility.labelFormat.replace('${value}', value)
        : `Value: ${value}${unit}`;
      AccessibilityInfo.announceForAccessibility(announcement);
    }
  }, [accessibility, unit]);

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
        onValueChange?.(newStep);
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
    const initialOffset = getInitialOffset(initialValue, min, step, stepWidth, gapBetweenSteps);
    listRef.current?.scrollToOffset({
      offset: initialOffset,
      animated: false,
    });
  }, [gapBetweenSteps, initialValue, min, step, stepWidth]);

  const scrollHandler = Animated.event(
    [
      {
        nativeEvent: {
          contentOffset: vertical ? { y: scrollPosition } : { x: scrollPosition },
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
          [vertical ? 'height' : 'width']: separatorSize * 0.5 - stepWidth * 0.5,
        }}
      />
    );
  }, [height, stepWidth, vertical, width]);

  const renderItem = useCallback(
    ({ item: index }: { item: number }) => {
      if (customMarker) {
        const CustomMarker = customMarker;
        return (
          <CustomMarker
            index={index}
            isLast={index === arrData.length - 1}
            gapBetweenSteps={gapBetweenSteps}
            vertical={vertical}
            theme={activeTheme}
          />
        );
      }

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
        />
      );
    },
    [
      activeTheme,
      animated,
      arrData.length,
      customMarker,
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
          width,
          height,
          backgroundColor: activeTheme!.backgroundColor,
        },
      ]}
      accessible={accessibility?.enabled}
      accessibilityRole="adjustable"
    >
      <AnimatedFlashList
        ref={listRef}
        data={arrData}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        ListHeaderComponent={renderSeparator}
        ListFooterComponent={renderSeparator}
        onScroll={scrollHandler}
        onMomentumScrollEnd={onMomentumScrollEnd}
        estimatedItemSize={stepWidth + gapBetweenSteps}
        snapToOffsets={arrData.map(
          (_, index) => index * (stepWidth + gapBetweenSteps)
        )}
        snapToAlignment="start"
        decelerationRate={decelerationRate}
        estimatedFirstItemOffset={0}
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
            transform: vertical
              ? [
                  { translateY: -stepWidth * 0.5 },
                  {
                    translateX:
                      -indicatorHeight * 3.36 -
                      (valueTextStyle?.fontSize ?? styles.valueText.fontSize),
                  },
                ]
              : [
                  { translateX: -stepWidth * 0.5 },
                  {
                    translateY:
                      -indicatorHeight * 3.36 -
                      (valueTextStyle?.fontSize ?? styles.valueText.fontSize),
                  },
                ],
            [vertical ? 'top' : 'left']: '50%',
          },
        ]}
      >
        <View
          style={[
            styles.displayTextContainer,
            {
              height: valueTextStyle?.fontSize ?? styles.valueText.fontSize,
              transform: [
                {
                  translateY:
                    -(valueTextStyle?.fontSize ?? styles.valueText.fontSize) * 0.5,
                },
              ],
            },
          ]}
        >
          <TextInput
            ref={stepTextRef}
            defaultValue={initialValue.toFixed(fractionDigits)}
            style={[
              {
                lineHeight: valueTextStyle?.fontSize ?? styles.valueText.fontSize,
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
                  lineHeight: unitTextStyle?.fontSize ?? styles.unitText.fontSize,
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
              marginLeft: '-140%',
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
    paddingTop: 150,
  },
  indicator: {
    position: 'absolute',
    left: '110%'
  },
  displayTextContainer: {
    width: '100%',
    flexDirection: 'row',
    marginLeft: -30
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
