module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
    'module-resolver',
    {
      "root": ["./"],
      extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
      alias: {
        'src': './src',
        'screens': './src/screens',   
        'assets': './src/assets'
      }
    }
    ],
    ['react-native-reanimated/plugin']
],
};
