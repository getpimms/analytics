const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

const baseConfig = {
  bundle: true,
  minify: true,
  format: 'iife',
  target: 'es2015',
};

// Helper to read and combine files
const combineFiles = (files) => {
  // Just concatenate the files, esbuild will handle the IIFE wrapping
  return files.map((file) => fs.readFileSync(file, 'utf8')).join('\n');
};

// Ensure dist/analytics exists
fs.mkdirSync(path.join(__dirname, 'dist/analytics'), { recursive: true });

// Copy _redirects to dist folder
fs.copyFileSync(
  path.join(__dirname, 'public/_redirects'),
  path.join(__dirname, 'dist/_redirects'),
);

// Build all variants
Promise.all([
  // Base script
  esbuild.build({
    ...baseConfig,
    stdin: {
      contents: fs.readFileSync('src/base.js', 'utf8'),
      resolveDir: __dirname,
      sourcefile: 'base.js',
    },
    outfile: 'dist/analytics/script.js',
  }),

  // Site visit tracking
  esbuild.build({
    ...baseConfig,
    stdin: {
      contents: combineFiles(['src/base.js', 'src/extensions/site-visit.js']),
      resolveDir: __dirname,
      sourcefile: 'combined.js',
    },
    outfile: 'dist/analytics/script.site-visit.js',
  }),

  // Outbound domains tracking
  esbuild.build({
    ...baseConfig,
    stdin: {
      contents: combineFiles([
        'src/base.js',
        'src/extensions/outbound-domains.js',
      ]),
      resolveDir: __dirname,
      sourcefile: 'combined.js',
    },
    outfile: 'dist/analytics/script.outbound-domains.js',
  }),

  // Complete script with concatenated feature names
  esbuild.build({
    ...baseConfig,
    stdin: {
      contents: combineFiles([
        'src/base.js',
        'src/extensions/site-visit.js',
        'src/extensions/outbound-domains.js',
      ]),
      resolveDir: __dirname,
      sourcefile: 'combined.js',
    },
    outfile: 'dist/analytics/script.site-visit.outbound-domains.js',
  }),

  // Detect IDs + support embed
  esbuild.build({
    ...baseConfig,
    stdin: {
      contents: combineFiles([
        'src/base.js',
        'src/extensions/detect-ids.js',
        'src/extensions/support-embed.js',
      ]),
      resolveDir: __dirname,
      sourcefile: 'combined.js',
    },
    outfile: 'dist/analytics/script.detection.js',
  }),

  // Expose ids: independent of the script
  esbuild.build({
    ...baseConfig,
    stdin: {
      contents: fs.readFileSync('src/extensions/expose-ids.js', 'utf8'),
      resolveDir: __dirname,
      sourcefile: 'base.js',
    },
    outfile: 'dist/analytics/script.expose.js',
  }),

  // Inject form: independent of the script
  esbuild.build({
    ...baseConfig,
    stdin: {
      contents: fs.readFileSync('src/extensions/inject-form.js', 'utf8'),
      resolveDir: __dirname,
      sourcefile: 'base.js',
    },
    outfile: 'dist/analytics/script.inject-form.js',
  }),
]).catch(() => process.exit(1));
