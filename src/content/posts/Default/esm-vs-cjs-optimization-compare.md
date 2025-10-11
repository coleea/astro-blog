---
title: React.js still doesn't support ESM. But why it can be problematic
published: 2025-10-12
description: ""
image: "./opposite-words-for-fast-and-slow-cartoon-vector.jpg"
tags: []
category: Default
draft: false

---

https://github.com/facebook/react/issues/11503

in 2017-11-10, React team member once said that 

> `Currently we only ship CommonJS versions of all packages. However we might want to ship them as ESM in the future` 

And 8 years later (2025-10-12), React still does not support ESM.

But you might ask `hey, whether react.js support esm or not, my project works well. so I have no problem anything.`

Yeah right. Your project work well and there is no problem. But in above link, some user `alshdavid` point out why it matters. 

He said like this:

---

> One example of a deoptimization is; because CJS exports can be modified at runtime, bundlers cannot assume stable exports for CJS values.

> For example, look at this abomination:

```js
const foo = require('./something')

setTimeout(() => {
  foo.bar = 'I reassigned a value in another module at runtime'
}, 2000)
```

>Why is this legal?!?! 😆

>So bundler CJS emulation involves checking the value of every module.exports property every single time it is accessed. This makes every single property access 10x slower with CJS than ESM (which can be heavily optimised).

>In the case of React, how many times do you call createElement? Every call must recompute the exported value at runtime which is absurdly wasteful.


---

In summary, CJS-based export statement cannot be optimized by Javascript Engine (such as V8, Javascript Core). While ESM-based export statement can be optimized.

because exported variables/functions in ES Module cannot be mutated, in other words, It is immutable. So Javascript Engine can be determine the exact memory location at Compile time, and reuse them until browser tab is closed.

But It it too vague statment. Can we check this optimization in our eyes? Sure.

node.js and chrome use the same Javascript engine : `V8`. let's check this optimization via node.js.

