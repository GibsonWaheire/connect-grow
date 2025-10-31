// Production Build Configuration
// Copyright (c) 2024 Peter's School Help. All rights reserved.

export const productionConfig = {
  // Minification settings
  minify: true,
  obfuscate: true,
  
  // Security settings
  removeConsole: true,
  removeDebugger: true,
  removeComments: true,
  
  // Optimization settings
  compress: true,
  optimize: true,
  treeShake: true,
  
  // Build settings
  sourcemap: false,
  target: 'es2015',
  mode: 'production',
  
  // Protection settings
  protectCode: true,
  secureBuild: true,
  copyrightNotice: true,
};

export default productionConfig;
