import {debug} from './dev'
import * as csstips from "csstips"
csstips.normalize()
csstips.setupPage('#root')

const root = document.getElementById('root') as HTMLElement

const parse_hash = () => {
  const hash_text = decodeURIComponent(window.location.hash.slice(1))
  const slide = parseInt(hash_text, 10) || 0
  return slide
}

let View = require('./View')

let get = View.bind(root, parse_hash())

// could retain history, but we reinitialize the data here
window.onhashchange = () => {
  get = View.bind(root, parse_hash())
}

declare const module: any;

if (debug) {
  if (module.hot) {
    module.hot.accept('./View.ts', (_: any) => {
      View = require('./View.ts')
      get = View.bind(root, get())
    })
  }
}
