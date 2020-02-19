'use strict'

const { equal } = require('tapeless')
const swing = require('./')

const x = swing()()

equal
  .describe(null, 'will default')
  .test(x, 0)
