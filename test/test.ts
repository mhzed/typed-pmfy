import * as nodeunit from "nodeunit";
import * as tp from "../"
import * as fs from 'fs';
import { setTimeout } from "timers";

export function case1(test: nodeunit.Test) {
  const stat = tp.pmfy(fs.stat);
  stat(__filename).then((stat)=>{ test.done() })
}
export function case2(test: nodeunit.Test) {
  const f = (cb: (err, res?: string)=>void): void=>{
    if (1<2) throw new Error("");
    cb(null);
  }
  const pf = tp.pmfy(f) as ()=>Promise<string>;
  pf().catch((err)=>{ test.done() })
}

export function timeout(test: nodeunit.Test) {
  const stat = tp.pmfy(fs.stat, fs);
  const t = tp.timeOut(1000, stat(__filename));
  t.then((stat)=>{test.done()})

}
export function timeout2(test: nodeunit.Test) {
  const f2 = async(): Promise<[string, number]> => {
    await new Promise((resolve, reject)=>setTimeout(resolve, 50));
    return ['a',1]
  }
  let w = tp.timeOut(1, f2());  // guaranteed timeout
  w.catch(()=>{
    test.done()
  });
}

 // race empty array should resolve
export function race1(test: nodeunit.Test) {
  tp.race([]).then(()=>{ 
    test.done();
  })
}
export function race2(test: nodeunit.Test) {
  tp.race([Promise.reject('e'), Promise.reject('f'), Promise.resolve('x')], false).then(()=>{
    test.ok(false);
  }).catch((v)=>{ 
    test.ok(v === 'e');
    test.done();
  })
}
export function race3(test: nodeunit.Test) {
  tp.race([Promise.reject('e'), Promise.reject('f'), Promise.resolve('x')], true).then((v)=>{ 
    test.ok(v === 'x');
    test.done();
  }).catch((v)=>{
    test.ok(false);
  })
}
