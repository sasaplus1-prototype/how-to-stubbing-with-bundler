import { afterAll, beforeAll, describe, it, expect, vi } from 'vitest';

import * as a from './ts/a';
import * as b from './ts/b';

describe('sinon.stub', async () => {
  let spy: ReturnType<typeof vi.spyOn>;
  beforeAll(() => {
    spy = vi.spyOn(b, 'bMain').mockReturnValue(Infinity);
  });
  afterAll(() => {
    // spy.mockRestore();
  });
  it('can stubbing', () => {
    console.log('a descripter', Object.getOwnPropertyDescriptor(a, 'aMain'));
    console.log('b descripter', Object.getOwnPropertyDescriptor(b, 'bMain'));
    expect(a.aMain()).toBe(Infinity);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveReturnedWith(Infinity);

    // restore
    spy.mockRestore();

    expect(a.aMain()).toBe(1);
  });
});
