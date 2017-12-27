typed-pmfy
--------

A few helpers for working with promise in typescript.

## install

    npm install typed-pmfy

## api

### pmfy

Turns node style async functions into returning promises.

Signature 

    function pmfy(fn: any, thisContext?: any): Promise;

    // fn is a node style async function, meaning:
    // 1. last parameter is callback
    // 2. callback first paramter is reserved as error

Example

    import * as fs from 'fs';
    import {pmfy} from "typed-pmfy"
    const stat = pmfy(fs.stat);
    stat(__filename).then((stat)=>{ test.done() })

Caveats: a few overloaded pmfy definitions with different tmeplate paramters are exported, but they do not cover every use case.
If typescript complains, simply override it.  Example:

    const pmfyCall = pmfy(somefunction) as (arg1: T1, arg2: T2)=>Promise<R>;

### timeOut

Signature 

    function timeOut<T>(mswait: number, promise: Promise<T>): Promise<T> ;

Example

    import {timeOut} from "typed-pmfy"
    const f2 = async(): Promise<string> => {  // resolve 'a' after 50ms
      await new Promise((resolve, reject)=>setTimeout(resolve, 50));
      return 'a';
    }
    let w = timeOut(1, f2());  // wait for f2(), but only for 1ms, reject if timed out
    w.catch((err)=>{
      console.log(err);   // timed out error here
    });

### race

Wrapper around Promise.race with tweaks.  See Examples below.

Signature 

    function race(tasks: PromiseLike[], ignoreError?: boolean): Promise;

Example:

Race empty array resolves instead of hanging.

    import {race} from "typed-pmfy"
    race([]).then(()=>{ 
      console.log('this resolves');
    })

Allow ignore error when racing, when called with 'true' as 2nd parameter.

    race([Promise.reject('e'), Promise.reject('f'), Promise.resolve('x')], true).then((v)=>{ 
      console.log(v);   // v is 'x', 
    }).catch((v)=>{
      console.log('never gets here');
    })

If all raced Promises are rejected, how to prevent race from hanging?  Use timeOut:

    import {race, timeOut} from "typed-pmfy"
    timeOut(1000, race(tasks, true)).then((result)=>{}).catch((timeoutError)=>{});