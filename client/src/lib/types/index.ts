export type ArgumentTypes<F extends Function> = F extends (...args: infer A) => any
  ? (...args: A) => any
  : never
