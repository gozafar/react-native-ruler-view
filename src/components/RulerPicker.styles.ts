import { StyleSheet } from 'react-native';
import { RulerTheme } from 'src/utils/types';

export const getStyles = (
  height: number,
  width: number,
  vertical: boolean,
  indicatorHeight: number,
  stepWidth: number,
  longStepHeight: number,
  activeTheme: RulerTheme
) => {
  const calculateDynamicStyles = (height: number, vertical: boolean) => {
    if (!vertical) {
      return {
        marginTop: 0,
        top: '-44%' as unknown as number,
      };
    }

    const top: number = 10 - 0.085 * (height - 200);
    const marginTop = height >= 290 ? -(height * 0.12) : -(height * 0.09);

    return {
      marginTop,
      top,
    };
  };

  const { top, marginTop } = calculateDynamicStyles(height, vertical);

  const styles = StyleSheet.create({
    container: {
      width:
        width >= 300 ? width : !vertical ? 300 : width >= 250 ? width : 250,
      height: height >= 300 ? height : 300,
      backgroundColor: activeTheme!.backgroundColor,
      flexDirection: vertical ? 'row' : 'column',
      paddingTop: '10%',
    },
    rulerContainer: {
      overflow: 'hidden',
      borderRadius: 20,
      margin: 10,
      width:
        width >= 300
          ? width * 0.95
          : !vertical
            ? 190
            : width >= 250
              ? width * 0.95
              : 150,
      height: vertical ? height * 0.75 : undefined,
      flexGrow: 1,
      alignSelf: vertical ? undefined : 'center',
    },
    rulerContent: {
      marginTop: marginTop,
      paddingBottom: vertical ? 0 : 20,
      paddingRight: vertical ? width * 0.05 : 0,
      alignItems: 'center',
    },
    indicator: {
      position: 'relative',
      alignSelf: 'center',
      top: top,
      left: vertical ? '-43%' : -5,
      width: vertical ? indicatorHeight : stepWidth,
      height: vertical ? stepWidth : indicatorHeight,
      backgroundColor: activeTheme!.indicatorColor,
    },
    displayTextContainer: {
      flexDirection: !vertical ? 'row' : 'column',
      alignSelf: 'center',
      marginBottom: longStepHeight,
      alignItems: 'center',
      marginTop: vertical ? 50 : 0,
      marginLeft: vertical ? -(width * 0.12) : 0,
    },
    valueText: {
      fontSize: 32,
      fontWeight: '800',
      margin: 0,
      padding: 0,
      color: activeTheme!.textColor,
      maxWidth: 100,
    },
    unitText: {
      fontSize: 24,
      fontWeight: '400',
      marginLeft: 6,
      color: activeTheme!.textColor,
    },
    selectedText: {
      flexDirection: 'row',
      minHeight: vertical ? height * 0.18 : 0,
      minWidth: 100,
      justifyContent: 'center',
    },
    text: {
      textAlign: 'center',
      height: vertical ? height * 0.15 : undefined,
      width: vertical ? undefined : width * 0.15,
      maxWidth: 100,
      fontSize: 20,
    },
  });
  return styles;
};
