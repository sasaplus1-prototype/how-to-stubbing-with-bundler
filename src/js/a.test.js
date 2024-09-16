import * as assert from 'node:assert/strict';
import { after, before, describe, it } from 'node:test';
import * as sinon from 'sinon';

import * as b from './b';
import * as a from './a';

describe('sinon.stub', () => {
  let stub;
  before(() => {
    stub = sinon.stub(b, 'bMain').returns('stub');
  });
  after(() => {
    stub.restore();
  });
  it('can stubbing', () => {
    assert.strictEqual(a.aMain(), 'stub');
  });
});
