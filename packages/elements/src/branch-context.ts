import type { VNode } from 'vue'

export interface BranchContextValue {
  currentBranch: number
  totalBranches: number
  goToPrevious: () => void
  goToNext: () => void
  branches: VNode[]
  setBranches: (branches: VNode[]) => void
}

export const BranchContextKey = Symbol('branch-context') as symbol
