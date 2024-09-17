import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['./src/a.test.vitest.ts', './src/a.test.vitest.sinon-stub.ts']
  }
});
