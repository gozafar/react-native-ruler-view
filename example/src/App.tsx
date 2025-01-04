import * as React from 'react';

import { ScrollView, StyleSheet, Text, View } from 'react-native';
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
        step={1}
        initialValue={0}
        theme="ocean"
        // vertical
      />

      {/* Vertical ruler with labels */}
      <RulerPicker
        min={0}
        max={200}
        step={1}
        width={300}
        vertical
        showLabels
        theme="sunset"
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
        height={800}
        theme={{
          indicatorColor: 'red',
          shortStepColor: 'green',
          longStepColor: 'blue',
          textColor: 'cyan',
          backgroundColor: 'gray',
        }}
        renderLabel={(value) => (
          <View
            style={{ padding: 4, backgroundColor: '#FFE0E0', borderRadius: 4 }}
          >
            <Text style={{ color: 'black', fontSize: 30 }}>{value}ghfg</Text>
          </View>
        )}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
