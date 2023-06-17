type WithCond<T> = {
  elem: T
  cond?: () => boolean
}

export const createWithCond = <T>(
  elem: T,
  cond?: () => boolean
): WithCond<T> => ({
  elem,
  cond,
})

export const filterWithCond = <T>(list: WithCond<T>[]) =>
  list.filter((e) => (e.cond ? e.cond() : true)).map((e) => e.elem)
