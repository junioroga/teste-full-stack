module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'transform-inline-environment-variables',
      [
        '@tamagui/babel-plugin',
        {
          components: ['tamagui'],
          config: './tamagui.config.ts',
          logTimings: true,
        },
      ],
      'react-native-reanimated/plugin',
      [
        'module-resolver',
        {
          extensions: ['.ts', '.tsx'],
          alias: {
            '@assets': './src/assets',
            '@components': './src/components',
            '@config': './src/config',
            '@hooks': './src/hooks',
            '@navigation': './src/navigation',
            '@pages': './src/pages',
            '@services': './src/services',
            '@utils': './src/utils',
            '@store': './src/store',
          },
        },
      ],
    ],
  }
}
