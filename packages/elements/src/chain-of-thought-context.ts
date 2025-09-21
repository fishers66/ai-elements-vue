import type { ComputedRef, InjectionKey } from 'vue'

export interface ChainOfThoughtContextValue {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

export const ChainOfThoughtContextKey: InjectionKey<ComputedRef<ChainOfThoughtContextValue>> = Symbol('chain-of-thought')
