import * as React from 'react';

import { ScrollView, StyleSheet } from 'react-native';
import { RulerPicker } from '../../src/index';

export default function App() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}
    >
      <RulerPicker
        min={0}
        unit="cm"
        max={240}
        step={1}
        width={300}
        height={300}
        fractionDigits={0}
        initialValue={0}
        onValueChange={(number) => console.log('onValueChange', number)}
        onValueChangeEnd={(number) => console.log('onValueChangeEnd', number)}
      />

      {/* Basic usage */}
      <RulerPicker
        min={0}
        max={200}
        height={300}
        width={300}
        step={1}
        initialValue={0}
        vertical
      />

      <RulerPicker
        min={0}
        max={200}
        step={2}
        width={240}
        indicatorHeight={70}
        height={400}
        vertical
        showLabels={false}
        containerStyle={{
          backgroundColor: '#876796'
        }}
        accessibility={{
          enabled: true,
          labelFormat: 'Value: ${value} centimeters',
          announceValues: true,
        }}
        animationConfig={{
          type: 'spring',
          springConfig: {
            tension: 40,
            friction: 7,
          },
        }}
      />

      {/* Custom themed ruler with haptic feedback */}
      <RulerPicker
        min={0}
        max={200}
        step={1}
        hapticFeedback
        width={300}
        height={200}
        containerStyle={{
          backgroundColor: 'red'
        }}
        theme={{
          indicatorColor: 'green',
          shortStepColor: 'green',
          longStepColor: 'blue',
          textColor: 'green',
          backgroundColor: 'light',
        }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
