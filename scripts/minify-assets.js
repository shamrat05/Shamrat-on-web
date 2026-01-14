#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

/**
 * Minifies CSS and JavaScript files using esbuild
 */
async function minifyAssets() {
  console.log('🚀 Starting asset minification...');
  
  // Define paths
  const srcAssetsDir = path.join(__dirname, '..', 'src', 'assets');
  const siteAssetsDir = path.join(__dirname, '..', '_site', 'assets');
  
  // Bundle Analytics
  await bundleAnalytics(srcAssetsDir, siteAssetsDir);

  // Minify CSS
  await minifyCSS(srcAssetsDir, siteAssetsDir);
  
  // Minify JavaScript
  await minifyJS(srcAssetsDir, siteAssetsDir);
  
  console.log('✅ Asset minification completed!');
}

/**
 * Bundles Vercel Analytics using esbuild
 */
async function bundleAnalytics(srcDir, destDir) {
  console.log('📊 Bundling Analytics...');
  const entryPoint = path.join(srcDir, 'js', 'vercel-analytics.js');
  const destJsDir = path.join(destDir, 'js');
  const outfile = path.join(destJsDir, 'vercel-analytics.js');

  if (!fs.existsSync(entryPoint)) {
     console.log('⚠️ Analytics source file not found, skipping...');
     return;
  }

  // Ensure destination directory exists
  if (!fs.existsSync(destJsDir)) {
    fs.mkdirSync(destJsDir, { recursive: true });
  }

  try {
    await esbuild.build({
      entryPoints: [entryPoint],
      outfile: outfile,
      bundle: true,
      minify: true,
      platform: 'browser',
      target: ['es2020'],
    });
    console.log('  ✅ Analytics bundled successfully');
  } catch (error) {
    console.error('  ❌ Error bundling analytics:', error);
  }
}

/**
 * Minifies CSS files using esbuild (supports @import bundling)
 */
async function minifyCSS(srcDir, destDir) {
  console.log('📄 Bundling and Minifying CSS...');
  
  const entryPoint = path.join(srcDir, 'css', 'styles.css');
  const destCssDir = path.join(destDir, 'css');
  const outfile = path.join(destCssDir, 'styles.css');
  
  if (!fs.existsSync(entryPoint)) {
    console.log('⚠️  CSS entry point not found, skipping...');
    return;
  }
  
  // Ensure destination directory exists
  if (!fs.existsSync(destCssDir)) {
    fs.mkdirSync(destCssDir, { recursive: true });
  }
  
  try {
    await esbuild.build({
      entryPoints: [entryPoint],
      outfile: outfile,
      bundle: true,
      minify: true,
      loader: { '.css': 'css' },
    });
    console.log('  ✅ CSS bundled and minified successfully');
  } catch (error) {
    console.error('  ❌ Error bundling CSS:', error);
  }
}

/**
 * Minifies JavaScript files using esbuild (supports ES modules bundling)
 */
async function minifyJS(srcDir, destDir) {
  console.log('📜 Bundling and Minifying JavaScript...');
  
  const entryPoint = path.join(srcDir, 'js', 'script.js');
  const destJsDir = path.join(destDir, 'js');
  const outfile = path.join(destJsDir, 'script.js');
  
  if (!fs.existsSync(entryPoint)) {
    console.log('⚠️  JavaScript entry point not found, skipping...');
    return;
  }
  
  // Ensure destination directory exists
  if (!fs.existsSync(destJsDir)) {
    fs.mkdirSync(destJsDir, { recursive: true });
  }
  
  try {
    await esbuild.build({
      entryPoints: [entryPoint],
      outfile: outfile,
      bundle: true,
      minify: true,
      platform: 'browser',
      target: ['es2020'],
    });
    console.log('  ✅ JavaScript bundled and minified successfully');
  } catch (error) {
    console.error('  ❌ Error bundling JavaScript:', error);
  }
}

// Run the minification
minifyAssets().catch(error => {
  console.error('❌ Minification failed:', error);
  process.exit(1);
});
