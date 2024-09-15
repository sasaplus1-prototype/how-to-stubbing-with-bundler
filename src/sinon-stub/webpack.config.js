const path = require('node:path');

const isRspack = process.argv.some((arg) => /\/rspack$/.test(arg));

function createConfig({ entry, outputFilename, rules }) {
  const config = {};

  config.mode = 'development';
  config.entry = entry;
  config.output = {
    path: path.resolve(__dirname),
    filename: outputFilename,
  };
  config.target = 'node';
  config.resolve = {
    extensions: ['.ts', '...'],
  };
  config.devtool = false;
  config.module = {};
  config.module.rules = [
    ...rules
  ];

  return config;
}

module.exports = function() {
  const bundler = isRspack ? 'rspack' : 'webpack';

  const js = createConfig({
    entry: require.resolve('./js/a.test.js'),
    outputFilename: `a.test.${bundler}.js`,
    rules: []
  });

  const tsLoader = createConfig({
    entry: require.resolve('./ts/a.test.ts'),
    outputFilename: `a.test.${bundler}.ts-loader.js`,
    rules: [
      {
        oneOf: [
          {
            test: /\.ts$/,
            use: {
              loader: 'ts-loader',
              options: {
                compilerOptions: {
                  target: 'commonjs'
                }
              }
            }
          }
        ]
      }
    ]
  });

  const swcLoader = createConfig({
    entry: require.resolve('./ts/a.test.ts'),
    outputFilename: `a.test.${bundler}.swc-loader.js`,
    rules: [
      {
        oneOf: [
          {
            test: /\.ts$/,
            use: {
              loader: 'builtin:swc-loader'
            }
          }
        ]
      }
    ]
  });

  return [
    js,
    tsLoader,
    isRspack && swcLoader,
  ].filter(Boolean);
};
