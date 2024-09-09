import * as esbuild from 'esbuild';

await esbuild.build({
  entryPoints: ['src/main.ts'],
  bundle: true,
  outdir: 'dist',
  minify: false,
  format: 'cjs',
  platform: 'node',
  target: 'esnext',
});
