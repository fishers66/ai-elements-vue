<script setup lang="ts">
import type { BranchContextValue } from './branch-context'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { inject, useSlots, watch } from 'vue'
import { BranchContextKey } from './branch-context'

interface BranchMessagesProps {
  class?: string
}

defineProps<BranchMessagesProps>()

const slots = useSlots()
const context = inject<BranchContextValue>(BranchContextKey)

if (!context) {
  throw new Error('BranchMessages must be used within Branch')
}

const { currentBranch, setBranches } = context

// Watch for slot changes and update branches
watch(
  () => slots.default?.(),
  (newSlots) => {
    if (newSlots) {
      setBranches(newSlots)
    }
  },
  { immediate: true },
)
</script>

<template>
  <div
    v-for="(slot, index) in $slots.default?.()"
    :key="index"
    :class="cn(
      'grid gap-2 overflow-hidden [&>div]:pb-0',
      index === currentBranch ? 'block' : 'hidden',
    )"
  >
    <component :is="slot" />
  </div>
</template>
