// const { override, addWebpackModuleRule } = require('customize-cra');

// // module.exports = override(
// //   (config) => {
// //     // Update worker-loader configuration to ensure unique filenames
// //     const workerLoader = config.module.rules.find(
// //       (rule) => rule.loader === 'worker-loader'
// //     );

// //     if (workerLoader) {
// //       workerLoader.options = {
// //         inline: 'fallback',
// //         filename: 'static/js/[name].[contenthash].worker.js', // Unique filename for workers
// //       };
// //     }

// //     // Enable source maps globally
// //     if (process.env.NODE_ENV === 'development') {
// //       config.devtool = 'cheap-module-source-map';
// //     }

// //     return config;
// //   },
//   addWebpackModuleRule({

//     test: /\.worker\.js$/,
//     use: 'file-loader',
//     // test: /ace-builds/,
//     // use: [
//     //   {
//     //     loader: 'worker-loader',
//     //     options: {
//     //       inline: 'fallback',
//     //       filename: 'static/js/[name].[contenthash].worker.js', // Ensure unique worker filenames
//     //     },
//     //   },
//     // ],
//   })
// // );
