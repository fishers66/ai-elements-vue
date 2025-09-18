<script setup lang="ts">
import type { BranchContextValue } from './branch-context'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { computed, inject } from 'vue'
import { BranchContextKey } from './branch-context'

interface BranchSelectorProps {
  from: 'user' | 'assistant'
  class?: string
}

const { from, class: className } = defineProps<BranchSelectorProps>()

const context = inject<BranchContextValue>(BranchContextKey)

if (!context) {
  throw new Error('BranchSelector must be used within Branch')
}

const { totalBranches } = context

// Don't render if there's only one branch
const shouldRender = computed(() => totalBranches > 1)
</script>

<template>
  <div
    v-if="shouldRender"
    :class="cn(
      'flex items-center gap-2 self-end px-10',
      from === 'assistant' ? 'justify-start' : 'justify-end',
      className,
    )"
  >
    <slot />
  </div>
</template>
