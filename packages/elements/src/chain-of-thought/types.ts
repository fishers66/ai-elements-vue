import type { Component } from 'vue'

export type ChainOfThoughtStatus = 'thinking' | 'complete' | 'failed'

export interface ChainOfThoughtStep {
  id?: string | number
  label: string
  content?: string
  status?: ChainOfThoughtStatus
  icon?: Component
  meta?: string
}
