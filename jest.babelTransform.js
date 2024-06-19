const babelJest = require('babel-jest');

module.exports = babelJest.createTransformer({
  presets: [
    'module:metro-react-native-babel-preset',
    '@babel/preset-env',
    '@babel/preset-typescript',
  ],
  plugins: [
    '@babel/plugin-transform-flow-strip-types',
    ['@babel/plugin-transform-private-methods', {loose: true}],
    ['@babel/plugin-transform-private-property-in-object', {loose: true}],
    ['@babel/plugin-transform-class-properties', {loose: true}],
  ],
});
