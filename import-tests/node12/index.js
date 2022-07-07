const assert = require('assert')

const classnames = require('../../dist/classnames').default

assert.equal(classnames('x', { b: true }), 'x b')
