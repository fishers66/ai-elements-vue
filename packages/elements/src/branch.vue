<script setup lang="ts">
import type { VNode } from 'vue'
import type { BranchContextValue } from './branch-context'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { provide, ref } from 'vue'
import { BranchContextKey } from './branch-context'

interface BranchProps {
  defaultBranch?: number
  onBranchChange?: (branchIndex: number) => void
  class?: string
}

const props = withDefaults(defineProps<BranchProps>(), {
  defaultBranch: 0,
})

const currentBranch = ref(props.defaultBranch)
const branches = ref<VNode[]>([])

function handleBranchChange(newBranch: number) {
  currentBranch.value = newBranch
  props.onBranchChange?.(newBranch)
}

function goToPrevious() {
  const newBranch = currentBranch.value > 0 ? currentBranch.value - 1 : branches.value.length - 1
  handleBranchChange(newBranch)
}

function goToNext() {
  const newBranch = currentBranch.value < branches.value.length - 1 ? currentBranch.value + 1 : 0
  handleBranchChange(newBranch)
}

function setBranches(newBranches: VNode[]) {
  branches.value = newBranches
}

const contextValue: BranchContextValue = {
  currentBranch: currentBranch.value,
  totalBranches: branches.value.length,
  goToPrevious,
  goToNext,
  branches: branches.value,
  setBranches,
}

provide(BranchContextKey, contextValue)
</script>

<template>
  <div
    :class="cn('grid w-full gap-2 [&>div]:pb-0', $props.class)"
  >
    <slot />
  </div>
</template>
