/* eslint-disable no-useless-call */

interface IFn {
  (a: any): any
}

export const composeAsync = (...fns: Function[]) => async (...args: any[]) => {
  const length = fns.length

  let res: any[] = args

  for (let i = length - 1; i >= 0; i--) {
    const fn = fns[i]
    res = [await fn.call(null, ...res)]
  }

  return res[0]
}

export const compose = (...fns: IFn[]) => (...args: any[]) => fns.reduceRight((res, fn) => [fn.call(null, ...res)], args)[0]

// ==============================

async function first (zeroth = '0') {
  return `${zeroth} 1`
}

async function second (first: string) {
  return `${first} 2`
}

function third (second: string) {
  return `${second} 3`
}

const func = composeAsync(third, second, first)

func(0)
