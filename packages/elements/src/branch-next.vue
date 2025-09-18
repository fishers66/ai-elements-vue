<script setup lang="ts">
import type { BranchContextValue } from './branch-context'
import { Button } from '@repo/shadcn-vue/components/ui/button'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { ChevronRight } from 'lucide-vue-next'
import { computed, inject } from 'vue'
import { BranchContextKey } from './branch-context'

interface BranchNextProps {
  class?: string
}

defineProps<BranchNextProps>()

const context = inject<BranchContextValue>(BranchContextKey)

if (!context) {
  throw new Error('BranchNext must be used within Branch')
}

const { goToNext, totalBranches } = context

const isDisabled = computed(() => totalBranches <= 1)
</script>

<template>
  <Button
    aria-label="Next branch"
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
    @click="goToNext"
  >
    <slot>
      <ChevronRight :size="14" />
    </slot>
  </Button>
</template>
