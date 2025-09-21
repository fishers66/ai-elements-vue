import type { Component } from 'vue'

export type ToolCallStatus = 'pending' | 'running' | 'success' | 'error'

export interface ToolCall {
  id?: string | number
  name: string
  description?: string
  status?: ToolCallStatus
  icon?: Component
  request?: unknown
  response?: unknown
  latency?: string
}
