<script setup lang="ts">
import type { BranchContextValue } from './branch-context'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { computed, inject } from 'vue'
import { BranchContextKey } from './branch-context'

interface BranchPageProps {
  class?: string
}

defineProps<BranchPageProps>()

const context = inject<BranchContextValue>(BranchContextKey)

if (!context) {
  throw new Error('BranchPage must be used within Branch')
}

const { currentBranch, totalBranches } = context

const pageText = computed(() => `${currentBranch + 1} of ${totalBranches}`)
</script>

<template>
  <span
    :class="cn(
      'font-medium text-muted-foreground text-xs tabular-nums',
      $props.class,
    )"
  >
    {{ pageText }}
  </span>
</template>
