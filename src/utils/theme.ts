import type { RulerTheme } from './types';

export const PRESET_THEMES: Record<string, RulerTheme> = {
  light: {
    indicatorColor: '#000000',
    shortStepColor: '#E0E0E0',
    longStepColor: '#808080',
    textColor: '#000000',
    backgroundColor: '#FFFFFF',
  },
  dark: {
    indicatorColor: '#FFFFFF',
    shortStepColor: '#404040',
    longStepColor: '#808080',
    textColor: '#FFFFFF',
    backgroundColor: '#000000',
  },
  neon: {
    indicatorColor: '#00FF00',
    shortStepColor: '#FF00FF',
    longStepColor: '#00FFFF',
    textColor: '#FFFFFF',
    backgroundColor: '#000000',
  },
  minimal: {
    indicatorColor: '#333333',
    shortStepColor: '#DDDDDD',
    longStepColor: '#999999',
    textColor: '#333333',
    backgroundColor: '#FFFFFF',
  },
  nature: {
    indicatorColor: '#2E7D32',
    shortStepColor: '#A5D6A7',
    longStepColor: '#4CAF50',
    textColor: '#2E7D32',
    backgroundColor: '#F1F8E9',
  },
  ocean: {
    indicatorColor: '#1565C0',
    shortStepColor: '#90CAF9',
    longStepColor: '#2196F3',
    textColor: '#1565C0',
    backgroundColor: '#E3F2FD',
  },
  sunset: {
    indicatorColor: '#E64A19',
    shortStepColor: '#FFCCBC',
    longStepColor: '#FF5722',
    textColor: '#E64A19',
    backgroundColor: '#FBE9E7',
  },
  monochrome: {
    indicatorColor: '#000000',
    shortStepColor: '#CCCCCC',
    longStepColor: '#666666',
    textColor: '#000000',
    backgroundColor: '#FFFFFF',
  },
} as const;