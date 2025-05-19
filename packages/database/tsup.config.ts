import { exec } from 'node:child_process';
import { copyFile, rm } from 'node:fs/promises';
import { promisify } from 'node:util';
import { glob } from 'glob';
import { defineConfig } from 'tsup';
import { dependencies } from './package.json';

const pexec = promisify(exec);

export default defineConfig({
  clean: true,
  bundle: true,
  platform: 'node',
  noExternal: [...Object.keys(dependencies)],
  sourcemap: process.env.NODE_ENV !== 'production',
  minifySyntax: process.env.NODE_ENV === 'production',
  minifyWhitespace: process.env.NODE_ENV === 'production',
  minifyIdentifiers: process.env.NODE_ENV === 'production',
  format: ['esm', 'cjs'],
  entry: ['src/**/*.ts'],
  minify: process.env.NODE_ENV === 'production',
  onSuccess: async () => {
    const start = new Date();
    try {
      await pexec('tsc --emitDeclarationOnly --declaration && tsc-alias');
      const files = await glob('dist/**/*.d.ts');
      await Promise.all(
        files.map((file) => copyFile(file, file.replace('.d.ts', '.d.mts'))),
      );
    } catch (err) {
      console.error();
      console.error('Typescript compilation error:');
      console.error();
      console.error(err instanceof Error ? err.message : err);
      throw err;
    }
    const srcFiles = await glob('dist/src/**/*');
    await Promise.all(
      srcFiles.map(async (file) => {
        const newPath = file.replace('dist/src/', 'dist/');
        await copyFile(file, newPath).catch(() => {
          /* ignore if file already exists */
        });
      }),
    );
    await rm('dist/src', { recursive: true });
    const end = new Date();
    console.log(
      `DTS ⚡️ Build success in ${end.getTime() - start.getTime()}ms\n`,
    );
  },
});
