function isNil(p:any): boolean {
  return p === undefined || p === null;
}

/* tslint:disable */
export function pmfy<T>(f: (cb: (err: any, res: T) => void) => void, thisContext?: any): () => Promise<T>;
export function pmfy<A, T>(f: (arg: A, cb: (err: any, res: T) => void) => void, thisContext?: any): (arg: A) => Promise<T>;
export function pmfy<A, A2, T>(f: (arg: A, arg2: A2, cb: (err: any, res: T) => void) => void, thisContext?: any): (arg: A, arg2: A2) => Promise<T>;
export function pmfy<A, A2, A3, T>(f: (arg: A, arg2: A2, arg3: A3, cb: (err: any, res: T) => void) => void, thisContext?: any): (arg: A, arg2: A2, arg3: A3) => Promise<T>
export function pmfy<A, A2, A3, A4, T>(f: (arg: A, arg2: A2, arg3: A3, arg4: A4, cb: (err: any, res: T) => void) => void, thisContext?: any): (arg: A, arg2: A2, arg3: A3, arg4: A4) => Promise<T>;
export function pmfy<A, A2, A3, A4, A5, T>(f: (arg: A, arg2: A2, arg3: A3, arg4: A4, arg5: A5, cb: (err: any, res: T) => void) => void, thisContext?: any): (arg: A, arg2: A2, arg3: A3, arg4: A4, arg5: A5) => Promise<T>;
export function pmfy<A, A2, A3, A4, A5, A6, T>(f: (arg: A, arg2: A2, arg3: A3, arg4: A4, arg5: A5, a6: A6, cb: (err: any, res: T) => void) => void, thisContext?: any): (arg: A, arg2: A2, arg3: A3, arg4: A4, arg5: A5) => Promise<T>;
/* tslint:enable */
export function pmfy(fn: any, thisContext?: any): any {
  if (!isNil(thisContext)) fn = fn.bind(thisContext);
  return function(...fargs) {
    return new Promise((resolve, reject) => {
      fn(...fargs, (err, ...data)=> {
        if (!isNil(err)) reject(err);
        else {
          if (data.length == 0) resolve();
          else resolve(data.length==1?data[0]:data)
        }
      })
    });
  }
}

export function timeOut<T>(mswait: number, promise: Promise<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    let once = false;
    let taskid;
    const finished = ()=>{
      if (!once) {
        once = true;
        if (taskid) clearTimeout(taskid);
        taskid = null;
        return false;
      } else return true;
    }

    if (mswait > 0)
      taskid = setTimeout(()=>{
        if (!finished()) {
          reject(new Error('Timed out after ' + mswait + ' ms'));
        }
      }, mswait)

    promise.catch((err)=>{
      if (!finished()) {
        reject(err);
      }
    }).then((...args)=>{
      if (!finished()) {
        if (args.length == 1) resolve(args[0]);
        else resolve(args as any);
      }
    })
  });
}

/* tslint:disable */
//export function race<T>(ms: number, p: Promise<T>): Promise<T>;
export function race<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>, T8 | PromiseLike<T8>, T9 | PromiseLike<T9>, T10 | PromiseLike<T10>], ignoreError?: boolean): Promise<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9 | T10>;
export function race<T1, T2, T3, T4, T5, T6, T7, T8, T9>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>, T8 | PromiseLike<T8>, T9 | PromiseLike<T9>], ignoreError?: boolean): Promise<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9>;
export function race<T1, T2, T3, T4, T5, T6, T7, T8>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>, T8 | PromiseLike<T8>], ignoreError?: boolean): Promise<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8>;
export function race<T1, T2, T3, T4, T5, T6, T7>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>], ignoreError?: boolean): Promise<T1 | T2 | T3 | T4 | T5 | T6 | T7>;
export function race<T1, T2, T3, T4, T5, T6>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>], ignoreError?: boolean): Promise<T1 | T2 | T3 | T4 | T5 | T6>;
export function race<T1, T2, T3, T4, T5>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>], ignoreError?: boolean): Promise<T1 | T2 | T3 | T4 | T5>;
export function race<T1, T2, T3, T4>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>]): Promise<T1 | T2 | T3 | T4>;
export function race<T1, T2, T3>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>], ignoreError?: boolean): Promise<T1 | T2 | T3>;
export function race<T1, T2>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>], ignoreError?: boolean): Promise<T1 | T2>;
export function race<T>(values: (T | PromiseLike<T>)[], ignoreError?: boolean): Promise<T>;
/* tslint:enable */
export function race(tasks: any[], ignoreError?: boolean): any {
  if (tasks.length == 0) return Promise.resolve();  // end immediately
  if (ignoreError) {
    return Promise.race(tasks.map((task)=>task.catch((err)=>new Promise((resolve, reject)=>{}))));
  } else {
    return Promise.race(tasks);
  }
}
