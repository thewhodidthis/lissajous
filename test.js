'use strict'

const { equal } = require('tapeless')
const swing = require('./')

const x = swing()()

equal(x, 0, 'will default')
