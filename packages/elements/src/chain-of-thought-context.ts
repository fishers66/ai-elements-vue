import type { InjectionKey } from 'vue'

export interface ChainOfThoughtContextValue {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

export const ChainOfThoughtContextKey: InjectionKey<ChainOfThoughtContextValue> = Symbol('chain-of-thought')
