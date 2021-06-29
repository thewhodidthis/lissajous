import { assert, report } from "tapeless"
import swing from "./main.js"

const { equal } = assert

const x = swing()()

equal
  .describe(null, "will default")
  .test(x, 0)

report()
