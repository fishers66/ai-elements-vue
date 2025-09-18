import type { Component } from 'vue'

export interface SuggestionItem {
  id?: string | number
  label: string
  description?: string
  icon?: Component
  shortcut?: string
  disabled?: boolean
  data?: Record<string, unknown>
}
