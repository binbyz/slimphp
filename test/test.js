'use strict'

const expect = require('chai').expect
const slim = require('../dist/slimphp.js')

describe('Slim Javascript Library Test', () => {

  // isString()
  it('isString() should return true', () => {
    const result = slim.isString('slim library')
    expect(result).to.equal(true)
  })

  // isInt()
  it('isInt() should return true', () => {
    const result = slim.isInt(77)
    expect(result).to.equal(true)
  })

  // isFloat()
  it('isFloat() should return true', () => {
    const result = slim.isFloat(3.14)
    expect(result).to.equal(true)
  })

  // isNull()
  it('isNull() should return true', () => {
    const result = slim.isNull(null)
    expect(result).to.equal(true)
  })

  // isUndefined()
  it('isUndefined() should return true', () => {
    const result = slim.isUndefined(undefined)
    expect(result).to.equal(true)
  })

  // datetime()
  it('datetime() should match /\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}/', () => {
    const result = slim.datetime()
    expect(result).to.match(/\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}/)
  })
})
