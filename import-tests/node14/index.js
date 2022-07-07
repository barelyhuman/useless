import assert from 'node:assert'

import classnames from '../../dist/classnames.mjs'

assert.equal(classnames('x', { b: true }), 'x b')
