# Type Directed Compilation of Row-Typed Algebraic Effects

Daan Leijen, POPL 2017

"_Papers we love_" presentation by Dan Rosén

## The paper

- [Type Directed Compilation of Row-Typed Algebraic Effects](https://www.microsoft.com/en-us/research/wp-content/uploads/2016/12/algeff.pdf)  
  Daan Leijen.
  
## The slides 

- [Slides](http://demo.spraakdata.gu.se/dan/koka-slides/)

## Related reading

- [Effect Handlers in Scope](http://www.cs.ox.ac.uk/people/nicolas.wu/papers/Scope.pdf)  
  Nicolas Wu, Tom Schrijvers, Ralf Hinze.
  
- [Freer Monads, More Extensible Effects](http://okmij.org/ftp/Haskell/extensible/more.pdf)  
  Oleg Kiselyov, Hiromi Ishii.

- [Do be do be do](http://homepages.inf.ed.ac.uk/slindley/papers/frankly.pdf)  
  Sam Lindley, Conor McBride, Craig McLaughlin.

- [Handlers in Action](http://homepages.inf.ed.ac.uk/slindley/papers/handlers.pdf)  
  Ohad Kammar, Sam Lindley, Nicolas Oury.

- [Continuation Passing Style for Effect Handlers](https://bentnib.org/handlers-cps.html)  
  Daniel Hillerström, Sam Lindley, Robert Atkey, and KC Sivaramakrishnan.

- [Monad Transformers and Modular Algebraic Effects: What Binds Them Together](https://lirias.kuleuven.be/handle/123456789/551419)  
  Tom Schrijvers, Maciej Piróg, Nicolas Wu, Mauro Jaskelioff.

- [Programming and Reasoning with Algebraic Effects and Dependent Types](https://pdfs.semanticscholar.org/973c/87a8c2709c7325a099fa09bb381c7b531c38.pdf)  
  Edwin Brady.

- [On the Expressive Power of User-Defined Effects: Effect Handlers, Monadic Reflection, Delimited Control](https://dl.acm.org/citation.cfm?doid=3136534.3110257)  
  Yannick Forster, Ohad Kammar, Sam Lindley, Matija Pretnar.

- [The Category Theoretic Understanding of Universal Algebra: Lawvere Theories and Monads](https://www.dpmms.cam.ac.uk/~martin/Research/Publications/2007/hp07.pdf)  
  Martin Hyland, John Power.
  
## Algebraic effects

Algebraic Effects offer a simple and uniform interface to program effects. They are very expressive: they can capture patterns usually hard-wired into programming languages, such as exceptions, generators (yield), asynchronicity (async and await). Further, they offer a principled approach to impurity: state, heap effects and IO. In comparison to monads they compose in the sense that they can be run in any order (without quadratic encodings such mtl's), and the run functions are easier to implement. 

Algebraic Effects were introduced by Plotkin and Power in 2003, and Algebraic Effect Handlers by Plotkin and Pretnar in 2009 and have gained in popularity and implementations in the recent years, in dedicated languages such as Eff, Links, Frank and Koka, and in libraries for Haskell and Idris. The paper we will give some love this meeting is Daan Leijen's "Type directed compilation of row-typed algebraic effects" from POPL 2017. This article gives an excellent introduction to algebraic effects from a programmer's perspective. It describes his language Koka and shows how to effectively compile it into JavaScript.
