import * as React from 'react';

import { StyleSheet, View } from 'react-native';
// import { RulerPicker } from 'react-native-ruler-picker';
import { RulerPicker } from '../../src/index';

export default function App() {
  // const [value, setValue] = React.useState();
  return (
    <View style={styles.container}>
      {/* <RulerPicker
        min={0}
        unit="cm"
        max={240}
        step={1}
        fractionDigits={0}
        initialValue={0}
        onValueChange={(number) => console.log('onValueChange', number)}
        onValueChangeEnd={(number) => console.log('onValueChangeEnd', number)}
      /> */}
      {/* Basic usage */}
      <RulerPicker
        min={0}
        max={200}
        height={900}
        step={1}
        initialValue={70}
        // onValueChange={setValue}
        // theme="ocean"
        vertical
      />

      {/* Vertical ruler with labels */}
      {/* <RulerPicker
        min={0}
        max={200}
        step={1}
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
      /> */}

      {/* Custom themed ruler with haptic feedback */}
      {/* <RulerPicker
        min={0}
        max={200}
        step={1}
        hapticFeedback
        theme={{
          indicatorColor: '#FF0000',
          shortStepColor: '#FFE0E0',
          longStepColor: '#FF8080',
          textColor: '#FF0000',
          backgroundColor: '#FFFFFF',
        }}
        renderLabel={(value) => (
          <View style={{ padding: 4, backgroundColor: '#FFE0E0', borderRadius: 4 }}>
            <Text style={{ color: '#FF0000', fontSize: 10 }}>{value}</Text>
          </View>
        )}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
