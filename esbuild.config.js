const { build } = require('esbuild');
build({
  entryPoints: ['src/main.ts'],
  outfile: 'dist/bundle.js',
  minify: true,
  bundle: true,
  target: ['ES2016'],
  external: ['express', 'tsyringe', 'reflect-metadata', 'prisma', '@prisma/client', 'bcrypt', 'jsonwebtoken', 'cors'],
});
