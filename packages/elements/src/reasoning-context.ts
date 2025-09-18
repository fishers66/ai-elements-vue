import type { InjectionKey } from 'vue'

export interface ReasoningContextValue {
  isStreaming: boolean
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  duration: number
}

export const ReasoningContextKey: InjectionKey<ReasoningContextValue> = Symbol('reasoning')
