<script setup lang="ts">
import type { BranchContextValue } from './branch-context'
import { Button } from '@repo/shadcn-vue/components/ui/button'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { ChevronLeft } from 'lucide-vue-next'
import { computed, inject } from 'vue'
import { BranchContextKey } from './branch-context'

interface BranchPreviousProps {
  class?: string
}

defineProps<BranchPreviousProps>()

const context = inject<BranchContextValue>(BranchContextKey)

if (!context) {
  throw new Error('BranchPrevious must be used within Branch')
}

const { goToPrevious, totalBranches } = context

const isDisabled = computed(() => totalBranches <= 1)
</script>

<template>
  <Button
    aria-label="Previous branch"
    :class="cn(
      'size-7 shrink-0 rounded-full text-muted-foreground transition-colors',
      'hover:bg-accent hover:text-foreground',
      'disabled:pointer-events-none disabled:opacity-50',
      $props.class,
    )"
    :disabled="isDisabled"
    size="icon"
    type="button"
    variant="ghost"
    @click="goToPrevious"
  >
    <slot>
      <ChevronLeft :size="14" />
    </slot>
  </Button>
</template>
