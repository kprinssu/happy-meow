import type IForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ForkTsCheckerWebpackPlugin: typeof IForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const BundleAnalyzerPlugin: typeof IForkTsCheckerWebpackPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// eslint-disable-next-line @typescript-eslint/no-var-requires
const CompressionPlugin: typeof IForkTsCheckerWebpackPlugin = require('compression-webpack-plugin');


export const plugins = [
  new ForkTsCheckerWebpackPlugin({
    logger: 'webpack-infrastructure',
  }),
  new BundleAnalyzerPlugin(),
  new CompressionPlugin(),
];
