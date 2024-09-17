import { afterAll, beforeAll, describe, it, expect } from 'vitest';
import * as sinon from 'sinon';

import * as a from './ts/a';
import * as b from './ts/b';

describe('sinon.stub', async () => {
  let stub: sinon.SinonStub;
  beforeAll(() => {
    stub = sinon.stub(b, 'bMain').returns(Infinity);
  });
  afterAll(() => {
    stub.restore();
  });
  it('can stubbing', () => {
    console.log('a descripter', Object.getOwnPropertyDescriptor(a, 'aMain'));
    console.log('b descripter', Object.getOwnPropertyDescriptor(b, 'bMain'));
    expect(a.aMain()).toBe(Infinity);
    expect(stub).toHaveBeenCalled();
    expect(stub).toHaveReturnedWith(Infinity);

    // restore
    stub.mockRestore();

    expect(a.aMain()).toBe(1);
  });
});
