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
  (s: string | (VNode | null | undefined)[], ...cls: string[]) =>
  h('div', {classes: [main_class, ...cls]}, s as any)

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

const Border = div(style(
  {border: '1vh ' + col2 + ' solid',
   height: 'calc(100% - 1vh)',
   borderRadius: '1vh'
  },
  //csstips.padding(0, '2vw')
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

const bullet = div(style(
  {fontSize: '7vh'},
  {
    $nest: {
      '&::before': {
        'content': `'\u25cf'`,
        fontSize: '8vh',
        paddingRight: '2vw',
        color: col2
      }
    }
  },
  csstips.padding(0, '2vw')
))

const underbullet = div(style(
  {fontSize: '7vh'},
  {
    $nest: {
      '&::before': {
        'content': `'\u25b6'`,
        fontSize: '5vh',
        paddingRight: '2vw',
        color: col2
      }
    }
  },
  csstips.padding(0, '9vw')
))


const smallbullet = div(style(
  {fontSize: '6vh'},
  {
    $nest: {
      '&::before': {
        'content': `'\u25cf'`,
        fontSize: '4vh',
        paddingRight: '2vw',
        color: col2
      }
    }
  },
  csstips.padding(0, '2vw')
))


const content = div(style(
  {fontSize: '8vh'},
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
   div(style(csstips.horizontal,
             csstips.horizontallySpaced('1vh'),
             {flexGrow: 1},
               ))(
     xs.map((x: VNode[]) => div(style(csstips.flex1))(x))
   )

const slides: VNode[] = [
  [title('Type Directed Compilation of Row-Typed Algebraic Effects'),
   subtitle('Daan Leijen, POPL 2017', Col2),
   subtitle('"Papers we love", Dan Rosén')
  ],
  ...unveil(
  [header('Elon Musk motivates space travel:'),
   bullet('"I want the future to be exciting"'),
   header('Me motivating effect types:'),
   bullet('"I want programming to be exciting"'),
  ]),
  [header('Motivation'),
   SideBySide(
     [Border([
      content('Python/JS/...'),
      smallbullet('yield'),
      smallbullet('async/await'),
      smallbullet('list comprehensions'),
      smallbullet('exceptions'),
     ])],
     [Border([
      content('Haskell monads:'),
      smallbullet("do notation"),
      smallbullet("transformers for composition"),
      smallbullet("code duplication: both map and mapM"),
     ])],
   ) /*,
     Border([
      content('Other FP:'),
      smallbullet("need to solve this in some way"),
      smallbullet("static types"),
      smallbullet("strict"),
     ], style({height: '40%'}))
     */
  ],
  ...unveil(
  [header('We need to talk about control flow'),
   bullet('or we miss out on a lot of fun'),
   bullet('or we miss out on expressivity'),
   bullet('possibly in a lot of pain'),
   bullet('reinventing the wheel'),
   punch('Real world examples!'),
  ]),
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
     code(`for x in EXPR:
  yield x`, Small),
     small('introduces:'),
     code(`yield from EXPR`, Small),
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
   code(`function foo(url) {
  return fetch(url)
    .then(response => response.json())
    .then(obj => obj.name)
   }`),
   code(`async function foo(url) {
  const response = await fetch(url);
  const obj = await response.json();
  return obj.name;
}`)
  ],
  [header('async/await in python'),
   bullet('bleeds into every construct:'),
   code(`result = []
async for i in aiter():
    if i % 2:
        result.append(i)`),
   bullet('PEP 530 -- Asynchronous Comprehensions'),
   code(`result = [i async for i in aiter() if i % 2]`),
   //small('With the proposed asynchronous comprehensions syntax, the above code becomes as short as:'),
  ],
  ...unveil(
  [header('Control flow structures'),
   bullet('exceptions'),
   bullet('yield (generators)'),
   bullet('async-await'),
   bullet('foreach, list comprehensions'),
   punch('algebraic effects can express all of these & interactions between them')
  ]),
  ...unveil(
  [header('Algebraic effects'),
   code(`effect throws {
    raise(s: string): a
}`),
   code(`raise: string -> a ! throws`),
   code(`function try(p: () -> r ! throws,
             catch: string -> r): r {
  handle p() {
    case raise(s), resume: catch(s)
    case done(x): x
  }
}`)]),
  [header('Demo'),
   bullet('Daan: koka'),
   bullet("Dan: EffectScript")
  ],
  [header('async/await'),
   code(`effect ajax {
  fetch(url: string, data: json): json
}`),
   code(`handle p() {
  case fetch(url, data), resume:
    JS_ajax(url, data, result => resume(result))
  case done(x): x
}`)],
  [header('async/await mock'),
   code(`effect ajax {
  fetch(url: string, data: json): json
}`),
   code(`handle p() {
  case fetch(url, data), resume:
    resume({name: "Estelle"})
  case done(x): x
}`),
  ],
  ...unveil([header('Row polymorphism'),
   code(`t ::= t -> t ! e | string | int | x | ...
e ::= l(t...); e | <> | a`),
   code(`itermap(f: A -> B ! E,
        p: () -> R ! iter<A> ; F)
        : R ! iter<B> ! E + F`, style({color: red})),
   code(`itermap(f: A -> B ! E,
        p: () -> R ! iter<A> ; E)
        : R ! iter<B> ; E`, style({color: green}))
  ]),
  [header('Row polymorphism fields'),
   code('l1(t); l2(t); E = l2(t); l1(t); E      l1/=l2'),
   bullet('duplicate labels (koka) or absence fields:'),
   code(`sig state : (s) ->
       (Comp({Get:s,Put:(s) {}-> ()|e},a))
       -> Comp({Get{_},Put{_}|e},a)`)
  ],
  ...unveil([header('Small-step semantics'),
   code(`v ::= f | x | 1 | ... | function f(x...) { e }
e ::= v(v...) | x = e; e | handle e { cases }
                         | switch v { cases }`),
   code(`C ::= [] | x = C; e | handle C { cases }`),
  ]),
  ...unveil([header('Small-step semantics'),
   code(`C ::= [] | x = C; e | handle C { cases }`),
   code(`handle v { cases } -> e[v/x]
  case done(x): e \u2208 cases`),
  code(`handle C[op(v)] { cases } ->
  e[v/x, y => handle C[y] { cases } / resume]

  case op(x), resume: e \u2208 cases`)
  ]),
  [header('Compilation to JavaScript'),
   bullet('transfrom code to CPS, now contexts are:'),
   code(`C ::= [] | handle C { cases }`),
   bullet('run time system with stack of handlers'),
  ],
  [header('Polymorphic duplication'),
   code('map(xs: List<a>, f: a -> b ! e): List<b> ! e'),
   code(`(xs, f, k) => if k
                 then mapCPS(xs, f, k)
                 else mapPlain(xs, f)`),
  ],
  // can we make a case for state effects
  // at the same time as these? hum-de-dum...
  // maybe we can be an argument for purity and
  // having state as an effect
  [header('Gains from a Haskell perspective'),
   bullet('no do-notation'),
   bullet('no duplicate code'),
   bullet('compose (no mtl, MonadTrans)'),
   bullet('"mockable"'),
   bullet('no >>=: run functions easier to write'),
   bullet('strict evaluation: no more abusing lazy lists'),
  ],
  [header('Drawbacks'),
   bullet('scoping'),
   underbullet('examples "Effect Handlers in Scope"'),
   bullet('efficiency?'),
   underbullet('monads carry their implementation'),
   underbullet('multiple resumptions'),
  ],
  ...unveil([header('Conclusions'),
   bullet('control flow is important'),
   bullet('solve common issues once and for all'),
   bullet('in a composable (and mockable) manner'),
   bullet('language with few constructs yet expressive'),
   bullet('all impurities tracked yet imperative feel'),
   code('github.com/danr/koka-slides'),
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

