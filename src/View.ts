import { classes_module } from './Classes'
import * as typestyle from "typestyle"

import * as snabbdom from "snabbdom"
import snabbdomEvents from 'snabbdom/modules/eventlisteners'
import snabbdomAttributes from 'snabbdom/modules/attributes'

import { h } from "snabbdom"
import './Classes'
import * as Classes from './Classes'
import { VNode } from "snabbdom/vnode"
import * as csstips from "csstips"
import { style } from "typestyle"

const base03="#222"
const base02="#073642"
const base01="#586e75"
const base00="#657b83"
const base0="#839496"
const base1="#93a1a1"
const base2="#eee8d5"
const base3="#fdf6e3"
const yellow="#b58900"
const orange="#cb4b16"
const red="#dc322f"
const magenta="#d33682"
const violet="#6c71c4"
const blue="#268bd2"
const cyan="#2aa198"
const green="#859900"

const bg = base03
const fg = base2

const col1 = cyan
const col2 = yellow
const col3 = red

const Col2 = style(
  { color: col2 }
)

const Small = style(
  { fontSize: '4vh' }
)

const Slide = style(
  csstips.vertical,
  {
    background: bg,
    color: fg,
    fontSize: '12vh',
    fontFamily: 'Source Sans Pro'
  },
  csstips.fillParent
)

const div =
  (main_class: string = '') =>
  (s: any, ...cls: string[]) =>
  h('div', {classes: [main_class, ...cls]}, s)

const Code = style(
  { fontSize: '5vh' },
  csstips.padding(0, '4vw'),
)

const code =
  (s: string, ...cls: string[]) =>
  h('pre', {classes: [Code, ...cls]}, s)

const small = div(style(
  {fontSize: '4vh'},
  csstips.padding(0, '2vw')
))


const title = div(style(
  {fontSize: '11vh'},
  {fontFamily: 'Montserrat'},
  csstips.flex4,
  csstips.centerCenter,
  csstips.padding(0, '10vw'),
  {textAlign: 'center'},
  {color: col1}
))

const subtitle = div(style(
  {fontSize: '8vh'},
  csstips.flex2,
  csstips.centerCenter
))

const header = div(style(
  {fontSize: '11vh'},
  {fontFamily: 'Montserrat'},
  {textAlign: 'center'},
  {color: col1},
  csstips.padding(0, '2vw')
))

const content = div(style(
  {fontSize: '8vh'},
  {
    $nest: {
      '&::before': {
        'content': `'\u25cf'`,
        fontSize: '10vh',
        paddingRight: '2vw',
        color: col2
      }
    }
  },
  csstips.padding(0, '2vw')
))

const punch = div(style(
  {fontSize: '10vh'},
  {color: col3},
  csstips.padding(0, '2vw'),
  {textAlign: 'center'},
  {fontStyle: 'italic'},
))


const unveil = (xs: VNode[]) => {
  const hdr = xs[0]
  return xs.map((_, i) => [hdr, ...xs.slice(1,i+1)])
}

const SideBySide = (...xs : VNode[][]) =>
   div(style(csstips.horizontal))(
     xs.map((x: VNode[]) => div(style(csstips.flex1))(x))
   )

const slides: VNode[] = [
  [title('Type Directed Compilation of Row-Typed Algebraic Effects'),
   subtitle('Daan Leijen, POPL 2017', Col2),
   subtitle('"Papers we love", Dan Rosén')
  ],
  ...unveil(
  [header('Elon Musk motivates space travel:'),
   content('"I want the future to be exciting"'),
   header('Me motivating effect types:'),
   content('"I want programming to be exciting"'),
  ]),
  ...unveil(
  [header('We need to talk about control flow'),
   content('or we miss out on a lot of fun'),
   content('or we miss out on expressivity'),
   content('possibly in a lot of pain'),
   content('reinventing the wheel'),
  ]),
  [header('Real world examples!')],
  [header('Generators in ES2015'),
   code(
`function* countAppleSales () {
  var saleList = [3, 7, 5]
  for (var i = 0; i < saleList.length; i++) {
    yield saleList[i]
  }
}`)
  ],
  [header('yield from, python3.3 (2009)'),
   SideBySide([
     small('PEP 380: Syntax for Delegating to a Subgenerator'),
     code(`RESULT = yield from EXPR`, Small),
     small('is semantically equivalent to:'),
   ], [code(
`_i = iter(EXPR)
try:
    _y = next(_i)
except StopIteration as _e:
    _r = _e.value
else:
    while 1:
        try:
            _s = yield _y
        except GeneratorExit as _e:
            try:
                _m = _i.close
            except AttributeError:
                pass
            else:
                _m()
            raise _e
        except BaseException as _e:
            _x = sys.exc_info()
            try:
                _m = _i.throw
            except AttributeError:
                raise _e
            else:
                try:
                    _y = _m(*_x)
                except StopIteration as _e:
                    _r = _e.value
                    break
        else:
            try:
                if _s is None:
                    _y = next(_i)
                else:
                    _y = _i.send(_s)
            except StopIteration as _e:
                _r = _e.value
                break
RESULT = _r`, style({fontSize: '1.5vh'}))])
  ],
  [header('async/await, ES2017'),
   code(`function foo() {
  return fetch('https://swapi.co/api')
    .then(response => response.json())
    .then(obj => obj.name)
   }`),
   code(`async function foo() {
  const response = await fetch('https://swapi.co/api');
  const parsedResponse = await response.json();
  return parsedResponse.name;
}`)
  ],
  [header('async comprehensions, python 3.6 (2016)'),
   small('PEP 530 -- Asynchronous Comprehensions'),
   code(`result = []
async for i in aiter():
    if i % 2:
        result.append(i)`),
   small('With the proposed asynchronous comprehensions syntax, the above code becomes as short as:'),
   code(`result = [i async for i in aiter() if i % 2]`)
  ],
  ...unveil(
  [header('Control flow structures'),
   content('exceptions'),
   content('yield (generators)'),
   content('async-await'),
   content('foreach, list comprehensions'),
   punch('algebraic effects can express all of these & interactions between them')
  ]),
  [header('Small-step semantics'),
   content('Image from paper?'),
  ],
  [header('Types'),
   content('arrows with effects A -> B ! E'),
   content('row types, polymorphic in the tail'),
   content('duplicate labels or absence fields'),
  ],
  [header('Compilation to JavaScript'),
   content('run-type information if code is in CPS or not'),
   content('selective CPS translation'),
   content('some effects handled by JS (heap & references)'),
   content('alternative: effect conversion'),
  ],
  // can we make a case for state effects
  // at the same time as these? hum-de-dum...
  // maybe we can be an argument for purity and
  // having state as an effect
  [header('Gains from a Haskell perspective'),
   content('no do-notation'),
   content('no duplicate code for monadic and non-monadic functions'),
   content('compose (no mtl, MonadTrans)'),
   content('"mockable"'),
   content('run functions easier to write as >>= does not need to be defined'),
   content('monad laws satisfied automatically'),
   content('enforces strict evaluation: no more abusing laziness and lists'),
  ],
  ...unveil([header('Conclusions'),
   content('control flow is important'),
   content('solve common issues once and for all'),
   content('in a composable (and mockable) manner'),
   content('a very expressive language with a very small core'),
   content('seamless tracking of impurities in a language with imperative feel'),
  ])
].map((slide, i, self) =>
  h('div', {
    classes: [Slide],
    on: {
      keydown: (e: KeyboardEvent) => {
        if (e.code == 'ArrowLeft') {
          if (i > 0) {
            window.location.hash = '' + (i - 1)
          }
        } else if (e.code == 'ArrowRight') {
          if (i < self.length - 1) {
            window.location.hash = '' + (i + 1)
          }
        } else {
          console.log(e.code)
        }
      },
      click: (e: MouseEvent) => {
        console.log(e)
      }
    },
    attrs: {
      tabindex: '-1'
    },
    hook: {
      insert: focus,
      update: (_, n) => focus(n)
    }
  }, slide)
)

const focus = (vnode: VNode) => {
  if (vnode.elm) {
    (vnode.elm as HTMLElement).focus()
    console.log('focused')
  }
}

export function bind(root_element: HTMLElement, slide_number: number): () => number {
  while (root_element.lastChild) {
    root_element.removeChild(root_element.lastChild)
  }

  const patch = snabbdom.init([classes_module, snabbdomAttributes, snabbdomEvents])
  const container = document.createElement('div')
  root_element.appendChild(container)
  let vnode = patch(container, snabbdom.h('div'))

  let state: number

  function update_view(slide_number: number) {
    state = slide_number
    console.log(state)
    vnode = patch(vnode, slides[state])
    const elm = (vnode as any).elm
  }

  update_view(slide_number)

  return () => state
}

